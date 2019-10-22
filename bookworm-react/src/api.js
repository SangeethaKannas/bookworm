import axios from 'axios'

export default {
    user: {
        login: (credentials) =>    axios.post('/api/auth', {credentials}).then(response => response.data.user),
        signup: (user) =>   axios.post('/api/users', { user }).then(response => response.data.user),
        confirm: (token) => axios.post('/api/auth/confirmation', {token}).then(response => response.data.user),
        resetPasswordRequest: (email) => axios.post('/api/auth/reset_password_request', {email}).then(response => response.data.user),
        validateToken: (token) => axios.post('/api/auth/validate_token', token).then(response => response.data.user)
    }
} 