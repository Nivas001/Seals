import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10,   // 10 minutes
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadDelay: 30, // Trigger preload within 30ms of hover
    defaultStaleTime: 1000 * 60 * 5, // Cache route loaders for 5 minutes
    defaultPreloadStaleTime: 1000 * 60 * 5,
    defaultGcTime: 1000 * 60 * 10,
  });

  return router;
};
