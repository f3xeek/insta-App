<template >
    <div v-if="tokenUser">
        <appLoader v-if="isTagLoading || loadingUser" />
    
        <div class="search-bar" v-show="!isTagLoading && !loadingUser">
        <div class="field">
            <label for="tag">Image Tag</label>
            <InputText
            id="tag"
            v-model="tag"
            placeholder="Enter tag to search..."
            />
        </div>
        <div class="field actions">
            <Button
            label="Search"
            icon="pi pi-search"
            @click="onSearch"
            />
        </div>
        </div>
    
        <div class="flexwrap" v-show="!isTagLoading&& !loadingUser">
        <imageCoponent
            v-for="img in tagImages"
            :key="img.id"
            :image="img"
            :host="userData.host"
            :edit="false"
        />
        </div>
    
        <div v-if="!isTagLoading && tagImages && tagImages.length === 0" class="no-results">
        No images found for “{{ tagSearched }}”.
        </div>
    </div>
    <h2 style="text-align: center;" v-else>
        Log in to access Tags page
    </h2>
  </template>
  
  <script>
  import {  mapGetters } from 'vuex'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'
  import appLoader from '@/components/appLoader.vue'
  import imageCoponent from '@/components/imageCoponent.vue'
  
  export default {
    name: 'ImageSearchView',
    components: {
      InputText,
      Button,
      appLoader,
      imageCoponent
    },
    data(){
        return{
            tag:'',
            tagSearched:''
        }
    },
    computed: {
      ...mapGetters({
        userData: 'GET_CURRENT_USER_DATA',
        loadingUser: 'GET_CURRENT_USER_LOADING',
        tokenUser: "GET_CURRENT_USER_TOKEN",
        tagImages: 'GET_TAG_IMAGES',
        isTagLoading: 'GET_TAG_LOADING',
      })
    },
    methods: {
      async onSearch() {
        this.tagSearched =new String(this.tag)
        const trimmed = this.tag.trim()
        if (trimmed) this.$store.dispatch("SET_TAG", trimmed)
        await this.$store.dispatch("FETCH_TAG_IMAGES")
      }
    },
    beforeMount() {
        this.$store.dispatch("FETCH_TAG_IMAGES")
    }
  }
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem 0;
  }
  
  .search-bar .field {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
  }
  
  .no-results {
    text-align: center;
    margin-top: 2rem;
    font-style: italic;
    color: #666;
  }
  .flexwrap{
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }
  </style>
  