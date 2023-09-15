import { MOVIE_LIST, MOVIE_SEARCH } from '@/constant/endpoint'
import axiosInstance from '@/services/adapter/axiosInstance'
import MovieType from '@/types/MovieType'
import { useQuery } from '@tanstack/react-query'

export const useGetMovie = (params: Record<string, any>, current: Number) => {
  return useQuery({
    queryKey: ['getMovies', { params, current }],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `${params.search ? MOVIE_SEARCH : MOVIE_LIST}`,
        {
          params: {
            query: params.search,
            include_adult: 'false',
            include_video: 'false',
            language: 'en-US',
            page: current,
            sort_by: params.sort,
            with_genres: params.filter,
          },
        }
      )

      console.log(res.data)
      const formattedData: MovieType[] = res.data.results.map((movie: any) => ({
        original_title: movie.original_title || '',
        poster_path: movie.poster_path || '',
        release_date: movie.release_date || '',
        overview: movie.overview || '',
        vote_average: movie.vote_average || ''
      }))

      return { data: formattedData }
    },
  })
}

export const useGetGenre = () => {
  return useQuery({
    queryKey: ['getGenre'],
    queryFn: async () => {
      const res = await axiosInstance.get('/genre/movie/list')
      return res.data.genres
    },
  })
}
