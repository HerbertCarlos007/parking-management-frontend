import api from './api'

const idParkingSettings = localStorage.getItem('id_parking_settings')

async function getParkingSpotsAvailablesService() {
    try {
        const response = await api.get(`parking-spots-available/${idParkingSettings}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function getParkingSpotsStatusService() {
    try {
        const response = await api.get(`parking-spots-status/${idParkingSettings}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function getSpotsStatsService() {
    try {
        const response = await api.get(`spots-stats/${idParkingSettings}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function createSpotService(spotData) {
    try {
        const response = await api.post('parking-spots', spotData)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getParkingSpotsAvailablesService, getParkingSpotsStatusService, getSpotsStatsService, createSpotService
}