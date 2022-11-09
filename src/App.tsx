import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import Table from "./js/components/Table";
import PrimaryButton from "./js/components/PrimaryButton";

const apiEndpoint = "https://countries.trevorblades.com/";

const COUNTRIES_QUERY = gql`
  {
    countries {
      name
      code
    }
  }
`;

type ApiResponse = {
  countries: Country[];
};

type Country = {
  name: string;
  code: string;
};

const fetchCountries = (): Promise<ApiResponse> => {
  return request(apiEndpoint, COUNTRIES_QUERY);
};

export const useCountries = () => {
  return useQuery("countries", fetchCountries, { refetchOnMount: false });
};

function App() {
  const { isLoading, error } = useCountries();

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return (
    <main className="max-width-wrapper">
      <h3> Filter results by country code:</h3>
      <input placeholder="For ex. EE" />
      <PrimaryButton />
      <Table />
    </main>
  );
}

export default App;
