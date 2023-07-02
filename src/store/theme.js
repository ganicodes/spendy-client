import { createSlice } from "@reduxjs/toolkit";

const theme = createSlice({
    name: "theme",
    initialState: {
        theme: localStorage.getItem("theme"),
    },
    reducers: {
        toggleTheme: (state, actions) => {
            localStorage.setItem('theme', actions.payload.theme);
            state.theme = actions.payload.theme;
        }
    }
})

export const { toggleTheme } = theme.actions
export default theme