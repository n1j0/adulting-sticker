<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getCurrentUser, useFirebaseStorage } from 'vuefire'
import router from '@/router'
import { useRoute } from 'vue-router'
import StickerUpload from '@/components/stickerUpload.vue'
import StickerList from '@/components/stickerList.vue'
import { listAll, ref as storageRef } from 'firebase/storage'

const storage = useFirebaseStorage()
const stickerRef = storageRef(storage, 'stickers')

const { query } = useRoute()

const stickers = ref<{ url: string, label: string }[]>([])
const loading = ref(false)

const labels = computed(() => stickers.value.map(sticker => sticker.label))

onMounted(async () => {
    const currentUser = await getCurrentUser()
    if (currentUser) {
        const to =
            query.redirect && typeof query.redirect === 'string'
                ? query.redirect
                : '/'

        await router.push(to)

        stickers.value = (await listAll(stickerRef)).items.map(item => ({
            url: `https://firebasestorage.googleapis.com/v0/b/adulting-stickers.appspot.com/o/${encodeURIComponent(item.fullPath)}?alt=media`,
            label: item.fullPath.split('/').pop()!.split('.').shift()!,
        }))
    }
})


</script>

<template>
    <h2 class="title is-2">
        Current Stickers
    </h2>
    <sticker-list :stickers="stickers" class="mb-6"/>
    <h2 class="title is-2">
        Add new Sticker
    </h2>
    <sticker-upload :labels="labels"/>
</template>

<style scoped>

</style>