<template>
    <main>
        <div class="add-todo-header">
            <button class="back-button" @click="$router.go(-1)">
                <Icon class="back-icon" icon="material-symbols:arrow-back-ios-rounded" />
            </button>
            <span class="backlink">Annuler</span>
        </div>
        <div class="modify-todo">
            <h2 class="modify-todo-title">Modifier une todo</h2>

            <div class="modify-todo-content">
                <h3>Titre</h3>
                <input v-model="todo.title" placeholder="Describe your todo" class="todo-title my-input" />

                <h3>Description</h3>
                <textarea v-model="todo.description" placeholder="Describe your todo..." class="todo-describe my-input"></textarea>

                <button @click="modifyTodo" class="modify-todo-button">Modifier la todo</button>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getTodoList, updateTodoList } from "../api";

interface todo {
    _id?: string;
    title: string;
    description: string;
}

const todoList = ref<any>({});
const todo = ref<todo>({ title: "", description: "" });
const router = useRouter();

onMounted(async () => {
    await getTodoListInfo();
});

async function getTodoListInfo() {
    const response = await getTodoList(router.currentRoute.value.params.id.toString());
    if (response.data) {
        todoList.value = response.data;
        todo.value.title = todoList.value.title;
        todo.value.description = todoList.value.description;
    }
}

async function modifyTodo() {
    await updateTodoList(todoList.value._id, {
        title: todo.value.title,
        description: todo.value.description
    });
    router.go(-1);
}
</script>


<style scoped lang="scss">
.add-todo-header {
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

.modify-todo {
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

.modify-todo-content {
    margin-top: 31px;
}

.todo-title {

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

.todo-describe {

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

.modify-todo-button {
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