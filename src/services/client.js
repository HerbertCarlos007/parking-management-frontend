import api from './api'

async function getClientsService() {
    try {
        const response = await api.get('clients')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getClientsService
}