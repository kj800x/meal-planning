import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));

Modal.setAppElement("#root");
