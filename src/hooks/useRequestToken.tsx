import { access_token, CREATE_SESSION } from '@/utils/endpoint'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useRequestToken = () => {
  const [token, setToken] = useState<string>('')
  useEffect(() => {
    const getRequestToken = async () => {
      try {
        const res = await axios.get(
          'https://api.themoviedb.org/3/authentication/token/new',
          {
            params: {
              api_key: '62867e26f0e86f6d365944f0ded3d920',
            },
          }
        )
        console.log(res.data)
        setToken(res.data.request_token)
      } catch (err) {
        console.log(err)
      }
    }
    getRequestToken()
  }, [])
  return { token }
}
export default useRequestToken
