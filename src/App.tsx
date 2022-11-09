import Table from "./js/components/Table";
import PrimaryButton from "./js/components/PrimaryButton";
import { FormEvent, useState } from "react";
import { Country, useCountries } from "./js/hooks/useCountries";
import Input from "./js/components/Input";

function App() {
  const { data, isLoading, error } = useCountries();
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Country[] | null>(null);

  if (!data && !isLoading) return <div>No data to show</div>;

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) {
    return (
      <div className="error-message">
        Problem fetching countries: {error.message}
      </div>
    );
  }

  const filterResults = () => {
    const filteredCountries = data.countries.filter(({ code }) =>
      code.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredData(filteredCountries);
    setInputValue("");
  };
  return (
    <main className="max-width-wrapper">
      <h3> Filter results by country code:</h3>
      <Input
        value={inputValue}
        changeInputValue={(e: React.FormEvent<HTMLInputElement>) =>
          setInputValue(e.currentTarget.value)
        }
      />
      <PrimaryButton onClick={filterResults} />

      <Table data={filteredData != null ? filteredData : data.countries} />
    </main>
  );
}

export default App;
