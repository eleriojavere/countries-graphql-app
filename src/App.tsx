import Table from "./js/components/Table";
import { FormEvent, useState } from "react";
import { Country, useCountries } from "./js/hooks/useCountries";
import Input from "./js/components/Input";

function App() {
  const { data, isLoading, error } = useCountries();
  const [filteredData, setFilteredData] = useState<Country[] | null>(null);

  if (error instanceof Error) {
    return (
      <div className="text-red-700">
        Problem fetching countries: {error.message}
      </div>
    );
  }

  if (!data && !isLoading) return <div>No data to show</div>;

  if (isLoading)
    return (
      <div className="w-full mt-14 flex text-blue-700 text-2xl font-bold justify-center h-screen">
        Loading...
      </div>
    );

  const filterResults = (value: string) => {
    const filteredCountries = data.countries.filter(({ code }) =>
      code.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredCountries);
  };

  return (
    <main className="max-w-7xl ml-auto mr-auto pl-7 pr-7">
      <h3 className="text-xl font-bold mt-4 mb-4 text-blue-700">
        Filter results by country code:
      </h3>
      <Input
        changeInputValue={(e: FormEvent<HTMLInputElement>) =>
          filterResults(e.currentTarget.value)
        }
      />

      <Table data={filteredData ?? data.countries} />
    </main>
  );
}

export default App;
