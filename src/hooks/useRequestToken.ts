// useRequestToken.js
import { useEffect, useState } from 'react'
import axios from 'axios'

const useRequestToken = () => {
  const [requestToken, setRequestToken] = useState('')

  const fetchRequestToken = async () => {
    try {
      const requestTokenResponse = await fetch(
        'https://api.themoviedb.org/3/authentication/token/new?api_key=' +
          process.env.API_KEY
      )
      const { request_token } = await requestTokenResponse.json()
      setRequestToken(request_token)
      
      sessionStorage.setItem('requestToken', request_token)
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:3000`
    } catch (error) {
      console.error('Gagal mendapatkan request token:', error)
    }
  }

  return { requestToken, setRequestToken, fetchRequestToken }
}

export default useRequestToken
