import api from './api'

const idCompany = localStorage.getItem('id_company')

async function getClientsService() {
    try {
        const response = await api.get(`clients/${idCompany}`)
        return response.data
    } catch (error) {
        console.error()
    }
}

async function createClientService(clientData) {
    try {
        const response = await api.post('clients', clientData)
        return response.data
    } catch (error) {
        console.error()
    }
}

async function updateClientService(client, clientData) {
    try {
        const response = await api.put(`clients/${client}`, clientData)
        return response.data
    } catch (error) {
        console.error()
    }
}

export default {
    getClientsService, createClientService, updateClientService
}