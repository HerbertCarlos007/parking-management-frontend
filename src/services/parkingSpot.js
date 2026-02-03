import api from './api'

const idCompany = localStorage.getItem('id_company')

async function getParkingSpotsAvailablesService() {
    try {
        const response = await api.get(`parking-spots-available/${idCompany}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function getParkingSpotsStatusService() {
    try {
        const response = await api.get(`parking-spots-status/${idCompany}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function getSpotsStatsService() {
    try {
        const response = await api.get(`spots-stats/${idCompany}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function getOccupancyByHourService() {
    try {
        const response = await api.get(`occupancy/${idCompany}`)
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

async function updateSpotService(spotId, spotData) {
    try {
        const response = await api.put(`parking-spots/${spotId}`, spotData)
    } catch (error) {
         console.error(error)
    }
}

async function deleteSpotService(spotId) {
    try {
        const response = await api.delete(`parking-spots/${spotId}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}   

export default {
    getParkingSpotsAvailablesService, getParkingSpotsStatusService, getSpotsStatsService, createSpotService, updateSpotService, deleteSpotService, getOccupancyByHourService
}