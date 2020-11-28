import React, { FC } from 'react'
import { MittProvider } from 'react-mitt'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../plugins/graphql/p-apollo-client'

interface Props {
  pageProps: any
}

const FProviders: FC<Props> = ({ children, pageProps }) => {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <MittProvider>{children}</MittProvider>
    </ApolloProvider>
  )
}

export default FProviders
