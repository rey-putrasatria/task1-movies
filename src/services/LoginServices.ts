import axiosInstance from "./adapter/axiosInstance"

export const fetchRequestToken = async () => {
  const requestTokenResponse = await axiosInstance.get(
    'https://api.themoviedb.org/3/authentication/token/new?api_key=' +
      process.env.API_KEY
  )
  const { request_token } = requestTokenResponse.data
  sessionStorage.setItem('requestToken', request_token)
  return request_token
}

export const fetchSessionId = async (requestToken: string | null) => {
  const sessionIdResponse = await axiosInstance.get(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.API_KEY}&request_token=${requestToken}`
  )
  const { session_id } = sessionIdResponse.data
  sessionStorage.setItem('sessionId', session_id)
  return session_id
}

export const redirectToAuthentication = (requestToken: string) => {
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000`
}
