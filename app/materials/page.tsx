import { grammarMaterials, immersionMaterials, vocabularyMaterials } from './_lib/materials'
import MaterialSection from './components/MaterialSection'

export default function Materials() {
  return (
    <main className='max-w-3xl mx-auto mt-8'>
      <h1 className='text-3xl font-bold text-blue-700 text-center drop-shadow'>Materials</h1>
      <p className='text-lg mb-8 font-semibold text-gray-600 max-w-xl mx-auto text-center'>
        Here, I gathered some materials that can help you with your studies.
      </p>
      <MaterialSection title='Grammar' materials={grammarMaterials} />
      <MaterialSection title='Vocabulary' materials={vocabularyMaterials} />
      <MaterialSection title='Imersion' materials={immersionMaterials} />
    </main>
  )
}
