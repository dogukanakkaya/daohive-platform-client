'use client'
import { API_GRAPHQL_URL } from '@/config'
import { ApolloLink, HttpLink } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr'

function makeClient() {
  const httpLink = new HttpLink({
    uri: API_GRAPHQL_URL,
    credentials: 'include'
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
    httpLink
  ]

  if (typeof window === 'undefined') {
    links.unshift(new SSRMultipartLink({ stripDefer: true }))
  }

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: ApolloLink.from(links)
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}