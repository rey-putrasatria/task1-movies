import {
  fetchDetailProfile,
  fetchRequestToken,
  fetchSessionId,
  redirectToAuthentication,

} from '@/services/LoginServices'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useSessionIdMutation = () => {
  return useMutation({
    mutationKey: ['sessionId'],
    mutationFn: (requestToken: string | null) => {
      return fetchSessionId(requestToken)
    },
    onSuccess: () => {
      message.success('Login Berhasil!')
    },
  })
}

export const useRequestTokenMutation = () => {
  return useMutation({
    mutationKey: ['requestMutation'],
    mutationFn: fetchRequestToken,
    onSuccess: (data) => {
      redirectToAuthentication(data)
    },
  })
}

export const useDetailProfile = (sessionId: string) => {
  return useQuery({
    queryKey: ['detailProfile'],
    queryFn:  () => fetchDetailProfile(sessionId),
    enabled: sessionId ? true : false
    },
  )
}