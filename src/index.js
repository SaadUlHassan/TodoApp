import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import store from "./Redux/store";
if(!navigator.cookieEnabled) {
  ReactDOM.render(
    <h1>'Please enable cookies'</h1>,
    document.getElementById("root")
  );
}

if(navigator.cookieEnabled) {
  ReactDOM.render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

reportWebVitals();
