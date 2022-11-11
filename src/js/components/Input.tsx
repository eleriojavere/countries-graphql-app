export default function Input({
  changeInputValue,
}: {
  changeInputValue: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      aria-label="input"
      className="bg-white shadow max-w-xl rounded highlight-error text-center py-2 px-2 text-md w-full placeholder-text-gray-400 border-none"
      onChange={changeInputValue}
      placeholder="For ex. EE"
    />
  );
}
