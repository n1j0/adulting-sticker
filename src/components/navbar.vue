<script setup lang="ts">
import { signOut } from '@firebase/auth'
import router from '@/router'
import { useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()
const auth = useFirebaseAuth()
const logout = async () => {
    await signOut(auth!)
    await router.push('/login')
}
</script>

<template>
    <nav class="navbar mb-6" role="navigation" aria-label="main navigation">
        <div class="container is-max-desktop">
            <div class="navbar-brand">
                <h1 class="navbar-item is-size-4">
                    Adulting Stickers
                </h1>
            </div>

            <div v-if="currentRoute.fullPath !== '/login'" class="navbar-menu is-active">
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-warning" @click="logout">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>