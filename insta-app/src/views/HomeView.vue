<template>
    <appLoader v-show="userLoading" />
    <div class="flex heig" v-show="!userLoading">
        <div class="flex heig">
            <div class="sidebar">
                <h2 class="text-lg font-semibold mb-4">Menu</h2>
                <PanelMenu :model="items" />
                <FileUpload ref="fileUploader" mode="basic" accept="image/*" customUpload @select="onSelect"
                    style="display: none;" />
            </div>
        </div>
        <div class="site wi">
            <div class="auto">
                <div class="flex">
                    <img v-if="userData" :src="userData.pfp ? userData.pfp : 'https://placehold.co/400'"
                        alt="Profile picture" class="profilePicture">
                    <div class="auto">
                        <h2 v-if="userData" class="x2l ">{{ userData.name + ' ' +
                            userData.lastName }}'s page
                        </h2>
                        <Button class="p-button auto">EDIT PROFILE</Button>
                    </div>
                </div>

            </div>
            <h3> </h3>
        </div>
    </div>

    <Dialog v-model:visible="showDialog" modal header="Add Image Details" :style="{ width: '60vw' }">
        <div class="flex dir-row">
            <img :src="selectedImage" alt="Uploaded" class="image-dialog" />
            <div>
                <label class="item">Tags:</label>
                <AutoComplete v-model="tags" :suggestions="tagSuggestions" multiple placeholder="Add tags"
                    @complete="filterTags" @select="onTagSelect" @keydown.enter.native.prevent="addCustomTag"
                    class="item" />
                <br />
                <div class="wi item">
                    <Button @click="onSave" label="Save" class="p-button" />
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script>
import appLoader from '@/components/appLoader.vue';
import PanelMenu from 'primevue/panelmenu';
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
export default {
    components: { PanelMenu, FileUpload, Dialog, InputText, AutoComplete, Button, appLoader },
    data() {
        return {
            showDialog: false,
            selectedImage: null,
            file: null,
            title: '',
            tags: [],
            tagQuery: '',
            tagSuggestions: [],
            allTagOptions: ['Nature', 'Portrait', 'Abstract', 'Urban', 'Travel', 'Macro'],
            items: [
                {
                    label: 'Upload Picture',
                    icon: 'pi pi-upload',
                    command: () => {
                        this.$refs.fileUploader.choose();
                    }
                }
            ]
        };
    },
    methods: {
        onSelect(e) {
            const file = e.files[0];
            this.file = file
            this.selectedImage = URL.createObjectURL(file);
            this.showDialog = true;
        },

        onTagSelect(val) {
            if (!this.allTagOptions.includes(val)) {
                this.allTagOptions.push(val)
            }
            this.tagQuery = ''
        },
        addCustomTag() {
            const val = this.tagQuery.trim()
            if (val && !this.tags.includes(val)) {
                this.tags = [...this.tags, val]
                if (!this.allTagOptions.includes(val)) {
                    this.allTagOptions.push(val)
                }
            }
            this.tagQuery = ''
        },
        filterTags(event) {
            this.tagQuery = event.query
            const query = event.query.toLowerCase();
            this.tagSuggestions = this.allTagOptions.filter(opt =>
                opt.toLowerCase().includes(query)
            );
        },
        onSave() {
            this.$store.dispatch("UPLOAD_IMAGE_WITH_TAGS", { file: this.file, tags: this.tags })
            this.title = ''
            this.tags = []
            this.tagQuery = ''
            this.showDialog = false;
        }
    },
    beforeCreate() {
        this.$store.dispatch("FETCH_CURRENT_USER");
    },
    computed: {
        userLoading() {
            return this.$store.getters.GET_CURRENT_USER_LOADING
        },
        userData() {
            return this.$store.getters.GET_CURRENT_USER_DATA
        }
    }
};
</script>

<style scoped>
.image-dialog {
    border-radius: 30px;
    max-width: 40vw;
    max-height: 70vh;
    margin: 30px;
}

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

.sidebar {
    padding: 20px;
    width: 25vw;
    min-width: 250px;
    border-right: 2px gray solid;
}

.item {
    margin: 10px auto;
}

.heig {
    height: 80vh;
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
</style>