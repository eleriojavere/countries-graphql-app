import React from "react";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import App from "./App";
import {
  QueryClient,
  QueryClientProvider,
  setLogger,
  useQuery,
} from "react-query";

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
function useCountriesMock() {
  return useQuery({ queryKey: ["useCountries"], queryFn: () => {} });
}

export const renderApp = (client: QueryClient) => {
  return render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  );
};

test("Displays error when missing an API key", async () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  renderApp(client);

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );

  const { result } = renderHook(() => useCountriesMock(), { wrapper });

  await waitFor(() => {
    return expect(result.current.isLoading).toBe(false);
  });
  const element = screen.getByText(/Problem fetching countries:/);

  expect(element).toBeInTheDocument();
});

test("Displays loading bar when API is fetching data", async () => {
  const client = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );

  renderApp(client);

  const { result } = renderHook(() => useCountriesMock(), { wrapper });

  await waitFor(() => {
    return expect(result.current.isLoading).toBe(false);
  });

  const element = screen.getByText(/Loading.../);
  expect(element).toBeInTheDocument();
});
