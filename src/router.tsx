import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultStaleTime: 1000 * 60 * 5, // Cache route loaders for 5 minutes
    defaultPreloadStaleTime: 1000 * 60 * 5,
  });

  return router;
};
