import Image from 'next/image'
import Layout from '../components/Layout'
import Link from 'next/link'
export default function Home({ pokemon }) {
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center">Next.js Pokedex</h1>
      <ul>
        {pokemon.map((item, index) => {
          return (
            <li key={index}>
              <Image
                src={item.image}
                alt={item.name}
                layout="responsive"
                width={475}
                height={475}
              />
              <Link className="flex" href={`/pokemonV10?id=${index + 1}`}>
                <a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                  <span className="mr-2 font-bold">{index + 1}</span>{' '}
                  {item.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const { results } = await res.json()

    const pokemon = results.map((result, index) => {
      const paddedIndex = ('00' + (index + 1)).slice(-3)

      const image = `http://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
      return {
        ...result,
        image,
      }
    })
    return {
      props: { pokemon },
    }
  } catch (err) {
    console.log(err)
  }
}
