import { HttpLink } from '@apollo/client'
import { NextSSRInMemoryCache, NextSSRApolloClient } from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { API_URL } from '@/config'
import { cookies } from 'next/headers'

export const { getClient: getApolloClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: `${API_URL}/graphql`,
      headers: {
        Cookie: cookies().toString()
      }
    })
  })
})