<template>
    <div class="flexnav">
        <div>
            <RouterLink to="/" exact>Home</RouterLink>
            <RouterLink to="/search" exact>Search</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/nnn">Not found</RouterLink>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.GET_CURRENT_USER;
        },
        userLoading() {
            return this.$store.getters.GET_CURRENT_USER_LOADING;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch("LOGOUT_USER")
        }
    }
}
</script>
<style scoped>
div.flexnav {
    align-items: center;
    background: #333;
    margin-bottom: 10px;
    padding: 10px;
}
.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
a, .alice {
    color: aliceblue;
    padding: 10px;
}

a:hover {
    background: #111;
}

.flexnav {
    display: flex;
    justify-content: space-between;
}
</style>
