import { configureStore } from "@reduxjs/toolkit";
import theme from "./theme";
import user from "./user";

export const store = configureStore({
    reducer: {
        theme: theme.reducer,
        user: user.reducer,
    }
})