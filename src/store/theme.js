import { createSlice } from "@reduxjs/toolkit";

const theme = createSlice({
    name: "theme",
    initialState: {
        theme: "light",
    },
    reducers: {
        toggleTheme: (state, actions) => {
            state.theme = actions.payload.theme
        }
    }
})

export const { toggleTheme } = theme.actions
export default theme