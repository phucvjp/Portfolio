import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <SpeedInsights />
    <App />
  </>
);
