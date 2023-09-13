import { useEffect, useState } from 'react'

const useSessionId = (requestToken: string) => {
  const [sessionId, setSessionId] = useState('')

  const fetchSessionId = async () => {
    try {
      const sessionIdResponse = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.API_KEY}&request_token=${requestToken}`
      )
      const { session_id } = await sessionIdResponse.json()
      setSessionId(session_id)
    } catch (error) {
      console.error('Gagal mendapatkan session ID:', error)
    }
  }

  return { sessionId, fetchSessionId }
}

export default useSessionId
