export default function TestimonialCard({
  text,
  name,
}: {
  text: string;
  name: string;
}) {
  return (
    <li>
      <blockquote className="flex h-full flex-col justify-between rounded bg-white p-6 shadow dark:bg-gray-700">
        <p className="text-gray-700 italic dark:text-gray-300">{text}</p>
        <span className="mt-3 block text-right text-sm font-bold text-blue-600 md:text-base dark:text-white">
          — {name}
        </span>
      </blockquote>
    </li>
  );
}
