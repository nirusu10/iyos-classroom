import Link from "next/link";
import FeatureItem from "~/components/FeatureItem";

export default function HomePage() {
  return (
    <main className="container">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-evenly gap-8 rounded-xl px-8 py-10 shadow-md md:flex-row dark:bg-gray-800">
        <div className="flex flex-col items-center text-center text-balance md:items-start md:text-left">
          <h1 className="text-3xl leading-tight font-extrabold text-blue-700 drop-shadow md:text-4xl dark:text-white">
            Welcome to Iyo's Classroom
          </h1>
          <p className="md:tex-xl mt-4 max-w-xl text-lg text-gray-700 dark:text-gray-100">
            Unlock your Japanese fluency with personalized, friendly lessons
            from a native speaker.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-block w-full cursor-pointer rounded bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 md:w-auto dark:bg-blue-300 dark:text-black dark:hover:bg-blue-400"
          >
            Book a Lesson
          </Link>
        </div>
        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-blue-700 shadow-lg md:h-48 md:w-48 dark:bg-blue-300">
          <span className="text-7xl text-white dark:text-black">IYO</span>
        </div>
      </section>
      {/* Introduction Section */}
      <section className="mt-4 rounded-xl bg-blue-50 px-8 py-10 shadow-md md:mt-8 dark:bg-gray-700">
        <h2 className="text-center text-2xl font-bold text-blue-700 md:text-3xl dark:text-white">
          Meet Iyo!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-700 md:text-left md:text-xl dark:text-gray-100">
          I'm a (soon to be) certified Japanese teacher with over 5 years of
          teaching experience, helping students all over the world achieve their
          language goals.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-8 dark:text-white">
          <FeatureItem emoji="🇯🇵" text="Native Japanese speaker" />
          <FeatureItem emoji="🎓" text="JLPT Test Preparation" />
          <FeatureItem emoji="📅" text="Flexible schedule" />
          <FeatureItem emoji="🗣️" text="Beginner to Advanced" />
          <FeatureItem emoji="✨" text="Personalized lessons" />
        </ul>
      </section>
    </main>
  );
}
