import api from './api'

async function getUsersService() {
    try {
        const response = await api.get('users')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function createUserService(userData) {
    try {
        const response = await api.post('users', userData)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getUsersService, createUserService
}