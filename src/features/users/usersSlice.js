import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// define the users(authors) URL
const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

// const initialState = [
//   { id: '0', name: 'Tanya Prochazka' },
//   { id: '1', name: 'Madam Zira' },
//   { id: '2', name: 'Makenzie Davis' },
// ]

const initialState = []

// get users from the REST API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL)
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }

})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer