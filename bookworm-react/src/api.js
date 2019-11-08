import axios from 'axios'

export default {
    user: {
        login: (credentials) => axios.post('/api/auth', {credentials}).then(response => response.data.loginJWT),
        logout: (token) => axios.post('/api/auth/logout', {token}).then(response => response.data.user),
        signup: (user) =>   axios.post('/api/users', { user }).then(response => response.data.user),
        confirm: (token) => axios.post('/api/auth/confirmation', {token}).then(response => response.data.user),
        resetPasswordRequest: (email) => axios.post('/api/auth/reset_password_request', email).then(response => response.data.user),
        resetPassword: (data) => axios.post('/api/auth/reset_password', {data}).then(response => response.data.user),
        validateToken: (token) => axios.post('/api/auth/validate_token', {token}).then(response => response.data.user)
    },
    books: {
        fetchAll: ()=> axios.get('/api/books').then(res => res.data.books),
        createBook: (book)=> axios.post('/api/books').then(res => res.data.book)
    }
} 