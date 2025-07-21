import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // token: sessionStorage.getItem('token') || null,
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    tasks: [],
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            sessionStorage.setItem('user', JSON.stringify(action.payload));
        },
        getAllTasks: (state, action) => {
            state.tasks = action.payload
        }
    }
});

export const { login, getAllTasks } = authSlice.actions;

export default authSlice.reducer;