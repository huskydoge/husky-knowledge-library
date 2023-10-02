<script>
import {VMarkdownView} from "vue3-markdown";
import {ref} from "vue";
import tagHeader from "@/components/tagHeader.vue";
import 'vue3-markdown/dist/style.css'
const m = ref('light');
export default {
  name: "markDownRender",
  data(){
    return{
      mode: m,
      processedMd: '',
      title: '',
    }
  },
  props: {
    markdown: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: []
    }
  },
  components: {
    VMarkdownView,
    tagHeader
  },
  methods:{
    returnSearch(){
      this.$emit('return',true)
    },
    extractContent(input) {
      // Extract tags
      // let tagMatches = input.match(/tags: \[(.*?)\]/);
      // if (tagMatches) {
      //   this.tags = tagMatches[1].split(',').map(tag => tag.trim());
      // }

      // Extract title
      // let titleMatches = input.match(/title: "(.*?)"/);
      // if (titleMatches) {
      //   this.title = titleMatches[1];
      // }

      // Remove first part from original string
      this.processedMd = input.replace(/---[\s\S]*?---/, '');
      console.log(this.processedMd)
    }
  },
  created() {
    this.extractContent(this.markdown)
    console.log(this.tags)
  }
}
</script>

<template>
  <div class="background">
  <div class="swiper-container">
    <div class="wrapper">
      <div class="returnBtn">
        <button @click="returnSearch" class="swiper-button">Return to Search</button>
      </div>

      <div class="slider-item swiper-slide">
        <div class="slider-image-wrapper">
          <img class="slider-image" src="/src/assets/noteImg/background.png" alt="SliderImg">
        </div>
        <tag-header :tags="tags"></tag-header>
        <div class="slider-item-content">
          <VMarkdownView :mode="this.mode"
                         :content="this.processedMd" />
        </div>
      </div>
    </div>

  </div>
  <div class="socials">
    <a class="social-link" href="https://github.com/huskydoge" target="_top">
      <svg style="font-size: 3em" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
    </a>
  </div>
  </div>
</template>

<style lang="scss" scoped>
//@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');

* {
  box-sizing: border-box;
}

.background {
  margin: 0;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient( 45deg,  rgba(255,166,0,1) 14.7%, rgba(255,99,97,1) 73% );
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3.2em;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.swiper-container {
  background: linear-gradient(270deg, rgba(247,249,255,1) 0%, rgba(242,246,255,1) 100%);
  box-shadow: rgba(149, 157, 165, 0.2) 0 .8em 2.4em;
  width: 100%;
  position: relative;
  max-width: 80em;
  height: 100%;
  max-height: 80em;
  border-radius: 1em;
}

.slider-image-wrapper {
  height: 15em;
  width: 100%;
  overflow: hidden;
}


.slider-item {
  width: 100%;
  height: 100%;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background: linear-gradient(270deg, #FFFFFF 0%, #FFFFFF 100%);

  &-content {
    height: 100%;
    width: 100%;
    text-align: left;
    padding:3.2em;
    justify-content: center;
    overflow: scroll;

  }
}


.slider-image {
  border: 1em;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: .2s;
}

.returnBtn {
  position: absolute;
  display: flex;
  top: 100%;
  justify-content: flex-end;
  width: 100%;
  padding-top: .5em;
}


.swiper-button{
  background-color: #FFFFFF;
  border: none;
  border-radius: .6em;
  cursor: pointer;
  outline: none;
  color: red;
  padding: .6em .6em;
  position: relative;
  margin-left: 4px;
}

.swiper-button:hover{
  background-color: #f2f2f2;
  color: red;
}

.socials {
  position: fixed;
  top: 12px;
  right: 16px;
  display: flex;
  align-items: center;

  .social-link {
    display: inline-block;
    margin-left: 8px;
    color: #fff;
  }
}


</style>
