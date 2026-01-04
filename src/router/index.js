import {createRouter, createWebHistory} from 'vue-router'
import ParkingEntryComponent from '@/components/ParkingEntryComponent.vue'
import UserComponent from '@/components/UserComponent.vue'
import ManageSpots from '@/components/ManageSpotsComponent.vue'
import Transactions from '@/components/TransactionComponent.vue'

const routes = [
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

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router