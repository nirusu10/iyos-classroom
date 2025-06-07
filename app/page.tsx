import FeatureItem from '@/components/FeatureItem'
import TestimonialCard from '@/components/TestimonialCard'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        id='hero'
        aria-label="Hero: Introduction to Iyo's Classroom"
        className='flex flex-col md:flex-row items-center gap-10 md:gap-16 px-4 sm:px-10 py-10 md:py-14 rounded-xl shadow'
      >
        <div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left'>
          <h1 className='text-3xl md:text-5xl font-extrabold text-blue-700 leading-tight drop-shadow mb-4'>
            Welcome to Iyo&apos;s Classroom
          </h1>
          <p className='text-lg md:text-xl text-gray-700 max-w-xl mb-6'>
            Unlock your Japanese fluency with personalized, friendly lessons from a native speaker.
          </p>
          <Link href='/'>
            <Button>Book a Lesson</Button>
          </Link>
        </div>
        <Image
          src='/avatar.svg'
          alt='Iyo Sensei'
          className='w-40 h-40 md:w-56 md:h-56 rounded-full shadow-lg'
          width={40}
          height={40}
        />
      </section>
      {/* Introduction section */}
      <section className='bg-blue-50 rounded-xl py-10 px-4 sm:px-10 mt-4 sm:mt-8 shadow'>
        <h2 className='text-2xl md:text-3xl font-bold text-blue-700 text-center'>Meet Iyo!</h2>
        <p className='text-lg md:text-xl text-gray-700 max-w-xl mx-auto mt-4'>
          I&apos;m a (soon to be) certified Japanese teacher with over 5 years of teaching
          experience, helping students achieve their language goals.
        </p>
        <ul className='mt-8 flex gap-10 flex-wrap justify-center'>
          <FeatureItem emoji='🇯🇵' text='Native Japanese speaker' />
          <FeatureItem emoji='🎓' text='JLPT Test Preparation' />
          <FeatureItem emoji='📅' text='Flexible schedule' />
          <FeatureItem emoji='🗣️' text='Beginner to Advanced' />
          <FeatureItem emoji='✨' text='Personalized lessons' />
        </ul>
      </section>
      {/* Testimonials sectoin */}
      <section className='rounded-xl py-10 px-4 sm:px-10 mt-4 sm:mt-8 shadow'>
        <h2 className='text-2xl md:text-3xl font-bold text-blue-700 text-center'>
          What Students Say
        </h2>
        <ul className='mt-4 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>
          <li>
            <TestimonialCard
              text='Iyo-sensei makes learning Japanese fun and easy to understand. My confidence in
              speaking has grown so much!'
              name='Alex, US'
            />
          </li>
          <li>
            <TestimonialCard
              text='Friendly, patient, and really knows how to make grammar easy!'
              name='Maria, Spain'
            />
          </li>
        </ul>
      </section>
      {/* CTA Section */}
      <section className='rounded-xl py-16 px-4 md:px-8 sm:px-10 mt-4 sm:mt-8 shadow bg-blue-50 flex flex-col items-center'>
        <h2 className='text-2xl md:text-3xl font-bold text-blue-700 text-center'>
          Ready to start your Japanse Journey?
        </h2>
        <Link href='/' className='w-full md:w-fit'>
          <Button size='lg' className='mt-8 w-full'>
            Book a lesson
          </Button>
        </Link>
      </section>
      {/* Quote section */}
      <section className='py-8 flex flex-col items-center'>
        <p className='text-2xl text-blue-600 font-light'>「七転び八起き」</p>
        <p className='text-gray-500 italic mt-1'>“Fall seven times, stand up eight.”</p>
        <p className='text-base text-gray-600 max-w-md text-center mt-4'>
          Every studen&apos;s path is unique. Let&apos;s make yours a success together!
        </p>
      </section>
    </main>
  )
}
