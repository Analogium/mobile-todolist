import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import AddTaskView from '../views/AddTaskView.vue'
import ModifyTodoView from '../views/ModifyTodoView.vue'
import CheckTaskView from '../views/CheckTaskView.vue'
import ModifyTaskView from '../views/ModifyTaskView.vue'

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
    },
    {
      path: '/lists/:id/modify-todo', name: 'modify-todo-view', component: ModifyTodoView, props: true,
      meta: {transition: "slide-up"}
    },
    {
      path: '/lists/:id/task/:tid', name: 'check-task-view', component: CheckTaskView, props: true,
      meta: {transition: "slide-up"}
    },
    {
      path: '/lists/:id/modify-task/:tid', name: 'modify-task-view', component: ModifyTaskView, props: true,
      meta: {transition: "slide-up"}
    }
  ]
})

export default router
