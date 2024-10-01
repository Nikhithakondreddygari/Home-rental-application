import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Make sure this is the correct path to your Redux store
import App from "./App";

// Wrap the App component with the Provider and pass the store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
