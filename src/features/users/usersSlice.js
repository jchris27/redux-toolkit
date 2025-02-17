import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "1", name: 'Jin' },
    { id: "2", name: 'Sayo' },
    { id: "3", name: 'Yui' }
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users

export default userSlice.reducer