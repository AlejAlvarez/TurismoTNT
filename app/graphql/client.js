import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import DEFAULT_IP from '@resources/IPConfig';

const client = new ApolloClient({
  uri: `http://${DEFAULT_IP}:8080/v1/graphql`,
  cache: new InMemoryCache()
});

const wsLink = new WebSocketLink({
  uri: `ws://${DEFAULT_IP}:8080/v1/graphql`,
  options: {
    reconnect: true,
    cache: new InMemoryCache()
  }
});

export {
  client,
  wsLink
}