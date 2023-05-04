<template>
    <main>
        <div class="add-task-header">
            <button class="back-button" @click="$router.go(-1)">
                <Icon class="back-icon" icon="material-symbols:arrow-back-ios-rounded" />
            </button>
        </div>
        <button class="edit-button" @click="showDialog()">
            <Icon icon="bi:three-dots" />
        </button>
        <div class="modify-task">
            <h2 class="modify-task-title">Task</h2>

            <div class="modify-task-content">
                <div class="content">
                    <h3>Titre</h3>
                    <span class="task-title my-input">{{ task.title }}</span>
                </div>

                <div class="content">
                    <h3>Description</h3>
                    <span class="task-describe my-input">{{ task.description }}</span>
                </div>

                <div class="content">
                    <h3>Terminée</h3>
                    <span class="task-describe my-input">{{ task.isMake ? 'Oui' : 'Non' }}</span>
                </div>

            </div>
        </div>
        <div class="swaptodo-overlay" v-if="showDialogFlag2">
            <div class="dialog">
                <span>Déplacer la tâche dans une autre liste</span>
                <div class="form-group">
                    <label for="select-list">Sélectionnez une liste :</label>
                    <br>
                    <select id="select-list" v-model="selectedTodo">
                        <option v-for="todo in todoLists" :value="todo">{{ todo.title }}</option>
                    </select>
                </div>
                <div class="form-group" style="text-align: center; display: flex; justify-content: center;">
                    <button @click="showDialogFlag2 = false" style="margin-right: 20px;">Annuler</button>
                    <button class="move-button" color="primary" @click="moveTodo">Déplacer</button>
                </div>
            </div>
        </div>
        <div class="dialog-overlay" v-if="showDialogFlag">
            <div class="dialog">
                <h3>{{ todoList.title }}</h3>
                <div class="dialog-button-row">
                    <router-link :to="'/lists/' + todoList._id + '/modify-task/' + taskId">
                        <button class="modify-todo" @click="">Modifier</button>
                    </router-link>
                </div>
                <div class="dialog-button-row">
                    <button @click="moveTask()">Déplacer la tâche</button>
                </div>
                <div class="dialog-button-row">
                    <button class="delete-todo" @click="deleteTask()">Supprimer</button>
                </div>
                <button class="close-dialog" @click="hideDialog()">Close</button>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getTodoList, getTodoLists, updateTodoList } from "../api";

interface task {
    _id?: string;
    title: string;
    description: string;
    isMake: boolean;
}

interface todo {
    _id?: string;
    title: string;
    description: string;
}

const todoLists = ref<any>({})
const todoList = ref<any>({});
const task = ref<task>({ title: "", description: "", isMake: false });
const router = useRouter();
const showDialogFlag = ref(false);
const showDialogFlag2 = ref(false);
const taskId = router.currentRoute.value.params.tid.toString();
const selectedTodo = ref<any>({});

onMounted(async () => {
    const response = await getTodoLists();
    todoLists.value = response.data;


    const todoId = router.currentRoute.value.params.id.toString();
    todoLists.value = todoLists.value.filter((todo: todo) => todoId != todo._id)

    await getTodoListInfo();
});

async function getTodoListInfo() {

    const response = await getTodoList(router.currentRoute.value.params.id.toString());
    const taskId = router.currentRoute.value.params.tid.toString();
    if (response.data) {

        todoList.value = response.data;

        todoList.value.tasks.forEach((element: task) => {
            if (element._id == taskId) {
                task.value.title = element.title;
                task.value.description = element.description;
                task.value.isMake = element.isMake;
            }
        });
    }
}


function showDialog() {
    showDialogFlag.value = true;
}

function moveTask() {
    showDialogFlag2.value = true;
}

function hideDialog() {
    showDialogFlag.value = false;
}

async function deleteTask() {
    const taskId = router.currentRoute.value.params.tid.toString();
    todoList.value.tasks = todoList.value.tasks.filter((element: task) => element._id != taskId);

    await updateTodoList(todoList.value._id, {
        tasks: [...todoList.value.tasks],
    });
    hideDialog();
    router.go(-1);
}

async function moveTodo() {
    await updateTodoList(selectedTodo.value._id, {
        tasks: [...selectedTodo.value.tasks, task.value],
    });

    await deleteTask();
}


</script>


<style scoped lang="scss">
.edit-button {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 16px;
    margin-right: 10px;
}

.modify-todo {
    color: black;
}

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
    z-index: 99;
}

.swaptodo-overlay {
    position: fixed;
    width: 90%;
    margin-left: 5%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;

    span {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        text-align: center;

        color: #000000;
    }

    select {
        border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
        border: #000000 solid 1px;
    }

    .move-button {
        color: white;
        padding: 5%;
        background: #613973;
        border-radius: 5px;
    }
}

.dialog {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
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

.content {
    margin-bottom: 13%;
}

.edit-button {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 16px;
    margin-right: 10px;
}

.add-task-header {
    display: flex;
    position: fixed;
    top: 0;
    margin-top: 16px;
    margin-left: 23px;
    align-items: center;
}

.back-icon {
    margin-left: 5px;
}

.back-button {
    width: 30px;
    height: 30px;


    /* Gray 6 */

    background: #F2F2F2;
    border-radius: 5px;
    border: none;
}

.backlink {
    margin-left: 230px;

    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;

    color: #646464;

}

.modify-task {
    margin-top: 64px;
    margin-left: 20px;

    h2 {
        font-weight: 700;
        font-size: 23px;
        line-height: 29px;

        /* Gray 1 */

        color: #333333;
    }
}

.modify-task-content {
    margin-top: 31px;
}

.task-title {

    margin-top: 16px;
    margin-bottom: 31px;

    /* /Gray / White */

    background: #FFFFFF;
    /* Stroke/Input */

    height: 38px;
    width: 334.4168395996094px;

}

.task-describe {

    height: 105px;
    width: 334px;
    margin-top: 19px;

    /* /Gray / White */

    background: #FFFFFF;
    /* Stroke/Input */

}

input,
textarea {
    padding-left: 10px;
}

.modify-task-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0px;
    gap: 10px;

    position: absolute;
    left: 5.33%;
    right: 5.6%;
    top: 89.51%;
    bottom: 4.2%;

    color: white;
    background: #613973;
    border-radius: 5px;
}
</style>