<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, onMounted } from 'vue';
import { createTodoList, getTodoLists } from '../api';

const popup = ref(false);
const sidebarOpen = ref(false);

interface Todo {
  _id?: string;
  title: string;
}

onMounted(async () => {
  await getTodos();
});

const todo = ref<Todo>({ title: "" });
const todoLists = ref<Todo[]>([]);


function setPopup(bool: boolean) {
  popup.value = bool;
}

async function createTodo() {
  if (todo.value.title.length != 0) {
    await createTodoList({
      title: todo.value.title,
    });
  }
  await getTodos();
  setPopup(false);
}

async function getTodos() {
  const response = await getTodoLists();
  todoLists.value = response.data;

}

</script>

<template>
  <div class="navbar">
    <div class="left-icon" @click="sidebarOpen = true">
      <Icon icon="material-symbols:filter-list-rounded" />
    </div>
    <div class="add-button" @click="setPopup(true)">
      <button>
        <Icon icon="material-symbols:add" />
      </button>
    </div>
    <div class="right-icon" @click="">
      <Icon icon="uil:user" />
    </div>
  </div>

  <div class="sidebar" :class="{ open: sidebarOpen }">
    <div class="sidebar-header">
      <h2>Mes listes</h2>
      <button class="close-sidebar" @click="sidebarOpen = false">
        <Icon icon="uil:times" />
      </button>
    </div>
    <div class="sidebar-content">
      <button @click="setPopup(true)" class="create-todo-button">Créer une nouvelle liste</button>
    </div>

    <div v-if="!todoLists.length">
      <p class="zero-task">Zero todolist !</p>
    </div>
    <div v-else>
      <div v-for="(todo, index) in todoLists" :key="index" class="todo-container">
        <RouterLink :to="'/lists/' + todo._id" class="router-list">
          {{ todo.title }}
        </RouterLink>
      </div>
    </div>
  </div>

  <VDialog v-model="popup">
    <div class="todolist-container">
      <h2>Créer une nouvelle liste</h2>
      <div class="close-button" @click="setPopup(false)">
        <button>
          <span>x</span>
        </button>
      </div>

      <div class="todo-title-container">
        <h5>List name</h5>
        <input v-model="todo.title" placeholder="Ex: Courses" class="todo-title" />
      </div>

      <div class="button-popup-container">
        <button @click="setPopup(false)">
          <h4>Annuler</h4>
        </button>

        <button class="create-todo" @click="createTodo()">
          <h4>Créer</h4>
        </button>
      </div>

    </div>
  </VDialog>
</template>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

  h2 {
    margin-top: 20%;
    margin-bottom: 10%;
    margin-left: 10%;
  }

  .todo-container {
    margin-left: 10%;
    margin-top: 10%;
    margin-bottom: 5%;
  }

  .router-list {
    text-decoration: none;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;

    color: #2C272E;
  }
}

.close-sidebar {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.sidebar.open {
  transform: translateX(0%);
}

.navbar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.2);
}

.create-todo-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 15px;
  color: white;
  width: 80%;
  margin-left: 10%;


  background: #613973;
  border-radius: 5px;
}

.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43px;
  height: 43px;
  left: 168px;
  top: 617px;

  border-radius: 50%;
  background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.add-button button {
  display: flex;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.left-icon,
.right-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.todolist-container {

  position: relative;

  width: 323px;
  height: 235px;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
  border-radius: 14px;

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 37px;


    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    /* identical to box height */


    color: #2C272E;
  }

}

.todolist-container .close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 5%;
  height: 5%;

}

.todo-title-container {
  margin: auto;
  margin-top: 5%;
  width: 90%;
  height: 30%;
}

.todo-title {
  width: 100%;
  height: 50%;
  margin-top: 2%;
  box-sizing: border-box;

  /* /Gray / White */

  background: #FFFFFF;
  /* Stroke/Input */

  border: 1px solid #CED4DA;
  border-radius: 4px;
}

.button-popup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: absolute;
  bottom: 10%;
  gap: 15%;

  button {
    width: 30%;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}

.create-todo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;



  background: #613973;
  border-radius: 5px;
  color: #FFFFFF;
}
</style>
