<template>
    <Menubar>
        <template #start>
            <div class="flex gap">
                <RouterLink to="/" class="p-button-text">
                    Home
                </RouterLink>
                <RouterLink to="/about" class="p-button-text">
                    About
                </RouterLink>
                <RouterLink to="/notfound" class="p-button-text">
                    NotFound
                </RouterLink>
            </div>
        </template>

        <template #end>
            <div class="flex gap">
                <RouterLink to="/login" class="p-button-text">
                    Login
                </RouterLink>
                <RouterLink to="/register" class="p-button-text">
                    Register
                </RouterLink>
            </div>
        </template>
    </Menubar>
</template>

<script setup>
    import { RouterLink } from 'vue-router'

</script>
<style scoped>
    a{
        text-decoration: none;
        color: white;
        padding: 15px 10px;
    }
    .flex{
        display: flex;
    }
    .gap{
        gap: 30px;
    }

</style>