import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import { store } from "./features/store";
import App from "./components/App";
//import { setupStore } from "./features/store";
import { Provider } from "react-redux";

//const store = setupStore();
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
