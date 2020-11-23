import Image from 'next/image'
import Layout from '../components/Layout'
import Link from 'next/link'
import React from 'react'

export default function PokemonV10({ item }) {
  return (
    <Layout title={item.name}>
      <h1 className="text-4l mb-2 text-center capitalize">{item.name}</h1>
      <Image
        className="mx-auto"
        src={item.image}
        alt={item.name}
        layout="responsive"
        width={475}
        height={475}
      />
      <p>
        <span className="font-bold mr-2">Weight: </span>
        {item.weight}
      </p>
      <p>
        <span className="font-bold mr-2">Height: </span>
        {item.height}
      </p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {item.types.map((type, index) => {
        return <p key={index}>{type.type.name}</p>
      })}
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl underline">Home</a>
        </Link>
      </p>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const id = query.id
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const item = await res.json()

    const paddedIndex = ('00' + id).slice(-3)
    const image = `http://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
    item.image = image
    return {
      props: { item },
    }
  } catch (err) {
    console.log(err)
  }
}
