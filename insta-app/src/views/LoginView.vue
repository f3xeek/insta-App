<template>
    <AppLoader v-show="loading"/>
    <div class="flex  bg-gray-100" v-show="!loading">
        <Card style="width: 300px">
            <template #title>Login</template>
            <template #content>
            <div class="p-fluid">
                <div class="field">
                    <label for="username">Email: </label>
                    <InputText id="username" v-model="email" />
                </div>

                <div class="field">
                    <label for="password">Password: </label>
                    <Password id="password" v-model="password" toggleMask />
                </div>

                <Button label="Login" @click="handleLogin" />
            </div>
            </template>
        </Card>
    </div>
</template>
  
<script>
import AppLoader from "@/components/appLoader.vue"
export default {
    data() {
        return {
            email: '',
            password: '',
            loading:false
        };
    },
    components:{
        AppLoader
    },
    methods: {
        handleLogin() {
            this.loading=true
            if (!this.email || !this.password) {
                alert('Please fill in both fields.');
                this.loading=false
            } else {
                this.$store.dispatch("LOGIN_USER", { email: this.email, password: this.password })
                .then(() => {

                    const data  = this.$store.getters.GET_CURRENT_USER_TOKEN;
                    if (data) this.$router.push("/");
                })
                .catch((e) => {
                    alert(e)
                })
                .finally(()=> this.loading=false)
            }
        },
    },
};
</script>

<style scoped>
    .flex{
        display: flex;
        align-items: center;
        justify-self: center;
        height: 80vh;
    }
    .field {
        margin-bottom: 1rem;
    }
</style>