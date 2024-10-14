import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "sonner";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <App />
        <Toaster
          toastOptions={{
            className: "default-toast",
          }}
        />
      </AppProvider>
    </Provider>
  </React.StrictMode>
);
