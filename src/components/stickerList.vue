<script setup lang="ts">
import { ref as storageRef, listAll } from 'firebase/storage'
import { useFirebaseStorage } from 'vuefire'
import { onMounted, ref } from 'vue'

const storage = useFirebaseStorage()
const stickerRef = storageRef(storage, 'stickers')

const stickers = ref<{url: string, label: string}[]>([])

onMounted(async () => {
    stickers.value = (await listAll(stickerRef)).items.map(item => ({
        url: `https://firebasestorage.googleapis.com/v0/b/adulting-stickers.appspot.com/o/${encodeURIComponent(item.fullPath)}?alt=media`,
        label: item.fullPath.split('/').pop()!.split('.').shift()!,
    }))
})
</script>

<template>
<div>
    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>Image</th>
                <th>Label</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="sticker in stickers" :key="sticker.label">
                <td>
                    <img :src="sticker.url" :alt="`sticker ${sticker.label}`">
                </td>
                <td>
                    {{ sticker.label }}
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<style scoped>
img {
    max-width: 15%;
}
</style>