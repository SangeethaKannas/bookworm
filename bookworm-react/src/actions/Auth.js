import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types'
import api from '../api'
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})

export const userLoggedOut = (user) => ({
    type: USER_LOGGED_OUT,
    user
})

export const login = (credentials) => (dispatch) =>
 api.user.login(credentials).then(user => {
     localStorage.bookwormJWT = user.token
     setAuthorizationHeader(user.token)
     dispatch(userLoggedIn(user))
  } )

export const logout = (credentials) => (dispatch) =>
 api.user.logout().then(user => { 
     localStorage.removeItem('bookwormJWT')
     setAuthorizationHeader()
     dispatch(userLoggedOut(user))
  })

export const confirm = (token) => (dispatch) =>
  api.user.confirm(token).then(user => { 
    localStorage.bookwormJWT = user.token
    dispatch(userLoggedIn(user))
   })

export const resetPasswordRequest = ( email ) => () => api.user.resetPasswordRequest(email)

export const validateToken = ( token ) => () => api.user.resetPasswordRequest(token)
