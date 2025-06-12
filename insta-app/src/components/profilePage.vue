<template>
    <div class="site wi">
        <div class="auto">
            <div class="flex auto">
                <img :src="userData.pfp ? userData.pfp : 'https://placehold.co/400'"
                    alt="Profile picture" class="profilePicture">
                <div class="auto">
                    <h2 class="x2l ">{{ userData.name + ' ' +
                        userData.lastName }}'s page
                    </h2>
                    <Button v-if="edit" class="p-button auto">EDIT PROFILE</Button>
                </div>
            </div>
            <div class="flex flexwrap">
                <imageCoponent v-for="image in images" :host="userData.host" :edit="edit" :image="image" />
            </div>
        </div>
    </div>
</template>

<script>
    import imageCoponent from '@/components/imageCoponent.vue';
    export default {
        name:"profilePage",
        props:{userData:{type:Object}, images:{type:Array},edit:{type:Boolean}},
        components:{imageCoponent},
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