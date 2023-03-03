<script setup lang="ts">
import { Icon } from '@iconify/vue'
import NavBar from '../components/NavBar.vue'
import TodoList from '../components/TodoList.vue';
</script>

<template>
  <main>
    <div class="dashboard-header">
      <p>Dashboard</p>
      <div class="icon-container">
        <Icon icon="uil:user" />
      </div>
    </div>

    <div class="title-header">
      <h1>
        Bonjour, Admin ! 👋
      </h1>
    </div>



    <TodoList class="todolist"/>




    <NavBar />

  </main>
</template>

<style scoped lang="scss">
h1 {

  width: 322px;
  height: 76px;
  left: 23px;
  top: 89px;

  font-weight: 800;
  font-size: 30px;
  line-height: 38px;


  color: #2C272E;

}


p {
  width: 229px;
  height: 25px;
  left: 23px;
  top: 16px;

  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height */


  color: #2C272E;

}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 23px;
  padding-right: 23px;
  padding-top: 16px;
  padding-bottom: 16px;
}

.dashboard-header .icon-container {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D9D9D9;
}

.title-header {
  margin-top: 48px;
  padding-left: 23px;
}

.todolist {
  margin-bottom: 100px;
}

</style>
