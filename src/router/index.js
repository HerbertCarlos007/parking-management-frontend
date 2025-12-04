import {createRouter, createWebHistory} from 'vue-router'
import ParkingEntryComponent from '@/components/ParkingEntryComponent.vue'

const routes = [
    {
        path: '/parking-entry', 
        name: 'parking entry',
        component: ParkingEntryComponent,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router