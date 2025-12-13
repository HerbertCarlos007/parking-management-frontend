import api from './api'

async function getParkingEntriesService(status) {
    try {
        const response = await api.get(`parking-entries/${status}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function createParkingEntryService(parkingEntryData) {
    try {
        const response = await api.post('parking-entries', parkingEntryData)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function registerParkingService(id) {
     try {
        const response = await api.put(`parking-entries/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getParkingEntriesService, createParkingEntryService,registerParkingService
}