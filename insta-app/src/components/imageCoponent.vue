<template>
    <div class="itemDiv">
        <img :src="getURLforImage(image.id)" alt="Image" class="imageItem"  @click="openImagePopup(image)">
    </div>
    <ImagePopup
            v-model="showImagePopup"
            :image = "image"
            :edit = "edit"
        />
</template>
<script>
    import ImagePopup from '@/components/imagePopup.vue';
    export default {
        data(){
            return {showImagePopup:false}
        },
        name:"imageComponent",
        props: {
            image:{type:Object},
            host:{type:String},
            edit:{type:Boolean}
        },
        components:{ImagePopup},
        methods:{
            getURLforImage(id){
                return this.host+"/api/getimage/"+id+"?"+ Date.now()
            },
            openImagePopup() {
                this.showImagePopup = true;
            },
        }        

    }
</script>
<style scoped>
.flex {
    display: flex;
    gap: 30px;
}
.itemDiv{
    margin: 20px;
    max-width: 25vw;
    padding: 20px;
    border: 3px white solid;
    border-radius: 30px;
}

.imageItem{
    border-radius: 20px;
    max-width: 100%;
}
</style>