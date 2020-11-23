import Head from 'next/head'
import React from 'react'

export default function Layout({ title, children }) {
  return (
    <div className="bg-grey-300">
      <Head>
        <title>{title}</title>
        <link ref="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-xl pt-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
