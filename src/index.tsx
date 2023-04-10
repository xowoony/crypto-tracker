import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

// queryClient 작성
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // provider 를 만든다 - ThemeProvider, App 컴포넌트를 잘라내고 QueryClientProvider 안에 넣는다.
  <QueryClientProvider client={queryClient}>
    {" "}
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
