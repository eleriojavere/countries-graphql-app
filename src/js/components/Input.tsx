export default function Input({
  value,
  changeInputValue,
}: {
  value: string;
  changeInputValue: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <input value={value} onChange={changeInputValue} placeholder="For ex. EE" />
  );
}
