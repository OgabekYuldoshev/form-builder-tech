import "./global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MantineProvider>
    <App />
    </MantineProvider>
  </StrictMode>
);
