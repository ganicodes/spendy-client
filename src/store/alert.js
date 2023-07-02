import { createSlice } from "@reduxjs/toolkit";

const alert = createSlice({
    name: "alert",
    initialState: {
        showAlert: false,
        variant: "",
        message: "",
    },
    reducers: {
        setShowAlert: (state, actions) => {
            state.showAlert = actions.payload.showAlert;
            state.variant = actions.payload.variant;
            state.message = actions.payload.message;
        }
    }
})

export const { setShowAlert } = alert.actions;
export default alert;