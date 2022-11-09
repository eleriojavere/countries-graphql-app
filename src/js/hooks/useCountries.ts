import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const apiEndpointUrl = process.env.REACT_APP_API_URL;

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

export type Country = {
  name: string;
  code: string;
};

const fetchCountries = (): Promise<ApiResponse> => {
  if (!apiEndpointUrl) {
    throw Error("Missing API endpoint url");
  }
  return request(apiEndpointUrl, COUNTRIES_QUERY);
};

export const useCountries = () => {
  return useQuery("countries", fetchCountries, { refetchOnMount: false });
};
