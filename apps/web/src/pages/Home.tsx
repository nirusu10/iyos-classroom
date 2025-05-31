import { Link } from 'react-router'

const Home = () => (
  <main className='mx-auto max-w-4xl'>
    <section className='flex flex-col gap-3 bg-slate-200 rounded-lg items-center px-8 py-4 mt-8 shadow'>
      <h1 className='text-3xl font-semibold'>Learn Japanese with Iyo</h1>
      <img src={undefined} alt='Picture of your Japanese teacher, Iyo' />
      <p>
        Personalized 1-on-1 lessons to help you speak Japanese with confidence
        and ease.
      </p>
      <Link
        to='/'
        className='px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition'
      >
        Book a class
      </Link>
    </section>
    <section className='flex flex-col gap-3 shadow rounded-lg px-4 py-8 mt-16'>
      <h2 className='text-2xl font-semibold'>About Me</h2>
      <p>
        I'm Iyo, a (not yet 🤭) certified language teacher with a passion for
        helping people learn and connect through language. I've taught Japanese
        for over 6 years to students around the world — from complete beginners
        to JLPT N1 candidates.
      </p>
      <p>
        Whether you're learning for travel, work or just for fun — you're in the
        right place!
      </p>
    </section>
    <section className='flex flex-col gap-3 shadow rounded-lg px-4 py-8 mt-16'>
      <h2 className='text-2xl font-semibold'>What I offer</h2>
      <ul className='pl-4 list-disc'>
        <li>Custom lesson plans tailored to your goals</li>
        <li>Flexible scheduling options</li>
        <li>Interactive resources to make learning fun</li>
        <li>Exam preparation for all JLPT levels</li>
      </ul>
    </section>
  </main>
)

export default Home
