import "../styles/globals.css";
import AppFrame from "../components/_frame";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppFrame Component={Component} pageProps={pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
