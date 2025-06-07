import Image from 'next/image'
import { Material } from '../_lib/materials'
import Button from '@/components/ui/Button'

const MaterialCard = ({ material }: { material: Material }) => {
  return (
    <li className='flex flex-col gap-3 items-center text-center bg-white rounded-2xl shadow p-5 transition-transform hover:-translate-y-0.5 hover:shadow-xl min-h-[330px]'>
      <h3 className='font-semibold text-lg text-blue-900'>{material.title}</h3>
      <Image
        src={material.image}
        alt={material.title}
        className='h-32 w-full object-cover rounded-xl shadow border-2 border-blue-100 bg-blue-50 mt-2'
        width={100}
        height={32}
      />
      <p className='text-gray-600 text-base flex-1 mt-2'>{material.description}</p>
      <Button
        as='a'
        href={material.link}
        target={material.link.startsWith('http') ? '_blank' : undefined}
        rel={material.link.startsWith('http') ? 'noopener noreferrer' : undefined}
        className='mt-2 px-5 py-2 rounded-xl font-semibold shadow transition bg-blue-600 hover:bg-blue-700 text-white'
      >
        {material.buttonText}
      </Button>
    </li>
  )
}

export default MaterialCard
