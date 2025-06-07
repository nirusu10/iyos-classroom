const TestimonialCard = ({ text, name }: { text: string; name: string }) => {
  return (
    <blockquote className='bg-white p-6 rounded-xl shadow flex flex-col justify-between h-full'>
      <p className='italic text-gray-700'>“{text}“</p>
      <span className='block text-right mt-3 text-sm md:text-base font-bold text-blue-500'>
        — {name}
      </span>
    </blockquote>
  )
}

export default TestimonialCard
