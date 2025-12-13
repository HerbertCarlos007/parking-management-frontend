import api from './api'

async function getParkingSpotsAvailablesService() {
    try {
        const response = await api.get('parking-spots-available')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getParkingSpotsAvailablesService
}