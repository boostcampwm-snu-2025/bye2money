import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/queryClient";
import { MswProvider } from "../mocks/MswProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MswProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MswProvider>
  );
}
