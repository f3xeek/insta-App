<template>
    <appLoader v-show="loading" />
    <div class="flex" v-show="!loading">
        <Card style="width: 300px">
            <template #title>Register</template>
            <template #content>
            <div class="p-fluid">
                <div class="field">
                    <label for="name">Name: </label>
                    <InputText id="name" v-model="name" />
                </div>
                <div class="field">
                    <label for="lastname">Lastname: </label>
                    <InputText id="lastname" v-model="lastName" />
                </div>
                <div class="field">
                    <label for="username">Email: </label>
                    <InputText id="username" v-model="email" />
                </div>
                <div class="field">
                    <label for="password">Password: </label>
                    <Password id="password" v-model="password" toggleMask />
                </div>
                <div class="field">
                    <label for="repeatPassword">Repeat password: </label>
                    <Password id="repeatPassword" v-model="repeatPassword" :feedback="false" toggleMask />
                </div>

                <Button label="Register" @click="handleRegister" :disabled="disabled" />
            </div>
            </template>
        </Card>

    </div>
</template>
  
<script>
import { registerUser,confirmUser } from '@/api';
import appLoader from '@/components/appLoader.vue';
export default {
    data() {
        return {
            email: '',
            name: '',
            lastName: '',
            password: '',
            repeatPassword:'',
            loading:false
        };
    },
    components:{
        appLoader
    },
    methods:{
        handleRegister() {
            const emailRegex = /^[\w.-]+@[\w-]+\.[\w.-]{2,4}$/;
            if(!this.email || !this.name || !this.lastName || !this.password){
                alert("Musisz uzpełnić wszystkie pola")
            }else{
                if (this.password.length < 3) {
                    alert("Hasło musi mieć przynajmniej 3 znaki")
                }else if (!emailRegex.test(this.email)) {
                    alert("Niepoprawny adres e-mail");
                } else if (this.password != this.repeatPassword) {
                    alert("Podane hasła musza być takie same")
                }else {
                    this.loading = true;
                    registerUser({ email: this.email, password: this.password,name:this.name, lastName:this.lastName })
                        .then(async (data) => {
                            if (data.status === "error") {
                                alert(data.message)
                            } else if (data.status === "success") {
                                const result = await confirmUser(data.data.link)
                                if (result.status=="success"){
                                    this.$router.push("/login");
                                }else alert(result.message)
                            }
                        })
                        .catch((err) => {
                            alert(err)
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            }
        }
    },
    computed: {
        disabled() {
            return this.email.length < 3;
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