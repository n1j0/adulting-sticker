<script setup lang="ts">
import Navbar from '@/components/navbar.vue'
</script>

<template>
    <navbar/>
    <div class="container is-max-desktop mx-5">
        <router-view/>
    </div>
</template>

<style scoped>

</style>
