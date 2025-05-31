const Materials = () => {
  return (
    <main className='mx-auto max-w-4xl mt-16 p-4'>
      <h1 className='text-3xl font-semibold'>Course Materials</h1>
      <p className='mt-8'>
        Below are some resources for students to practice and learn between
        sessions.
      </p>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
        <div className='flex flex-col items-center sm:items-start shadow rounded p-4 gap-4'>
          <h2 className='text-xl font-semibold'>N5 Grammar PDF</h2>
          <p>
            A printable reference sheet for basic sentence structure and tenses
          </p>
          <a className='px-4 py-2 bg-teal-600 text-white text-center rounded hover:bg-teal-700 transition w-full sm:w-fit'>
            Download
          </a>
        </div>
        <div className='flex flex-col items-start shadow rounded p-4 gap-4'>
          <h2 className='text-xl font-semibold'>Common Phrases Video</h2>
          <p>Watch this video to learn useful everyday Japnese expressions.</p>
          <a
            href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            className='px-4 py-2 bg-teal-600 text-white text-center rounded hover:bg-teal-700 transition w-full sm:w-fit'
          >
            Watch
          </a>
        </div>
        <div className='flex flex-col items-start shadow rounded p-4 gap-4'>
          <h2 className='text-xl font-semibold'>Vocabulary List</h2>
          <p>Daily-use vocabulary organized by theme (food, travel, etc).</p>
          <a className='px-4 py-2 bg-teal-600 text-white text-center rounded hover:bg-teal-700 transition w-full sm:w-fit'>
            Download
          </a>
        </div>
        <div className='flex flex-col items-start shadow rounded p-4 gap-4'>
          <h2 className='text-xl font-semibold'>N5 Grammar PDF</h2>
          <p>
            A printable reference sheet for basic sentence structure and tenses
          </p>
          <a className='px-4 py-2 bg-teal-600 text-white text-center rounded hover:bg-teal-700 transition w-full sm:w-fit'>
            Download
          </a>
        </div>
        <div className='flex flex-col items-start shadow rounded p-4 gap-4'>
          <h2 className='text-xl font-semibold'>N5 Grammar PDF</h2>
          <p>
            A printable reference sheet for basic sentence structure and tenses
          </p>
          <a className='px-4 py-2 bg-teal-600 text-white text-center rounded hover:bg-teal-700 transition w-full sm:w-fit'>
            Download
          </a>
        </div>
      </section>
      <section className='mt-8'>
        <h2 className='text-2xl font-semibold'>Recommended media</h2>
        <p className='mt-4'>
          Here are is some media I recommend to my learners.
        </p>
        <h3 className='font-semibold mt-4'>Movies</h3>
        <ul className='pl-4 list-disc flex flex-col gap-2'>
          <li>となりのトトロ (Tonari no Totoro)</li>
          <li>となりのトトロ (Tonari no Totoro)</li>
          <li>となりのトトロ (Tonari no Totoro)</li>
          <li>となりのトトロ (Tonari no Totoro)</li>
        </ul>
      </section>
    </main>
  )
}

export default Materials
