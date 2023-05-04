<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
    <router-view :key="$route.fullPath"></router-view>
</template>

<style>
div {
  font-family: 'Mulish', sans-serif;
  font-style: normal;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
