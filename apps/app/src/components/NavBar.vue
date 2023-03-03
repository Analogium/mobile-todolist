<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="navbar">
    <div class="left-icon" @click="">
      <Icon icon="material-symbols:filter-list-rounded" />
    </div>
    <div class="add-button">
      <button>
        <Icon icon="material-symbols:add" />
      </button>
    </div>
    <div class="right-icon" @click="">
      <Icon icon="uil:user" />
    </div>
  </div>
</template>

<style scoped lang="scss">
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
</style>
