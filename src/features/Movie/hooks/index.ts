import { MOVIE_LIST, MOVIE_SEARCH } from '@/constant/endpoint'
import { getSessionId, getSessionProfile } from '@/helpers/storage'
import axiosInstance from '@/services/adapter/axiosInstance'
import { message } from 'antd'
import MovieType from '@/types/MovieType'
import { useMutation, useQuery } from '@tanstack/react-query'

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

      const formattedData: MovieType[] = res.data.results.map((movie: any) => ({
        id: movie.id || '',
        original_title: movie.original_title || '',
        poster_path: movie.poster_path || '',
        release_date: movie.release_date || '',
        overview: movie.overview || '',
        vote_average: movie.vote_average || '',
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

export const useCreateFavoriteMovie = () => {
  return useMutation({
    mutationKey: ['createFavoriteMovie'],
    mutationFn: async (id: number) => {
      const sessionId = getSessionId()
      const profile = getSessionProfile()
      const data = {
        media_type: 'movie',
        media_id: id,
        favorite: true,
      }
      const res = await axiosInstance.post(
        `/account/${profile.id}/favorite?session_id=${sessionId}`,
        data
      )
      return res.data
    },
    onSuccess: (data) => {
      message.destroy()
      message.open({
        type: 'success',
        content: data.status_message,
        className: 'mt-[5.3rem]',
      })
    },
    onError: () => {
      message.destroy()
      message.open({
        type: 'error',
        content: 'You must be login again!',
        className: 'mt-[5.3rem]',
      })
    },
  })
}
