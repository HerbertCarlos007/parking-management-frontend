import { createRouter, createWebHistory } from 'vue-router'
import ParkingEntryComponent from '@/components/ParkingEntryComponent.vue'
import UserComponent from '@/components/UserComponent.vue'
import ManageSpots from '@/components/ManageSpotsComponent.vue'
import Transactions from '@/components/TransactionComponent.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import parkingSettings from '@/components/parkingSettingsComponent.vue'
import CompanyComponent from '@/components/CompanyComponent.vue'
import ClientComponent from '@/components/ClientComponent.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'

const routes = [

    {
        path: '/',
        redirect: '/login',
    },


    {
        path: '/login',
        name: 'login',
        component: LoginComponent,
    },

    {
        path: '/company',
        name: 'Company',
        component: CompanyComponent,
    },

    {
        path: '/parking-entry',
        name: 'parking entry',
        component: ParkingEntryComponent,
    },

    {
        path: '/users',
        name: 'users',
        component: UserComponent,
    },

    {
        path: '/manage-spots',
        name: 'manage spots',
        component: ManageSpots,
    },

    {
        path: '/transactions',
        name: 'Transactions',
        component: Transactions,
    },

    {
        path: '/settings',
        name: 'Settings ',
        component: parkingSettings,
    },

     {
        path: '/clients',
        name: 'Client ',
        component: ClientComponent,
    },

    {
        path: '/dashboard',
        name: 'Dashboard ',
        component: DashboardComponent,
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router