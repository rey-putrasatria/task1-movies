import MovieType from '@/types/MovieType'
import { MOVIE_LIST } from '@/utils/endpoint'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useGetMovie = () => {
  const [data, setData] = useState<MovieType[]>([])

  useEffect(() => {
    const getMovie = async () => {
      const options = {
        method: 'GET',
        url: MOVIE_LIST,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.ACCESS_TOKEN,
        },
      }

      const res = await axios.request(options)
      setData(res.data.results)
      const formattedData: MovieType[] = res.data.results.map((movie: any) => ({
        original_title: movie.original_title || '',
        poster_path: movie.poster_path || '',
        release_date: movie.release_date || '',
        overview: movie.overview || '',
      }))

      setData(formattedData)
      console.log(res.data)
    }
    getMovie()
  }, [])
  return { data }
}
export default useGetMovie
