import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import axios from 'axios'
import useRequestToken from '@/hooks/useRequestToken'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const Home: React.FC = () => {
  const { token } = useRequestToken()
  const router = useRouter()
  const { request_token } = router.query
  const authUrl = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/home`
  return (
    <main
      className={`bg-[#0d253f] flex h-screen flex-col items-center justify-center gap-4 ${inter.className}`}
    >
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
        alt="Logo"
        className="lg:w-1/2 w-full px-8"
      />
      {/* Gunakan tautan untuk mengarahkan ke halaman autentikasi TMDb */}
      <Link href={authUrl}>
        <Button
          className="bg-[#90cea1] border-none hover:bg-[#01b4e4] mb-2"
          style={{
            color: 'white',
          }}
        >
          Login Yuk!
        </Button>
      </Link>
    </main>
  )
}

export default Home
