import Link from "next/link";
import FeatureItem from "~/components/FeatureItem";
import TestimonialCard from "~/components/TestimonialCard";

export default function HomePage() {
  return (
    <main>
      {/* Hero section */}
      <section
        id="hero"
        aria-label="Hero: Introduction to Iyo's Classroom"
        className="flex flex-col items-center gap-10 rounded-xl bg-gray-800 px-4 py-10 sm:px-10 md:flex-row md:justify-evenly md:gap-16 md:py-14"
      >
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-3xl leading-tight font-bold drop-shadow-2xl md:text-5xl">
            Welcome to Iyo&apos;s Classroom
          </h1>
          <p className="mt-4 max-w-xl text-lg text-gray-300 md:text-xl">
            Unlock your Japanese fluency with personalized, friendly lessons
            from a native speaker.
          </p>
          <Link
            className="mt-4 w-full max-w-md rounded border-2 px-5 py-2 text-base font-semibold hover:bg-gray-600 md:w-fit"
            href="/book"
          >
            Book a Lesson
          </Link>
        </div>
        <div
          id="hero-image"
          className="fill h-40 w-40 rounded-full border bg-gray-400 md:h-56 md:w-56"
        ></div>
      </section>
      {/* Introduction section */}
      <section className="mt-4 rounded-xl bg-gray-700 px-4 py-10 sm:mt-8 sm:px-10">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Meet Iyo!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300 md:text-xl">
          I&apos;m a (soon to be) certified Japanese teacher with over 5 years
          of teaching experience, helping students achieve their language goals.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-10">
          <FeatureItem emoji="🇯🇵" text="Native Japanese speaker" />
          <FeatureItem emoji="🎓" text="JLPT test preparation" />
          <FeatureItem emoji="📅" text="Flexible schedule" />
          <FeatureItem emoji="🗣️" text="Beginner to advanced" />
          <FeatureItem emoji="✨" text="Personalized lessons" />
        </ul>
      </section>
      {/* Testimonials section */}
      <section className="mt-4 rounded-xl bg-gray-800 px-4 py-10 sm:mt-8 sm:px-10">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          What students say
        </h2>
        <ul className="mx-auto mt-4 grid max-w-3xl grid-cols-1 gap-10 md:grid-cols-2">
          <li>
            <TestimonialCard
              text="Iyo-sensei makes learning Japanese fun and easy to understand. My confidence in speaking has grown so much since taking her lessons!"
              name="Alex, US"
            />
          </li>
          <li>
            <TestimonialCard
              text="Friendly, patient and really knows how to make grammar easy! Her lessons are very engaging and so much fun. ありがとう！"
              name="Maria, Spain"
            />
          </li>
        </ul>
      </section>
      {/* CTA Section */}
      <section className="mt-4 flex flex-col items-center rounded-xl bg-gray-700 px-4 py-16 sm:mt-8 md:px-8">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Ready to start your Japanese journey?
        </h2>
        <Link
          className="mt-4 w-full max-w-md rounded border-2 px-5 py-4 text-center text-base font-semibold hover:bg-gray-600 md:w-fit"
          href="/book"
        >
          Book a Lesson
        </Link>
      </section>
      {/* Quote section */}
      <section className="flex flex-col items-center py-8">
        <p className="text-2xl font-light text-gray-400">「七転び八起き」</p>
        <p className="mt-1 text-gray-200 italic">
          Fall seven times, stand up eight.
        </p>
        <p className="mt-4 max-w-md text-center text-base">
          Every student&apos;s path is unique. Let&apos;s make yours a success
          together!
        </p>
      </section>
    </main>
  );
}
