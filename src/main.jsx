import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx"
import ReactDOM from "react-dom/client";
import './index.css';



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
    </React.StrictMode>
);

  

