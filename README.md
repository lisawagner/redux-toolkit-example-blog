# React Redux Mini Blog App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

<p align="center">
  <img src="src/assets/rtk-screen.png" alt="RTK Blog Posts List Page" width="500">
</p>

## Description

A small scale blog app created to develop stronger skills with `redux-toolkit`. Async thunks created with axios to hydrate a redux store with server data and to post data to the server API.

All CRUD operations are in the postSlice.js for the blog posts.

[DEMO](https://redux-toolkit-example-blog.netlify.app/ "RTK Blog Demo")

### :gear: Tech Stack

   1. React - Frontend
   2. Redux Toolkit (RTK) - for writing Redux logic / state management
   3. Redux Thunk from RTK - async middleware for writing async logic with Redux
   4. Axios - to send async HTTP requests to the REST API endpoints
   5. {JSON} Placeholder - free REST API for testing
   6. Date FNS - Toolset for manpulating JS dates

### :lady_beetle: Bugs and Known Issues

React v18 Strict Mode causes Redux to run 2x when component mounts for the first time, resulting in all records duped on the frontend. I tried unsuccessfully to create a workaround. Options for now are:
  - Don't use Strict Mode
  - Downgrade to React 17.

Possible FIX: load the API posts data immediately when the app loads.

   :heavy_check_mark: `store.dispatch(fetchPosts())` added to index.js

## Notes

### 1.  `reducers` vs `extraReducers`
The `reducers` property both creates an action creator function and responds to that action in the slice reducer. The `extraReducers` allow you to respond to an action in your slice reducer but does not create an action creator function.

You will use `reducers` most of the time.

`extraReducers` are used when dealing with an action that you have already defined elsewhere. The most common examples are responding to a `createAsyncThunk` action and responding to an action from another slice.

### 2.  Edit/Update Post
When you create a new post with the fake API, `updatePost` will not edit it, since we can't actually write to the JSON Placeholder data.

We can interact with the fake API but we cannot actually create a post there.

**WORKAROUND**: Instead of adding an error message when updating the post, return `initialPost` instead, so that the new post will 'appear' to be added to the API.

`Server Status 500` is sent back because it cannot update a post that doesn't exist at the API. Instead we update our Redux state correctly by adding `return initialPost` instead of the error message. This is just for testing purposes.

## References

   1. [Dave Gray RTK Tutorials](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6M1J5I1w2-uZx36Qp6qhjKo "RTK Tutorials by Dave Gray")
   2.  [Redux Essentials Tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts "Redux Essentials Tutorial")