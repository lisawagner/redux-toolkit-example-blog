import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: '0', name: 'Tanya Prochazka' },
  { id: '1', name: 'Madam Zira' },
  { id: '2', name: 'Makenzie Davis' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer