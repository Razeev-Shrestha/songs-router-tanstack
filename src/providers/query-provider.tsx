import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
      </QueryClientProvider>
    </>
  );
};
