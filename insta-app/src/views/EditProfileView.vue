<template>
    <appLoader v-show="loading" />
    <div v-if="userToken" v-show="!loading">
        <h2 style="text-align: center;">Edit your profile</h2>
        <div class="field">
            <label for="name">Name: </label>
            <InputText id="name" v-model="name" />
        </div>
        <div class="field">
            <label for="lastname">Lastname: </label>
            <InputText id="lastname" v-model="lastname"  />
        </div>
        <div style="text-align: center;">
            <button @click="test" class="p-button field">Save</button>
        </div>
</div>
</template>

<script>
    import appLoader from '@/components/appLoader.vue'
    export default {
        components:{appLoader},
        data(){
            const user = this.$store.getters.GET_CURRENT_USER_DATA
            return{
                name: user?.name || '',
                lastname: user?.lastName || '',
            }
        },
        computed:{
            userToken(){
                return this.$store.getters.GET_CURRENT_USER_TOKEN
            },
            loading(){
                return this.$store.getters.GET_CURRENT_USER_LOADING
            }
        },
        methods:{
            test(){
                this.$store.dispatch("PATCH_USER_DATA", {name:this.name,lastname:this.lastname})
            }
        }
    }
</script>

<style scoped>
    .field {
        margin: 0.5rem auto;
        width: fit-content;
    }
    .p-button{
        color: aliceblue;
    }
</style>