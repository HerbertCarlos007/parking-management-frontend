import api from './api'

async function loginService(loginData) {
    try {
        const response = await api.post('login', loginData)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
export default {
    loginService
}