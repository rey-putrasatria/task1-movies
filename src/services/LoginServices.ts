import axiosInstance from "./adapter/axiosInstance"

export const fetchRequestToken = async () => {
  const requestTokenResponse = await axiosInstance.get(
    '/authentication/token/new?api_key=' +
      process.env.API_KEY
  )
  const { request_token } = requestTokenResponse.data
  sessionStorage.setItem('requestToken', request_token)
  return request_token
}

export const fetchSessionId = async (requestToken: string | null) => {
  const sessionIdResponse = await axiosInstance.get(
    `/authentication/session/new?api_key=${process.env.API_KEY}&request_token=${requestToken}`
  )
  const { session_id } = sessionIdResponse.data
  sessionStorage.setItem('sessionId', session_id)
  return session_id
}

export const redirectToAuthentication = (requestToken: string) => {
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000`
}

export const fetchDetailProfile = async (sessionId: string | null) => {
  const detailProfileResponse = await axiosInstance.get(
    `/account?api_key=${process.env.API_KEY}&session_id=${sessionId}`
  )
  const profileJSON = JSON.stringify(detailProfileResponse.data)
  sessionStorage.setItem('profile', profileJSON)
  return detailProfileResponse.data
}