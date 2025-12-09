import api from './api'

async function getParkingEntriesService(status) {
    try {
        const response = await api.get(`parking-entries/${status}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getParkingEntriesService
}