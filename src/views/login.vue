<script setup lang="ts">
import { signInWithEmailAndPassword } from '@firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import router from '@/router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const { query } = useRoute()
const auth = useFirebaseAuth()

const email = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth!, email.value, password.value)
        if (user) {
            await router.push(query.redirect as string || '/')
        }
    } catch (err: any) {
        error.value = err.message
    }
}
</script>

<template>
    <form class="box" @submit.prevent="login">
        <div class="field">
            <label class="label">E-Mail</label>
            <div class="control">
                <input class="input" v-model="email" type="email" required/>
            </div>
        </div>
        <div class="field">
            <label class="label">Password</label>
            <div class="control">
                <input class="input" v-model="password" type="password" required/>
            </div>
        </div>

        <div v-if="error" class="notification is-danger">
            {{ error }}
        </div>
        <button class="button is-primary" type="submit">Login</button>
    </form>
</template>

<style scoped>

</style>