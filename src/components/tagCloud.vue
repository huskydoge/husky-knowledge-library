<script>
import "@/tagCloud3D.js"
export default {
  name: "tagCloud",
  props: {
    activeCloud: Boolean,
    tags:{
      type: Array,
      default: []
    },
  },
  data(){
    return{
      entries:[],
      settings: [],
      active: ''
    }
  },
  methods:{
    init(){
      this.entries = [];
      console.log("in cloud",this.tags)
      for (let tag in this.tags){
        this.entries.push({label: this.tags[tag], url: "/"}) // target: '_top'+"/husky-knowledge-library"
      }
      this.settings = {
        entries: this.entries,
        width: 640,
        height: 480,
        radius: '65%',
        radiusMin: 75,
        bgDraw: true,
        bgColor: '#f2f2f2',
        opacityOver: 1.00,
        opacityOut: 0.05,
        opacitySpeed: 6,
        fov: 800,
        speed: .5,
        fontFamily: 'Oswald, Arial, sans-serif',
        fontSize: '15',
        fontColor: 'blue',
        fontWeight: 'normal',//bold
        fontStyle: 'italic',//italic
        fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
        fontToUpperCase: false,
      };
    },
      showCloud(){
        let svg3DTagCloud = new SVG3DTagCloud( document.getElementById( 'tag-cloud'  ), this.settings );
      },
      change_zIndex(){
        if(this.active) {
          this.$refs["tag-cloud"].style.zIndex = 1;
        } else {
          this.$refs["tag-cloud"].style.zIndex = -1;
        }
      }
    },
  computed:{
  },
  mounted() {
    this.init();
    this.showCloud();
  },
  watch:{
    activeCloud(newValue){
      this.active = newValue;
      this.change_zIndex();
    }
  }
}
</script>

<template>

  <div id='tag-cloud' ref="tag-cloud"></div>

</template>

<style>

#tag-cloud {
  position: absolute;
  top: 8em;
  left: 0;
  z-index: 1;
  right: 0;
  bottom: 0;
  width: 100%;
  pointer-events: auto
}


</style>