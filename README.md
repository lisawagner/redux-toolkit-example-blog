# React Redux Mini Blog App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Description

A small scale blog app created to develop stronger skills with `redux-toolkit`. I created async thunks with axios to hydrate a redux store with server data and to post data to the server API.

### Tech Stack

   1. React - Frontend
   2. Redux Toolkit (RTK) - for writing Redux logic / state management
   3. Redux Thunk from RTK - async middleware for writing async logic with Redux
   4. Axios - to send async HTTP requests to the REST API endpoints
   5. JSONPlaceholder - free REST API for testing
   6. Date FNS - Toolset for manpulating JS dates

### Notes

React v18 strict mode causing Redux to run 2x when component mounts for the first time, resulting in all records duped. I tried unsuccessfully to create a workaround. Options for now are:
  - Don't use strict mode
  - Downgrade to React 17.
