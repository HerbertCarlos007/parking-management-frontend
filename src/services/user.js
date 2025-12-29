import api from './api'

async function getUsersService() {
    try {
        const response = await api.get('users')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getUsersService
}