<script setup lang="ts">
import { onMounted } from 'vue'
import { getCurrentUser } from 'vuefire'
import router from '@/router'
import { useRoute } from 'vue-router'
import StickerUpload from '@/components/stickerUpload.vue'
import StickerList from '@/components/stickerList.vue'


const { query } = useRoute()

onMounted(async () => {
    const currentUser = await getCurrentUser()
    if (currentUser) {
        const to =
            query.redirect && typeof query.redirect === 'string'
                ? query.redirect
                : '/'

        await router.push(to)
    }
})


</script>

<template>
    <h2 class="title is-2">
        Current Stickers
    </h2>
    <sticker-list class="mb-6"/>
    <h2 class="title is-2">
        Add new Sticker
    </h2>
    <sticker-upload/>
</template>

<style scoped>

</style>