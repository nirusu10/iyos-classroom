import MaterialCard from "./MaterialCard";

export type Material = {
  id: number;
  title: string;
  description: string;
  Url: string;
  level: "beginner" | "intermediate" | "advanced";
  createdAt: Date;
  updatedAt: Date | null;
};

type Materials = Material[];

export default function MaterialsSection({
  materials,
  title,
}: {
  materials: Materials;
  title: string;
}) {
  return (
    <section className="mt-8 rounded-xl bg-blue-50 px-4 py-8 shadow dark:bg-gray-800">
      <h2 className="text-xl font-bold dark:text-white">{title}</h2>
      {materials.length === 0 ? (
        <p className="text-gray-500">No materials yet for this level.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] justify-center gap-8">
          {materials.map((material) => (
            <MaterialCard material={material} key={material.id} />
          ))}
        </ul>
      )}
    </section>
  );
}
