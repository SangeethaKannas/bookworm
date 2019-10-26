import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types'
import api from '../api'
import setAuthorizationHeader from "../utils/setAuthorizationHeader";
import decode from 'jwt-decode'
import setAuthorizationHeaader from '../utils/setAuthorizationHeader'

export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
})

export const login = (credentials) => (dispatch) =>
 api.user.login(credentials).then(loginJWT => {    
     let token = loginJWT     
     localStorage.bookwormJWT = token     
     setAuthorizationHeaader(token)
     const payload = decode(token)     
     dispatch(userLoggedIn({token: token, email: payload.email, confirmed: payload.confirmed}))
  } )

export const logout = (credentials) => (dispatch) =>
{
  //TODO
//  api.user.logout().then(user => { 
     localStorage.removeItem('bookwormJWT')
     setAuthorizationHeader()
     dispatch(userLoggedOut())
  // })
}

export const confirm = (token) => (dispatch) =>
  api.user.confirm(token).then(user => { 
    localStorage.bookwormJWT = user.token
    dispatch(userLoggedIn(user))
   })

export const resetPasswordRequest = ( email ) => () => api.user.resetPasswordRequest(email)

export const resetPassword = ( password, token ) => () => {
  console.log('Resetting password')
  return api.user.resetPassword(password, token)
}

export const validateToken = ( token ) => () => api.user.validateToken(token)
