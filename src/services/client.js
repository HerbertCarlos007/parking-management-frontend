import api from './api'

const idCompany = localStorage.getItem('id_company')

async function getClientsService() {
    try {
        const response = await api.get(`clients/${idCompany}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getClientsService
}