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

async function updateCompanyService(companyId, companyData) {
  try {
    const { data } = await api.put(`/company/${companyId}`, companyData);
    return data;
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error.response?.data || error.message);
    throw error; // 🔥 MUITO IMPORTANTE
  }
}


export default {
    getCompanyService, createCompanyService, updateCompanyService
}