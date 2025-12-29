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

async function updateUserService(user, userData) {
    try {
        const response = await api.put(`users/${user}`, userData)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function deleteUserService(user) {
    try {
        const response = await api.delete(`users/${user}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}   

export default {
    getUsersService, createUserService, updateUserService, deleteUserService
}