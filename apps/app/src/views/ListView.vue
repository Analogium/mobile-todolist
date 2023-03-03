<template>
    <main>
        <div class="todolist-title">
            <router-link to="/">
                <button class="back-button">
                    <Icon class="back-icon" icon="material-symbols:arrow-back-ios-rounded" />
                </button>
            </router-link>
            <h1>{{ todoList.title }}</h1>
        </div>
        <div class="task-uncompleted">
            <h2>Tasks - {{ getUncompletedTask().length }}</h2>
            <div v-if="getUncompletedTask().length">
                <div v-for="(task, index) in getUncompletedTask()" :key="task._id" class="task-container">
                    <input type="checkbox" :id="'checkbox-' + task._id" :checked="task.isMake" @change="updateTask(task)" />
                    <label :for="'checkbox-' + task._id" class="task">{{ task.title }}</label>
                </div>
            </div>
        </div>
        <div class="task-completed">
            <h2>Tasks Completed - {{ getCompletedTask().length }}</h2>
            <div v-if="getCompletedTask().length">
                <div v-for="(task, index) in getCompletedTask()" :key="task._id" class="task-container">
                    <input type="checkbox" :id="'checkbox-' + task._id" :checked="task.isMake" @change="updateTask(task)" />
                    <label :for="'checkbox-' + task._id" class="task">{{ task.title }}</label>
                </div>
            </div>
        </div>
        <div class="bottom-button">
            <router-link :to="'/lists/' + todoList._id + '/add-task'">
                <button>
                    <Icon icon="material-symbols:add" />
                </button>
            </router-link>
        </div>
    </main>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getTodoList, updateTodoList } from "../api";

const todoList = ref<any>({});

onMounted(async () => {
    await getTodoListInfo();
});

async function getTodoListInfo() {
    const router = useRouter();
    const response = await getTodoList(router.currentRoute.value.params.id.toString());
    todoList.value = response.data;
}

function getUncompletedTask() {
    return todoList.value.tasks?.filter((task) => !task.isMake) || [];
}

function getCompletedTask() {
    return todoList.value.tasks?.filter((task) => task.isMake) || [];
}

async function updateTask(task: any) {
    const response = await updateTodoList(todoList.value._id, {
        tasks: todoList.value.tasks.map((t: any) => (t._id === task._id ? { ...t, isMake: !t.isMake } : t)),
    });
    todoList.value = response.data;
}
</script>


<style scoped lang="scss">
.task-container {
    display: flex;
    text-align: center;
    align-items: center;

    /* Gray 6 */
    width: 330px;
    height: 55px;
    background: #F2F2F2;
    border-radius: 10px;
    margin-top: 13px;

    input {

        width: 25px;
        height: 25px;
        margin-left: 13px;
        margin-right: 20px;
        /* Gray 6 */

        background: #F2F2F2;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
}

.todolist-title {
    display: flex;
    position: fixed;
    top: 0;
    margin-top: 16px;
    margin-left: 23px;
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

.task-uncompleted {
    margin-top: 75px;
    margin-left: 23px;

    h2 {
        font-weight: 800;
        font-size: 16px;
        line-height: 20px;
    }
}

.task-completed {
    margin-top: 35px;
    margin-left: 23px;

    h2 {
        font-weight: 800;
        font-size: 16px;
        line-height: 20px;
    }
}

h1 {
    width: 109px;
    height: 29px;
    padding-left: 13px;

    font-weight: 800;
    font-size: 23px;
    line-height: 29px;
    /* identical to box height */


    color: #38343A;
}

.bottom-button {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 57px;
    height: 57px;
    margin-bottom: 21px;

    border-radius: 50%;
    background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.bottom-button button {
    display: flex;
    border: none;
    background-color: transparent;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
}
</style>