import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store.ts";
import "./global.scss";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./lib/MUI-theme.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }, // deactivate refetch when changing tab in browser
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
