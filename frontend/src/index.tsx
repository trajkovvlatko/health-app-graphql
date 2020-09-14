import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from 'layouts/Main/MainLayout';
import {SidebarStateProvider} from 'contexts/SidebarStateContext';
import * as serviceWorker from './serviceWorker';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import './index.css';

const host = process.env.REACT_APP_HOST;
const uri = `${host}/graphql`;

const link = createHttpLink({
  uri,
  credentials: 'include',
});

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <React.StrictMode>
    <SidebarStateProvider sidebarState={true}>
      <ApolloProvider client={client}>
        <MainLayout />
      </ApolloProvider>
    </SidebarStateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
