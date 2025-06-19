export default function FeatureItem({
  emoji,
  text,
}: {
  emoji: string;
  text: string;
}) {
  return (
    <li className="flex flex-col items-center">
      <span className="text-3xl">{emoji}</span>
      <span className="mt-1 text-center text-lg text-nowrap">{text}</span>
    </li>
  );
}
