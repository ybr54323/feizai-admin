<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import HeaderCmp from "@/components/header.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app">
    <header-cmp></header-cmp>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app {
  padding: 40px 0 40px 0;
}
</style>
