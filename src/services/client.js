import api from './api'

const idParkingSettings = localStorage.getItem('id_parking_settings')

async function getClientsService() {
    try {
        const response = await api.get(`clients/${idParkingSettings}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getClientsService
}