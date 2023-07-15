import { API_GRAPHQL_URL } from '@/config'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: API_GRAPHQL_URL,
  credentials: 'include',
  cache: new InMemoryCache()
})