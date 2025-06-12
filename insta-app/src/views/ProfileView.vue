<template>
    <profilePage v-if="userData && userImages" :userData="userData" :images="userImages" :edit="false"/>
</template>
<script>
    import profilePage from '@/components/profilePage.vue'
    export default {
        components:{profilePage},
        data(){
            return{
                email:this.$route.params.username
            }
        },
        beforeMount(){
            this.$store.dispatch("FETCH_PROFILE",this.email)
            const userData = this.$store.getters.GET_CURRENT_USER_DATA
            if(userData && this.email == userData.email) this.$router.push("/")
        },
        computed:{
            userData(){
                return this.$store.getters.GET_PROFILE_DATA
            },
            userImages(){
                return this.$store.getters.GET_PROFILE_IMAGES
            }
        }
    }
</script>