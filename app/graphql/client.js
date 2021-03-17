import { ApolloClient, InMemoryCache } from '@apollo/client';
import DEFAULT_IP from '@resources/IPConfig';

const client = new ApolloClient({
  uri: `http://${DEFAULT_IP}:8080/v1/graphql`,
  cache: new InMemoryCache()
});

export {
  client
}