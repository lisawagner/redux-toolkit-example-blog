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
  try {
    const response = await axios.get(USERS_URL)
    // you can return just response.data instead of a new array
    return [...response.data]
  } catch (error) {
    return error.message
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // Here the state is completely overwritten, so 'users' are not accidentally
      // added twice vs using state.push to spread the payload into the array
      return action.payload
    })
  }

})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer