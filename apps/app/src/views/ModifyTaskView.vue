<template>
    <main>
        <div class="add-task-header">
            <button class="back-button" @click="$router.go(-1)">
                <Icon class="back-icon" icon="material-symbols:arrow-back-ios-rounded" />
            </button>
            <span class="backlink">Annuler</span>
        </div>
        <div class="modify-task">
            <h2 class="modify-task-title">Modifier une task</h2>

            <div class="modify-task-content">
                <h3>Titre</h3>
                <input v-model="task.title" placeholder="Describe your task" class="task-title my-input" />

                <h3>Description</h3>
                <textarea v-model="task.description" placeholder="Describe your task..." class="task-describe my-input"></textarea>

                <button @click="modifyTask" class="modify-task-button">Modifier la task</button>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getTodoList, updateTodoList } from "../api";

interface task {
    _id?: string;
    title: string;
    description: string;
}

const todoList = ref<any>({});
const task = ref<task>({ title: "", description: "" });
const router = useRouter();

onMounted(async () => {
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
            }
        });
    }
}

async function modifyTask() {
    const taskId = router.currentRoute.value.params.tid.toString();
    todoList.value.tasks.forEach((element: task) => {
        if (element._id == taskId) {
            element.title = task.value.title;
            element.description = task.value.description;
        }
    });

    await updateTodoList(todoList.value._id, {
        tasks: [...todoList.value.tasks],
    });
    router.go(-1);
}
</script>


<style scoped lang="scss">
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

    border: 1px solid #CED4DA;
    border-radius: 4px;
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

    border: 1px solid #CED4DA;
    border-radius: 4px;
}

input, textarea {
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