import "./global.css";

import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { Notifications } from "@mantine/notifications";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MantineProvider>
      <App />
      <Notifications position="top-center" />
    </MantineProvider>
  </StrictMode>
);
