'use client'
import { API_URL } from '@/config'
import { ApolloLink, HttpLink } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { ErrorLink } from '@apollo/client/link/error'
import { ApolloNextAppProvider, NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support/ssr'
import { toast } from 'react-toastify'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function makeClient() {
  const supabase = createClientComponentClient()
  const httpLink = new HttpLink({
    uri: `${API_URL}/graphql`,
    credentials: 'include'
  })

  const errorLink = new ErrorLink(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      toast.error(graphQLErrors[0].message)
    } else if (networkError && 'statusCode' in networkError) {
      if (networkError.statusCode === 429) {
        // @todo: show error page with too many requests
      } else if (networkError.statusCode === 401) {
        supabase.auth.signOut().then(() => location.replace('/auth/login'))
      }
    }
  })

  const retryStatuses = [429, 503]
  const retryLink = new RetryLink({
    delay: (_count, operation) => {
      const context = operation.getContext()

      return 1000 * (context.response.headers.get('Retry-After') || 30)
    },
    attempts: {
      max: 3,
      retryIf: (error) => !!error && retryStatuses.includes(error.statusCode)
    }
  })

  const links: ApolloLink[] = [
    retryLink,
    errorLink,
    httpLink
  ]

  if (typeof window === 'undefined') {
    links.unshift(new SSRMultipartLink({ stripDefer: true }))
  }

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: ApolloLink.from(links),
    connectToDevTools: process.env.NODE_ENV === 'development'
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}