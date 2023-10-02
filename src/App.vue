<script>
import {reactive} from "vue";

import axios from "axios"; // 安装axios后引入
import markDownRender from "@/components/markDownRender.vue";
import tagCloud from "@/components/tagCloud.vue";
import titles from "./assets/title.json";
import tags from "./assets/tags.json";
export default {
  name: 'App',
  data() {
    return {
      input: '',
      results: [],
      inputTerms: '',
      terms: '',
      prefix: '',
      state: reactive({timer:0}),
      sortedResults: [],
      ul: null,
      searchItems:["404 Error", "Address Bar", "Ajax", "Apache", "Autoresponder", "BitTorrent", "Blog", "Bookmark", "Bot", "Broadband", "Captcha", "Certificate", "Client", "Cloud", "Cloud Computing", "CMS", "Cookie", "CSS", "Cyberspace", "Denial of Service", "DHCP", "Dial-up", "DNS Record", "Domain Name", "Download", "E-mail", "Facebook", "FiOS", "Firewall", "FTP", "Gateway", "Google", "Google Drive", "Gopher", "Hashtag", "Hit", "Home Page", "HTML", "HTTP", "HTTPS", "Hyperlink", "Hypertext", "ICANN", "Inbox", "Internet", "InterNIC", "IP", "IP Address", "IPv4", "IPv6", "IRC", "iSCSI", "ISDN", "ISP", "JavaScript", "jQuery", "Meta Search Engine", "Meta Tag", "Minisite", "Mirror", "Name Server", "Packet", "Page View", "Payload", "Phishing", "POP3", "Protocol", "Scraping", "Search Engine", "Social Networking", "Socket", "Spam", "Spider", "Spoofing", "SSH", "SSL", "Static Website", "Twitter", "XHTML"],
      resultsToShow: [],
      searchData: {},
      activeCloud: true,
      markdown: '',
      tags:[],
      allTagsList: [],
      showMarkdown: false,
    }
  },
  components: {
    tagCloud,
    markDownRender
  },
  methods: {
    evaluateResults() {
      if (this.results.length > 0 && this.inputTerms.length > 0 && this.terms.length !== 0) {
        this.sortedResults = this.results.sort(this.sortResults);
        this.appendResults();
      } else if (this.results.length === 0) {
        if (this.ul.className !== "term-list") {
          this.ul.className = "term-list";
        }
        console.log("NO RESULTS");
        this.ul.innerHTML = '<li>Whoah! <strong>'
            + this.inputTerms
            + '</strong> is not in the index. <br><small><a href="https://google.com/search?q='
            + encodeURIComponent(this.inputTerms) + '">Try Google?</a></small></li>';}
      else {
        this.clearResults();
      }
    },
    search(event) {
      // this.cloud_class = "cloudBack";
      this.inputTerms = this.input.toLowerCase();
      this.results = [];
      let termsArray = this.inputTerms.split(' ');
      let regex = new RegExp(termsArray.join("|"), "i");
      this.prefix = termsArray.length === 1 ? '' : termsArray.slice(0, -1).join(' ') + ' ';
      this.terms = termsArray;
      for (let i = 0; i < this.searchItems.length; i++) {
        const a = this.searchItems[i].toLowerCase();
        if (a.match(regex)) {
          this.results.push(this.searchItems[i]);
        }
      }

      this.evaluateResults();
    },
    sortResults(a, b) {
      let a_value = 0
      let b_value = 0
      for (let i = 0; i < this.terms.length; i++) {
        a_value += a.indexOf(this.terms[i]);
        b_value += b.indexOf(this.terms[i]);
      }
      if (a_value < b_value) return -1;
      else return 1;
    },
    clearResults() {
      console.log("CLEAR");
      this.ul.className = "term-list hidden";
      this.ul.innerHTML = '';
    },
    appendResults() {
      this.clearResults();
      for (let i = 0; i < this.sortedResults.length && i < 5; i++) {
        const li = document.createElement("li");
        let processedSting = this.sortedResults[i].toLowerCase();
        for (let j = 0; j < this.terms.length; j++) {
          processedSting = processedSting.replace(this.terms[j], '<strong class="bold">'
              + this.terms[j]
              + '</strong>');
        }
        li.innerHTML = processedSting;
        li.dataset.result = this.sortedResults[i];
        li.addEventListener('click', this.chooseItem); // Add click event listener
        this.ul.appendChild(li);
      }
      if (this.ul.className !== "term-list") {
        this.ul.className = "term-list";
      }
    },
    chooseItem(event) {
      let item = event.target.dataset.result;
      let path = this.searchData[item][0]['path'];
      this.tags = this.searchData[item][0]['tags'];
      axios.get('/src/assets/' + path + '?raw')
          .then((res) => {
            this.markdown = res.data; // res.data存储了请求的结果
            console.log(this.markdown)
            this.showMarkdown = true;
          })
          .catch((error) => {
            console.error(error);
          });

    },
    showSearch(){
      this.showMarkdown = false;
    },
    activateCloud(){
      if (this.input.length !== 0) {
        this.activeCloud = false;
      } else {
        this.activeCloud = true;
      }
    },
    // get title json file
    initData(){
      this.searchItems = [];
      this.allTagsList = [];
      this.searchData = titles;
      for(let item in titles){
        this.searchItems.push(item)
      }
      for(let tag in tags){
        this.allTagsList.push(tag)
      }
      console.log("in app: ",this.allTagsList)
    }
  },
  created() {
    this.initData();
  },
  mounted() {
    this.ul = this.$refs.searchResults;
  },
  watch:{
    input:"activateCloud"
  }
}

