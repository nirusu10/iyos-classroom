export default function TestimonialCard({
  text,
  name,
}: {
  text: string;
  name: string;
}) {
  return (
    <blockquote className="flex h-full flex-col justify-between rounded-xl bg-gray-400 p-6 shadow">
      <p className="text-gray-900 italic">{text}</p>
      <span className="mt-3 block text-right text-sm font-bold text-gray-700 md:text-base">
        — {name}
      </span>
    </blockquote>
  );
}
