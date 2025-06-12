<template>
    <Dialog
        v-model:visible="visible"
        header="Image Preview"
        @hide="closePopup"
        class="custom-dialog"
        >
        <div class="dialog-content">
            <img
            :src="getImageUrl()"
            alt="Preview"
            class="main-image"
            />
            <div v-if="edit">
                    <div class="filters">
                    <div
                        v-for="filter in filters"
                        :key="filter"
                        class="filter-item"
                        :class="selectedFilters.includes(filter)?'selected':''"
                        @click="applyFilter(filter)"
                    >
                        <h3 style="text-align: center;">{{ filter }}</h3>
                    </div>
                    </div>
                
                <div class="wi item">
                    <Button @click="onClick" label="Save" class="p-button" />
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script>
import  Dialog  from 'primevue/dialog';

import {postFilters} from "@/api/index"
export default {
    name: 'ImagePopup',
    components:{Dialog},
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        image:{type:Object},
        edit:{type:Boolean},
    },
    data() {
    return {
        visible: this.modelValue,
        filters: ['None','Grayscale','Tint','Negate','Flop',],
        selectedFilters:['None']
    
    };
    },
    watch: {
        modelValue(val) {
            this.visible = val;
        },
        visible(val) {
            this.$emit('update:modelValue', val);
        }
    },
    updated
    () {
        if (this.image && this.image.filters.length>0) this.selectedFilters = this.image.filters
    },
    methods: {
        applyFilter(filter) {
            if(filter == "None") {
                this.selectedFilters.length = 0
                this.selectedFilters.push("None")
                }
            else{
                if(this.selectedFilters[0]=="None") this.selectedFilters.length=0
                if(!this.selectedFilters.includes(filter))this.selectedFilters.push(filter)
                else this.selectedFilters.splice(this.selectedFilters.indexOf(filter),1)
                if(this.selectedFilters.length==0) this.selectedFilters.push("None")
            }

        },
        closePopup() {
            this.visible = false;
        },
        getImageUrl(){
            if (this.image) return "http://localhost:3000/api/getimage/"+this.image.id+"/filter/"+this.selectedFilters.join(",")
        },
        onClick(){
            this.visible = false;
            postFilters(this.image.id,this.selectedFilters,this.$store.getters.GET_CURRENT_USER_TOKEN)
            this.$store.dispatch("FETCH_CURRENT_USER", true);
        },
    }
};
</script>

<style scoped>
    .dialog-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .main-image {
        max-width: 80%;
        max-height: 60vh;
        border-radius: 0.5rem;
    }

    .filters {
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
    }

    .filter-item {
        flex-shrink: 0;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        cursor: pointer;
    }

    .filter-thumb {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        border-radius: 0.25rem;
    }
    .selected{
        border-color: aqua;
        color:  aqua;
    }
    .wi {
        width: fit-content;
        margin: 20px auto;
    }

</style>
