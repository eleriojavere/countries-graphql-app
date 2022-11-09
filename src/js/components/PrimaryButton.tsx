export default function PrimaryButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="primary-button">
      search
    </button>
  );
}
