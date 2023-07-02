import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {
        name: '',
        email: '',
        userId: 0,
    },
    reducers: {
        update: (state, actions) => {
            state.name = actions.payload.name;
            state.email = actions.payload.email;
            state.userId = actions.payload.userId;
        }
    }
})

export const { update } = user.actions
export default user