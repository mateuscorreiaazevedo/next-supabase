import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import supabase from './api/supabase'

export default function Home({ response }: any) {
  const [email, setEmail] = React.useState('')

  console.log(response)

  const handleSubscribe = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!email) {
        console.log('Digite o email')
        return
      }

      const { data, error, status } = await supabase.from('users').insert([{ email }])

      if (error) {
        if (status === 409) {
          alert('usuário já cadastrado')
        }
        console.log(error)
        return
      }

      setEmail('')
    },
    [email]
  )

  return (
    <>
      <Head>
        <title>NextJs App & Supabase</title>
      </Head>
      <div>
        <p>Assine a newsletter de Mateusdev e receba os melhores conteúdos sobre Programação!</p>
        <form onSubmit={handleSubscribe}>
          <input type="text" placeholder="Seu melhor e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit">Inscrever-se</button>
        </form>
      </div>
      <div>
        {response.map((user: any, key: React.Key) => (
          <p key={key}>{user.email}</p>
        ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase.from('users').select('*')
  let response

  if (error) {
    response = error
  } else {
    response = data
  }

  return {
    props: {
      response
    }
  }
}
