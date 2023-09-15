import {
  fetchRequestToken,
  fetchSessionId,
  redirectToAuthentication,

} from '@/services/LoginServices'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'

export const useSessionIdQuery = () => {
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
