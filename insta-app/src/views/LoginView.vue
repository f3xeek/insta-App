<template>
    <div class="background">
        <AppLoader v-show="loading" />
        <div v-show="!loading" class="flex">
            <form @submit="onSubmit">
                <input v-model="email" placeholder="email" />
                <input type="password" v-model="password" placeholder="pass" />
                <button type="submit" :disabled="disabled">Send</button>
            </form>
        </div>
    </div>
</template>

<script>

import AppLoader from "@/components/appLoader.vue"
export default {
    data() {
        return {
            logged: false,
            email: '',
            password: '',
        };
    },
    components: {
        AppLoader
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            //TERAZ TRZEBA TUTUAJ ROBIC DALEJ 

            /* po przejściu walidacji (zachowany format emaila - regex)
            uruchamiamy funkcję ze store User
            jeśli otrzymamy z serwera email zalogowanego usera
            to znaczy, że można wykonywać działania na kliencie
            np przekierować się na inny adres
            logika pozostałych komunikatów musi być oparta o serwer
            */
            this.$store.dispatch("LOGIN_USER", { email: this.email, password: this.password })
                .then(() => {

                    const { email } = this.$store.getters.GET_CURRENT_USER;

                    if (email) this.logged = true;
                    else this.logged = false;

                    this.$router.push("/");
                })
                .catch(() => {
                    this.error = "niepoprawne dane logowania";
                    this.logged = false;
                })
        }

    },
    computed: {
        disabled() {
            return this.email.length < 3;
        },
        loading() {
            return this.$store.getters.GET_CURRENT_USER_LOADING;
        }
    },
}
</script>

<style scoped>
h2 {
    margin: 20px auto;
}

.background {
    background: linear-gradient(#e66465, #9198e5);
    width: 100vw;
    height: 90vh;
    display: flex;

}

input {
    margin: 20px 20px;
    padding: 4px;
    border-radius: 5px;
}

.flex {
    margin: auto;
    display: flex;
}

form {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
    background: white;
}
</style>