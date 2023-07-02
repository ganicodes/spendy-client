import { configureStore } from "@reduxjs/toolkit";
import alert from "./alert";
import theme from "./theme";
import user from "./user";

export const store = configureStore({
    reducer: {
        theme: theme.reducer,
        user: user.reducer,
        alert: alert.reducer,
    }
})