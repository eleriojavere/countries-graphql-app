import { Country } from "../hooks/useCountries";

export default function Table({ data }: { data: Country[] }) {
  return (
    <table className="w-full bg-white max-w-xl mt-8 shadow-xl mb-4 border-spacing-0 border-separate rounded-xl">
      <tbody>
        {data.map((country, key) => {
          return (
            <tr key={`${country}-${key}`} className="text-left">
              <td className="w-7/12 p-3.5">{country.name}</td>
              <td className="p-3.5 font-bold">{country.code}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
