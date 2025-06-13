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
        <div class="w100">
            <img :src="userData.pfp ? getPFPurl : 'https://placehold.co/400'" alt="Profile picture" class="profilePicture">
            <div class="flex auto">
                <PanelMenu :model="items" class="margins"/>
            </div>
            <FileUpload ref="fileUploader" mode="basic" accept="image/*" customUpload @select="onSelect"
            style="display: none;" />
        </div>
    </div>
</template>

<script>
    import appLoader from '@/components/appLoader.vue'
    import { FileUpload,PanelMenu,Dialog } from 'primevue'
    export default {
        components:{appLoader,FileUpload, PanelMenu,Dialog},
        data(){
            const user = this.$store.getters.GET_CURRENT_USER_DATA
            return{
                name: user?.name || '',
                lastname: user?.lastName || '',
                showDialog:true,
                items: [
                {
                    label: 'Upload Picture',
                    icon: 'pi pi-upload',
                    command: () => {
                        this.$refs.fileUploader.choose();
                    }
                }
            ]
            }
        },
        computed:{
            userToken(){
                return this.$store.getters.GET_CURRENT_USER_TOKEN
            },
            userData(){
                return this.$store.getters.GET_CURRENT_USER_DATA
            },
            loading(){
                return this.$store.getters.GET_CURRENT_USER_LOADING
            },
            getPFPurl(){
                return this.userData.host + "/api/getimage/"+this.userData.pfp+"?"+Date.now()
            },
        },
        methods:{
            showPopup(){
                this.showDialog=true
            },
            test(){
                this.$store.dispatch("PATCH_USER_DATA", {name:this.name,lastname:this.lastname})
            },
            async onSelect(e) {
                const file = e.files[0];
                const data = await this.$store.dispatch("CHANGE_PFP",file)
        },
        }
    }
</script>

<style scoped>

    .field {
        margin: 0.5rem auto;
        width: fit-content;
    }
    .profilePicture {
        max-width: 200px;
        max-height: 200px;
        border-radius: 100px;
        margin: auto;
        display: block;
    }

    .p-button{
        color: aliceblue;
        margin:1rem;
    }
    .w100{
        width: 100%;
    }
    .auto{
        margin:30px auto 0;
        width: fit-content;
    }
    .flex{
        display: flex;
    }
    .p-button:disabled{
        background: green;
        color: gray;
    }
    .margins{
        margin: 15px;
    }
</style>