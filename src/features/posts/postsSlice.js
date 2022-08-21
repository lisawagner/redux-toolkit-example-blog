import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from 'axios'

// define base URL - using JSONPlaceholder free REST API for test data.
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

// add async thunk to get posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL)
  return response.data
})

// handle new posts with async thunk
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  // initialPost data is the body of the post request sent to axios
  const response = await axios.post(POSTS_URL, initialPost)
  return response.data
})

// handle edit post with async thunk
export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
  const { id } = initialPost
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
    return response.data
  } catch (error) {
    return error.message
  }
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // track the reactions count state. Immer handles the state mutation
    addReaction(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if(existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  // builder parameter is an object that lets us define additional case reducers
  // that run in response to the actions defined outside of the slice
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // add date and reactions
        let min = 1
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
        return post
      })
      // add posts to the array
      state.posts = state.posts.concat(loadedPosts)
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    .addCase(addNewPost.fulfilled, (state, action) => {
      // FIX: This is a 'fix' for the API postIDs
      // Creating sortedPosts & assigning the id would not be needed
      // if the fake API returned accurate new post IDs
      const sortedPosts = state.posts.sort((a, b) => {
        if(a.id > b.id) return 1
        if(a.id < b.id) return -1
        return 0
      })
      action.payload.id = sortedPosts[sortedPosts.length -1].id + 1
      // end FIX

      // API provides userId as String, so here it is converted to Number
      action.payload.userId = Number(action.payload.userId)
      action.payload.date = new Date().toISOString()
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0
      }
      console.log(action.payload);
      // immerjs handles the mutation of the state with push
      state.posts.push(action.payload)
    })
    .addCase(updatePost.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log('Update unsuccessful')
        console.log(action.payload)
        return
      }
      const { id } = action.payload
      action.payload.date = new Date().toISOString()
      const posts = state.posts.filter(post => post.id !== id)
      state.posts = [...posts, action.payload]
    })
  }
})

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)

// export the actions creator functions automatically created by rtk
export const { addPost, addReaction } = postsSlice.actions

export default postsSlice.reducer