<template>
  <v-app id="search">{{word}}</v-app>
</template>
<script>
export default {
  name: "search",
  data: function() {
    return { word: "" };
  },
  created: function() {
    console.log(this.$route.query);
    this.word = this.$route.query.word;
  },
  beforeRouteUpdate(to, from, next) {
    this.word = to.query.word;
    next();
  }
};
</script>