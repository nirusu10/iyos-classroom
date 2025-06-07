import { Material } from '../_lib/materials'
import MaterialCard from './MaterialCard'

const MaterialSection = ({ title, materials }: { title: string; materials: Material[] }) => {
  return (
    <section className='rounded-2xl p-4 bg-blue-50 shadow mt-8'>
      <h2 className='text-xl font-bold text-blue-700 tracking-tight'>{title}</h2>
      <ul className='grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))] justify-center mt-4'>
        {materials.map((material) => (
          <MaterialCard key={material.title} material={material} />
        ))}
      </ul>
    </section>
  )
}

export default MaterialSection
