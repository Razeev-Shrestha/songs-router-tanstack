import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@/index.css";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./providers/provider";
import { QueryProvider } from "./providers/query-provider";
import { Toaster } from "sonner";
import { AuthProvider, useAuthProvider } from "./providers/auth-provider";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const auth = useAuthProvider();

  return (
    <QueryProvider>
      <RouterProvider router={router} context={{ auth }} />
    </QueryProvider>
  );
};
// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster />
    </StrictMode>
  );
}
