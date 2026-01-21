import api from './api'

const idParkingSettings = localStorage.getItem('id_parking_settings')

async function getParkingSettingsService() {
    try {
        const response = await api.get(`parking-settings/${idParkingSettings}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getParkingSettingsService
}