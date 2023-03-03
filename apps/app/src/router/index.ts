import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TaskView from '../views/TaskView.vue'
import ListView from '../views/ListView.vue'
import AddTaskView from '../views/AddTaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/lists/:id', name: 'list-view', component: ListView, props: true
    },
    {
      path: '/lists/:id/add-task', name: 'add-task-view', component: AddTaskView, props: true,
      meta: {transition: "slide-up"}
    }
  ]
})

export default router
