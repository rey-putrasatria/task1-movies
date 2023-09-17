import { getSessionId, getSessionProfile } from '@/helpers/storage'
import axiosInstance from '@/services/adapter/axiosInstance'
import MovieType from '@/types/MovieType'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useFavoriteMovie = () => {
  return useQuery({
    queryKey: ['favoriteMovie'],
    queryFn: async () => {
      const profile = getSessionProfile()
      const sessionId = getSessionId()
      const res = await axiosInstance.get(
        `https://api.themoviedb.org/3/account/${profile.id}/favorite/movies`,
        {
          params: {
            language: 'en-US',
            page: 1,
            session_id: sessionId,
            sort_by: 'created_at.dsc',
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

      return formattedData
    },
  })
}

export const useRemoveFavoriteMovie = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createFavoriteMovie'],
    mutationFn: async (id: number) => {
      const sessionId = getSessionId()
      const profile = getSessionProfile()
      const data = {
        media_type: 'movie',
        media_id: id,
        favorite: false,
      }
      const res = await axiosInstance.post(
        `/account/${profile.id}/favorite?session_id=${sessionId}`,
        data
      )
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['favoriteMovie'])
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
