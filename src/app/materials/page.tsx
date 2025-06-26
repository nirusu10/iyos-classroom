import { db } from "~/server/db";
import { materials } from "~/server/db/schema";
import MaterialsSection from "./_components/MaterialSection";

export default async function MaterialsPage() {
  const results = await db.select().from(materials);

  const beginnerMaterials = results.filter(
    (material) => material.level === "beginner",
  );

  const intermediateMaterials = results.filter(
    (material) => material.level === "intermediate",
  );

  const advancedMaterials = results.filter(
    (material) => material.level === "advanced",
  );

  return (
    <main className="container">
      <h1 className="text-center text-2xl font-bold text-blue-700 drop-shadow md:text-3xl dark:text-white">
        Materials
      </h1>
      <p className="mx-auto max-w-xl text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
        Here, I gathered some materials that can help you with your studies.
      </p>
      <MaterialsSection materials={beginnerMaterials} title="Beginner" />
      <MaterialsSection
        materials={intermediateMaterials}
        title="Intermediate"
      />
      <MaterialsSection materials={advancedMaterials} title="Advanced" />
    </main>
  );
}
