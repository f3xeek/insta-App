<template>
    <AppLoader v-show="true" />
</template>

<script>
import AppLoader from "@/components/appLoader.vue";
export default {
    components: {
        AppLoader
    },
    // computed: {
    //     promotionsList() {
    //         return this.$store.getters.GET_PROMOTIONS_LIST;
    //     },
    //     promotionsLoading() {
    //         return this.$store.getters.GET_PROMOTIONS_LOADING;
    //     }
    // },
    // mounted() {
    //     this.$store.dispatch("FETCH_PROMOTIONS");
    // },
}
</script>

<style scoped></style>