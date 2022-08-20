import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { fetchUsers } from './features/users/usersSlice';
import App from './App';
import './index.css';

// fetch users(authors) immediately when app loads
store.dispatch(fetchUsers())

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // React v18 strict mode causing redux to run 2x when component mounts
  //    for the first time resulting in all records duped. I tried
  //    unsuccessfully to create a workaround. Options for now are:
  //    Don't use strictmode, or downgrade to react 17.
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

