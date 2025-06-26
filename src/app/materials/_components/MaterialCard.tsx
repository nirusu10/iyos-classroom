import type { Material } from "./MaterialSection";

export default function MaterialCard({ material }: { material: Material }) {
  return (
    <li
      key={material.id}
      className="flex flex-col items-center gap-4 rounded bg-white p-4 text-center shadow dark:bg-gray-900 dark:text-white"
    >
      <h3 className="text-lg font-semibold">{material.title}</h3>
      <img src={undefined} alt={material.title} className="h-20 w-full" />
      <p className="font-light">{material.description}</p>
      <button className="mt-2 inline-block w-full cursor-pointer rounded bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 md:w-auto dark:bg-blue-300 dark:text-black dark:hover:bg-blue-400">
        Download
      </button>
    </li>
  );
}