</script>

<template>
  <div v-show="!showMarkdown" style="text-align:center">
  <h1 class="title">Search</h1>
  <input placeholder="Search Meaningfully Instead of Wandering Aimlessly" autocomplete="off" type="text" id="searchBox" v-model="input"
         class="search-field" autoFocus @input="search"/>
  <ul id="searchResults" ref="searchResults" class="term-list hidden"></ul>
  <tag-cloud :tags="this.allTagsList" :active-cloud="this.activeCloud" ></tag-cloud>
  </div>
  <mark-down-render v-if="showMarkdown" @return="showSearch" :tags="this.tags" :markdown="this.markdown"></mark-down-render>
</template>

<style lang="sass">

// Variables
$padding: .5em
$gfont: "Arvo", "Helvetica Neue", Helvetica, arial, sans-serif
$fw-normal: 400
$fw-heavy: 700

input::-webkit-input-placeholder
  /* placeholder颜色 */
  color: #aab2bd
  /* placeholder字体大小 */
  font-size: .8em


.title
  width: 100%
  margin: 4em 0 1em
  text-align: center
  font-family: Helvetica, arial, sans-serif
  font-size: 170%
  font-weight: $fw-normal + 10
  color: #2a5ba3
  text-shadow: #fff .1em .1em 0, #ddd .2em .2em, #ddd .3em .3em .1em

.search-field
  display: block
  width: 30%
  margin: 1em auto 0
  padding: .5em $padding
  border: .1em solid #999
  font-size: 130%
  font-family: "Arvo", "Helvetica Neue", Helvetica, arial, sans-serif
  font-weight: $fw-normal
  color: #3e8ce0
  z-index: 2
  border-radius: .3em

.term-list
  list-style: none inside
  width: 30%
  margin: 0 auto 2em
  text-align: left
  color: #777
  background: #fff
  border: .1em solid #ddd
  font-family: $gfont
  font-weight: $fw-normal
  z-index: 2
  padding: .5em $padding .5em

  li
    padding: .5em .5em .5em 1em
    border-bottom: .1em solid #eee
  li:hover
    background: #f5f5f5
  strong
    color: #444
    font-weight: $fw-heavy


.hidden
  display: none
</style>

