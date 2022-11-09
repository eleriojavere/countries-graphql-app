import { Country } from "../hooks/useCountries";

export default function Table({ data }: { data: Country[] }) {
  return (
    <table className="table-container">
      <tbody>
        {data.map((country, key) => {
          return (
            <tr key={`${country}-${key}`} className="table-row">
              <td>{country.name}</td>
              <td>{country.code}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
