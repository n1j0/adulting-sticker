<script setup lang="ts">
const {
    stickers,
} = defineProps<{
    stickers: { url: string, label: string }[]
}>()
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
            <tr v-for="sticker in stickers.sort((a, b) => a.label.localeCompare(b.label))" :key="sticker.label">
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