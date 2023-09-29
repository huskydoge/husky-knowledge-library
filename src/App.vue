<script setup>

</script>

<template>
<div class="searchPage">
  <h1 class="title">AutoComplete Me</h1>
  <input type="text" id="searchBox"
         class="search-field" autoFocus />
  <ul id="searchResults" class="term-list hidden"></ul>
</div>
</template>

<style lang="sass" module>
  @import compass

  @import compass

  // Variables
  $padding: 10px
  $gfont: "Arvo", "Helvetica Neue", Helvetica, arial, sans-serif
  $fw-normal: 400
  $fw-heavy: 700

  %radius
    +border-radius(3px)

  body
    text-align: center
    background: #f2f2f2

  .title
    width: 100%
    margin: 3em 0 1em
    text-align: center
    font-family: $gfont
    font-size: 170%
    font-weight: $fw-normal
    color: #2a5ba3
    +text-shadow(#fff 1px 1px 0px, #ddd 2px 2px, #ddd 3px 3px 1px)

  .search-field
    display: block
    width: 30%
    margin: 1em auto 0
    padding: .5em $padding
    border: 1px solid #999
    font-size: 130%
    font-family: $gfont
    font-weight: $fw-normal
    color: #3e8ce0
    @extend %radius

  .term-list
    list-style: none inside
    width: 30%
    margin: 0 auto 2em
    padding: #{$padding / 2} $padding 0
    text-align: left
    color: #777
    background: #fff
    border: 1px solid #ddd
    font-family: $gfont
    font-weight: $fw-normal
    @extend %radius
    li
      padding: .5em 0
      border-bottom: 1px solid #eee
    strong
      color: #444
      font-weight: $fw-heavy

  .hidden
    display: none
</style>



<!--header {-->
<!--line-height: 1.5;-->
<!--}-->

<!--.logo {-->
<!--display: block;-->
<!--margin: 0 auto 2rem;-->
<!--}-->

<!--@media (min-width: 1024px) {-->
<!--header {-->
<!--display: flex;-->
<!--place-items: center;-->
<!--padding-right: calc(var(&#45;&#45;section-gap) / 2);-->
<!--}-->

<!--.logo {-->
<!--margin: 0 2rem 0 0;-->
<!--}-->

<!--header .wrapper {-->
<!--display: flex;-->
<!--place-items: flex-start;-->
<!--flex-wrap: wrap;-->
<!--}-->
<!--}-->