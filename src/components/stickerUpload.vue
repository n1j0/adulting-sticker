<script setup lang="ts">
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { ref } from 'vue'

const storage = useFirebaseStorage()

const file = ref<null | File>(null)
const label = ref('')

const uploadPicture = async ($event: any) => {
    const fileRef = storageRef(storage, `stickers/${label.value}.png`)
    const { upload } = useStorageFile(fileRef)
    const data = file.value
    if (data) {
        try {
            await upload(data)
            window.location.reload()
        } catch (err: any) {
            console.error(err)
        }
    }
}

</script>

<template>
    <form class="box mb-6" @submit.prevent="uploadPicture">
        <div class="field">
            <label class="label">Sticker</label>
            <div class="control">
                <div class="file has-name is-boxed">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume"
                               @change="//@ts-ignore
                        file = $event.target.files[0]" accept="image/png" required>
                        <span class="file-cta"><span class="file-label">Choose a file…</span></span>
                        <span class="file-name has-text-centered">{{ file ? file.name : 'No file selected' }}</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label">Label</label>
            <div class="control">
                <input class="input" type="text" v-model="label" required/>
            </div>
        </div>
        <button class="button" type="submit">Upload</button>
    </form>
</template>

<style scoped>

</style>