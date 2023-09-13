import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRequestToken, useSessionId } from './hooks'

const inter = Inter({ subsets: ['latin'] })

const LoginFeature: React.FC = () => {
  const router = useRouter()
  const { requestToken, setRequestToken, fetchRequestToken } = useRequestToken()
  const { sessionId, fetchSessionId } = useSessionId(requestToken)

  useEffect(() => {
    const savedRequestToken = sessionStorage.getItem('requestToken')
    if (savedRequestToken) {
      setRequestToken(savedRequestToken)
    }

    if (!sessionId && router.query.approved === 'true') {
      fetchSessionId()
    }
  }, [requestToken, sessionId, router.query.approved])

  return (
    <main
      className={`bg-[#0d253f] flex h-screen flex-col items-center justify-center gap-4 ${inter.className}`}
    >
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
        alt="Logo"
        className="lg:w-1/2 w-full px-8"
      />
      <h1>{sessionId}</h1>
      {sessionId ? (
        <Link href="/movies">
          <Button>See Your Movie</Button>
        </Link>
      ) : (
        <Button
          className="bg-[#90cea1] border-none hover:bg-[#01b4e4] mb-2"
          style={{
            color: 'white',
          }}
          onClick={fetchRequestToken}
        >
          Login Yuk!
        </Button>
      )}
    </main>
  )
}

export default LoginFeature
