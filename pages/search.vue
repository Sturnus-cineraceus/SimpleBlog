<template>
  <v-app id="search">
    <p>検索結果 : {{count}}</p>
    <BlogList v-bind:blogs.sync="blogs" />
    <div v-intersect="onIntersect"></div>
  </v-app>
</template>
<script>
import BlogList from "../components/BlogList";

import appconf from "../app.config";
const conf = appconf.default;

export default {
  name: "search",
  components: { BlogList },
  data: function() {
    return { word: "", blogs: [], count: 0, isLoading: false };
  },
  methods: {
    onIntersect: async function() {
      if (this.isLoading) {
        return;
      }

      if (this.count <= this.blogs.length) {
        return;
      }

      try {
        this.isLoading = true;
        let url = conf.api_url + "/blogs";
        let param = {
          body_contains: this.word,
          _limit: 10,
          _start: this.blogs.length,
          _sort: "id:DESC"
        };

        let res = await this.$axios.get(url, { params: param });
        console.log(res);
        this.blogs = this.blogs.concat(res.data);
      } catch {
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 1 * 1000);
      }
    },
    doSearch: async function(word) {
      let counturl = conf.api_url + "/blogs/count";
      let url = conf.api_url + "/blogs";
      let param = {
        body_contains: word,
        _limit: 10,
        _sort: "id:DESC"
      };

      try {
        let count = await this.$axios.get(counturl, { params: param });
        this.count = count.data;
        let res = await this.$axios.get(url, { params: param });
        console.log(res);
        this.blogs = res.data;
      } catch {
        this.count = 0;
      }
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.isLoading = false;
    }, 5 * 1000);
  },
  created: function() {
    this.isLoading = true;
    console.log(this.$route.query);
    this.word = this.$route.query.word;
  },
  beforeRouteUpdate(to, from, next) {
    this.word = to.query.word;
    next();
  },
  watch: {
    word: function(word) {
      this.doSearch(word);
    }
  }
};
</script>