import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "./store";
import { getTotals } from "./services/cartSlice";

store.dispatch(getTotals())

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
