<template>
    <Menubar>
        <template #start>
            <div class="flex gap">
                <RouterLink to="/" class="p-button-text">
                    Home
                </RouterLink>
                <RouterLink to="/tags" class="p-button-text">
                    Tags
                </RouterLink>
                <RouterLink to="/notfound" class="p-button-text">
                    NotFound
                </RouterLink>
            </div>
        </template>

        <template #end v-if="!userData">
            <div class="flex gap">
                <RouterLink to="/login" class="p-button-text">
                    Login
                </RouterLink>
                <RouterLink to="/register" class="p-button-text">
                    Register
                </RouterLink>
            </div>
        </template>
        <template #end v-else>
            <div class="flex gap">
                <p>Hello {{ userData.name }}!</p>
                <button class="p-button-text" @click="logoutUser">Logout</button>
            </div>

        </template>
    </Menubar>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
    name: 'Header',
    components: {RouterLink},
    computed:{
        userData(){
            return this.$store.getters.GET_CURRENT_USER_DATA
        },
    },
    methods:{
        logoutUser(){
            this.$store.dispatch("LOGOUT_USER")
        }
    },
}
</script>
<style scoped>
a ,button{
    text-decoration: none;
    color: white;
    padding: 15px 10px;
}

.flex {
    display: flex;
}

.gap {
    gap: 30px;
}
</style>