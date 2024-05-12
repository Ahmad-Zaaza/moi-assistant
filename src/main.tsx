import React from "react";
import ReactDOM from "react-dom/client";
import "styles/index.css";
import App from "./App.tsx";

declare global {
  interface Window {
    __COMMIT_HASH__: string;
    __PACKAGE_JSON_VERSION__: string;
  }
}
window.__COMMIT_HASH__ = __COMMIT_HASH__;
window.__PACKAGE_JSON_VERSION__ = __PACKAGE_JSON_VERSION__;

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
