import api from './api'

async function getParkingSpotsAvailablesService() {
    try {
        const response = await api.get('parking-spots-available')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function getParkingSpotsStatusService() {
    try {
        const response = await api.get('parking-spots-status')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function getSpotsStatsService() {
    try {
        const response = await api.get('spots-stats')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getParkingSpotsAvailablesService, getParkingSpotsStatusService, getSpotsStatsService
}