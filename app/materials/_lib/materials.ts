export type Material = {
  title: string
  description?: string
  image: string
  buttonText?: string
  link: string
}

export const grammarMaterials: Material[] = [
  {
    title: 'N5 Grammar Guide',
    description: 'A comprehensive overview of JLPT N5 grammar structures.',
    image: 'https://picsum.photos/seed/grammar1/400/250',
    buttonText: 'Download',
    link: '#',
  },
  {
    title: 'Particles Cheat Sheet',
    description: 'Quick reference for the most common Japanese particles.',
    image: 'https://picsum.photos/seed/particles/400/250',
    buttonText: 'Download',
    link: '#',
  },
  {
    title: 'Essential Sentence Patterns',
    description: 'Useful sentence structures for daily conversations.',
    image: 'https://picsum.photos/seed/sentences/400/250',
    buttonText: 'Open',
    link: '#',
  },
  {
    title: 'Te-Form Song',
    description: 'Memorize the te-form with a catchy tune.',
    image: 'https://picsum.photos/seed/music/400/250',
    buttonText: 'Watch',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
]

export const vocabularyMaterials: Material[] = [
  {
    title: 'N5 Core Vocabulary List',
    description: '200 must-know words for beginners.',
    image: 'https://picsum.photos/seed/vocab1/400/250',
    buttonText: 'Download',
    link: '#',
  },
  {
    title: 'Animals in Japanese',
    description: 'Learn how to say your favorite animals.',
    image: 'https://picsum.photos/seed/animals/400/250',
    buttonText: 'Open',
    link: '#',
  },
  {
    title: 'Colors & Adjectives',
    description: 'Expand your descriptive power!',
    image: 'https://picsum.photos/seed/colors/400/250',
    buttonText: 'Open',
    link: '#',
  },
  {
    title: 'Katakana Food Words',
    description: "Imported food names you'll see in Japan.",
    image: 'https://picsum.photos/seed/foodwords/400/250',
    buttonText: 'Download',
    link: '#',
  },
]

export const immersionMaterials: Material[] = [
  {
    title: 'Easy Anime Episode',
    description: 'A beginner-friendly anime episode with Japanese subtitles.',
    image: 'https://picsum.photos/seed/anime/400/250',
    buttonText: 'Watch',
    link: '#',
  },
  {
    title: 'Japanese News for Kids',
    description: 'Simple news videos spoken slowly for learners.',
    image: 'https://picsum.photos/seed/news/400/250',
    buttonText: 'Watch',
    link: '#',
  },
  {
    title: 'Radio Podcasts',
    description: 'Listen to Japanese podcasts for all levels.',
    image: 'https://picsum.photos/seed/podcasts/400/250',
    buttonText: 'Listen',
    link: '#',
  },
  {
    title: "Children's Picture Book",
    description: 'Read along with a classic Japanese storybook.',
    image: 'https://picsum.photos/seed/picturebook/400/250',
    buttonText: 'Open',
    link: '#',
  },
]
