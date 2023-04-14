import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import React from "react";

// queryClient 작성
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // provider 를 만든다 - ThemeProvider, App 컴포넌트를 잘라내고 QueryClientProvider 안에 넣는다.
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
