import { useCountries } from "../../App";

export default function Table() {
  const { data } = useCountries();

  if (!data) return <div>No data</div>;

  return (
    <table className="table-container">
      <tbody>
        {data.countries.map((country, key) => {
          return (
            <tr key={`${country}-${key}`}>
              <td>{country.name}</td>
              <td>{country.code}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
