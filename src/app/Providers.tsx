import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { queryClient } from "./providers/queryClient";
import { MswProvider } from "../mocks/MswProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MswProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryClientProvider>
    </MswProvider>
  );
}
