import {createRouter, createWebHistory} from 'vue-router'
import ParkingEntryComponent from '@/components/ParkingEntryComponent.vue'
import UserComponent from '@/components/UserComponent.vue'

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

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router