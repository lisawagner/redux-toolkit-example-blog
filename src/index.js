import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
// redux
import { Provider } from 'react-redux';
import { store } from './app/store';
import { fetchUsers } from './features/users/usersSlice';
import { fetchPosts } from './features/posts/postsSlice';
// styles
import './index.css';

// fetch users(authors) and posts immediately when app loads
store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // React v18 strict mode causing redux to run 2x when component mounts
  //    for the first time resulting in all records duped. I tried
  //    unsuccessfully to create a workaround. Options for now are:
  //    Don't use strictmode, or downgrade to react 17.
  // <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  // </React.StrictMode>
);

