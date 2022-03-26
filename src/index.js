import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// persist store
import newStore from './redux/store';

import App from './App';
import './index.css'

// graphql client
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={newStore.store}>
        <BrowserRouter>
          <PersistGate persistor={newStore.persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
