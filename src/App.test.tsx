import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { useCountries } from "./js/hooks/useCountries";

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

jest.mock("./js/hooks/useCountries");

export const renderApp = () => {
  const client = new QueryClient();

  return render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  );
};

test("Displays loading screen when no data", () => {
  // @ts-ignore
  useCountries.mockImplementation(() => ({
    data: {},
    isLoading: true,
    error: null,
  }));

  renderApp();

  const element = screen.getByText(/Loading.../);
  expect(element).toBeInTheDocument();
});

test("Displays countries when there is data", () => {
  // @ts-ignore
  useCountries.mockImplementation(() => ({
    data: {
      countries: [
        { name: "Estonia", code: "EE" },
        { name: "Ukraine", code: "UA" },
      ],
    },
    isLoading: false,
    error: null,
  }));

  renderApp();

  const tableRowElements = screen.getAllByRole("row");
  expect(tableRowElements).toHaveLength(2);
});

test("Displays error message when error fetching data", () => {
  // @ts-ignore
  useCountries.mockImplementation(() => ({
    data: null,
    isLoading: false,
    error: new Error("Error message"),
  }));

  renderApp();

  const element = screen.getByText(/Problem fetching countries: Error message/);
  expect(element).toBeInTheDocument();
});

test("Display no data message when data is undefined", () => {
  // @ts-ignore
  useCountries.mockImplementation(() => ({
    data: undefined,
    isLoading: false,
    error: false,
  }));

  renderApp();

  const element = screen.getByText(/No data to show/);
  expect(element).toBeInTheDocument();
});

test("Display only countries with country code the user has searched for", async () => {
  // @ts-ignore
  useCountries.mockImplementation(() => ({
    data: {
      countries: [
        { name: "Estonia", code: "EE" },
        { name: "Ukraine", code: "UA" },
        { name: "Finland", code: "FI" },
        { name: "Andorra", code: "AD" },
      ],
    },
    isLoading: false,
    error: null,
  }));

  renderApp();
  const input = screen.getByLabelText("input");
  fireEvent.change(input, { target: { value: "a" } });

  const tableRowElements = screen.getAllByRole("row");

  expect(tableRowElements).toHaveLength(2);

  expect(screen.getByText("Ukraine")).toBeInTheDocument();
  expect(screen.queryByText("Estonia")).toBeNull();
  expect(screen.queryByText("Finland")).toBeNull();
  expect(screen.getByText("Andorra")).toBeInTheDocument();
});
