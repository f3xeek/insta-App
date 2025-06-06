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
    beforeCreate() {
        this.$store.dispatch("FETCH_CURRENT_USER");
    }

};
</script>