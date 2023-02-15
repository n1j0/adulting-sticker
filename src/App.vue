<script setup lang="ts">
import Navbar from '@/components/navbar.vue'
</script>

<template>
    <navbar/>
    <div class="container is-max-desktop px-5">
        <router-view/>
    </div>
</template>

<style scoped>

</style>
