import api from './api'

const idCompany = localStorage.getItem('id_company')

async function getCompanyService() {
    try {
        const response = await api.get(`company/${idCompany}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function createCompanyService(companyData) {
    try {
        const response = await api.post('company', companyData)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getCompanyService, createCompanyService
}