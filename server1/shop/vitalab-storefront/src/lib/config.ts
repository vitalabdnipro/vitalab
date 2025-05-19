import Medusa from "@medusajs/medusa-js";
import { QueryClient } from "@tanstack/react-query";

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000";

// For client-side requests, use the relative URL to leverage Next.js API routes
if (typeof window !== 'undefined') {
  MEDUSA_BACKEND_URL = "/api";
} else if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  // For server-side requests, use the environment variable
  // If the URL contains "vitalab.localhost", replace it with "vitalab-core" for Docker networking
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
  MEDUSA_BACKEND_URL = backendUrl.replace("vitalab.localhost", "vitalab-core");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
      retry: 1,
    },
  },
});

const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

export { MEDUSA_BACKEND_URL, queryClient, medusaClient };
