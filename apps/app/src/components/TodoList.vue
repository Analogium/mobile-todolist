<template>
  <div class="todolist-container">
    <div v-for="(todoList, index) in todoLists" :key="index" class="todoList">
      <div class="todolist-title">
        <h2>{{ todoList.title }}</h2>
        <button class="edit-button" @click="showDialog(todoList)">
          <Icon icon="bi:three-dots" />
        </button>
      </div>
      <div v-if="todoList.tasks.length === 0">
        <p class="zero-task">Cette liste ne contient aucune tâches ajoutez en une depuis la liste</p>
      </div>
      <div v-else>
        <div v-for="(task, index) in todoList.tasks.slice(0, 2)" :key="index" class="task-container">
          <input type="checkbox" id="checkbox" v-model="task.isMake" @change="updateTask(todoList)" />
          <label :class="{ 'line-through': task.isMake }" for="checkbox" class="task">{{ task.title }}</label>
        </div>
      </div>
      <router-link :to="'/lists/' + todoList._id" class="router-list">Voir la liste complète</router-link>
    </div>
    <div class="dialog-overlay" v-if="showDialogFlag">
      <div class="dialog">
        <h3>{{ selectedTodoList.title }}</h3>
        <div class="dialog-button-row">
          <router-link :to="'/lists/' + selectedTodoList._id + '/modify-todo'">
            <button class="modify-todo" @click="">Modifier</button>
          </router-link>
        </div>
        <div class="dialog-button-row">
          <button class="delete-todo" @click="deleteTodo()">Supprimer</button>
        </div>
        <button class="close-dialog" @click="hideDialog()">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vue, Options } from 'vue-class-component'
import { getTodoLists, updateTodoList, deleteTodoList } from '../api';
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';

const todoLists: any[] = ref([]);
const showDialogFlag = ref(false);
const selectedTodoList = ref(null);

onMounted(async () => {
  const response = await getTodoLists();
  todoLists.value = response.data;
  console.log(todoLists);
})

async function updateTask(todoList: any) {
  const response = await updateTodoList(todoList._id, { tasks: todoList.tasks });
  console.log(response.data);
}

function showDialog(todoList: any) {
  selectedTodoList.value = todoList;
  showDialogFlag.value = true;
}

function hideDialog() {
  selectedTodoList.value = null;
  showDialogFlag.value = false;
}


async function deleteTodo() {

  await deleteTodoList(selectedTodoList.value._id);
  hideDialog()
  const response = await getTodoLists();
  todoLists.value = response.data;
}

</script>
<style scoped>
.delete-todo {
  color: #C10707;
}

.close-dialog {
  color: #613973;
  font-weight: bold;
}

.dialog-button-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding-top: 20px;
}

.dialog-button-row button {
  margin-right: 10px;
}

.dialog-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.dialog {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}

.close-dialog {
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  cursor: pointer;
}

.line-through {
  text-decoration: line-through;
}

.todolist-title {

  width: 322px;
  height: 52px;


  background-color: #F2F2F2;
  border-radius: 10px 10px 0px 0px;
}

h2 {
  display: flex;
  width: 284px;
  height: 25px;
  padding-left: 21px;
  padding-top: 13px;
  padding-right: 14px;
  padding-bottom: 17px;


  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height */


  color: #2C272E;
}

.zero-task {

  margin: 43px 17px 39px 21px;

  width: 284px;
  height: 43px;

  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  color: #2C272E;
}

.task-container {
  margin: 21px 16px 0 21px;
  display: flex;
  text-align: center;
}

input {
  width: 17.12px;
  height: 17.63px;

  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

.task {

  margin-left: 16px;
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  color: #434343;
}

.todoList {
  position: relative;

  width: 322px;
  height: 228px;

  background: #FFFFFF;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  margin-left: 23px;
  margin-bottom: 32px;
}

.router-list {
  position: absolute;
  /* ajouter position absolute */
  left: 50%;
  /* centrer horizontalement */
  transform: translateX(-50%);
  /* centrer horizontalement */
  bottom: 0;

  width: 281px;
  height: 25px;

  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  color: #2C272E;

}

.edit-button {
  position: absolute;
  right: 5%;
  top: 8%;

}
</style>





