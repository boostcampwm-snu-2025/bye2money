import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverlayProvider } from "overlay-kit";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "dayjs/locale/en";
import "dayjs/locale/ko";

import App from "./app/index.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OverlayProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </OverlayProvider>
  </StrictMode>
);
