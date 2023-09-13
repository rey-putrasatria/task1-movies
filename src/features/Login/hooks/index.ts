import { serviceRequestToken, serviceSessionId } from '@/services/LoginServices'

export const useRequestToken = () => {
  return serviceRequestToken()
}

export const useSessionId = (requestToken: string) => {
  return serviceSessionId(requestToken)
}
