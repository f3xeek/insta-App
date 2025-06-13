<template>
    <div class="site wi">
        <div class="auto">
            <div class="flex auto">
                <img :src="userData.pfp ? getPFPurl() : 'https://placehold.co/400'"
                    alt="Profile picture" class="profilePicture">
                <div class="auto">
                    <h2 class="x2l ">{{ userData.name + ' ' +
                        userData.lastName }}'s page
                    </h2>
                    <RouterLink v-if="edit" to="/editProfile" class="p-button auto">EDIT PROFILE</RouterLink>
                </div>
            </div>
            <div class="flex flexwrap">
                <div v-for="image in images">
                    <imageCoponent :host="userData.host" :edit="edit" :image="image" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import imageCoponent from '@/components/imageCoponent.vue';
    import { RouterLink } from 'vue-router';
    export default {
        name:"profilePage",
        props:{userData:{type:Object}, images:{type:Array},edit:{type:Boolean}},
        components:{imageCoponent, RouterLink},
        methods:{
            getPFPurl(){
                return this.userData.host + "/api/getimage/"+this.userData.pfp
            }
        }
    }
</script>

<style scoped>

.profilePicture {
    max-width: 200px;
    max-height: 200px;
    border-radius: 100px;
}

.x2l {
    font-size: xx-large;
}

.flex {
    display: flex;
    gap: 30px;
}

.p-button {
    color: aliceblue;
}

.site {
    padding: 20px;
}

.wi {
    width: 100%;
}

.auto {
    margin: auto !important;
    width: fit-content;
}
.flexwrap{
    flex-wrap: wrap;
}
</style>