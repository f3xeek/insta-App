<template>
    <div>
        <headerNav />
        <RouterView />
    </div>
</template>

<script>
import headerNav from "@/components/header.vue"
export default {
    components: { headerNav },
};
</script>