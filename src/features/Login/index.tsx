import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRequestTokenMutation, useSessionIdQuery } from './hooks'

const inter = Inter({ subsets: ['latin'] })

const LoginFeature: React.FC = () => {
  const router = useRouter()
  const { mutate: requestMutate } = useRequestTokenMutation()
  const { data: sessionIdQuery, mutate: sessionMutate } = useSessionIdQuery()

  useEffect(() => {
    if (router.query.request_token) {
      const storage: string | null = sessionStorage.getItem('requestToken')
      sessionMutate(storage)
    }
  }, [router.query.approved])
  return (
    <main
      className={`bg-[#0d253f] flex h-screen flex-col items-center justify-center gap-4 ${inter.className}`}
    >
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
        alt="Logo"
        className="lg:w-1/2 w-full px-8"
      />
      {sessionIdQuery ? (
        <Link href="/movie">
          <Button
            className="bg-[#90cea1] border-none hover:bg-[#01b4e4] mb-2"
            style={{
              color: 'white',
            }}
          >
            See Your Movie
          </Button>
        </Link>
      ) : (
        <Button
          className="bg-[#90cea1] border-none hover:bg-[#01b4e4] mb-2"
          style={{
            color: 'white',
          }}
          onClick={() => requestMutate()}
        >
          Login Yuk!
        </Button>
      )}
    </main>
  )
}

export default LoginFeature
