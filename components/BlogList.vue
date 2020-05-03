<template>
  <v-app id="bloglist">
    <v-card class="bloglist" v-for="b in blogs" :key="b.id">
      <v-card-title>{{b.title}}</v-card-title>
      <v-card-text>{{b.body}}</v-card-text>
    </v-card>
  </v-app>
</template>
<script>
import appconf from "../app.config";
const conf = appconf.default;

export default {
  name: "bloglist",
  data: function() {
    return {
      blogs: []
    };
  },
  methods: {
    loadBlog: function() {
      const blogsurl = conf.api_url + "/blogs";
      this.$axios.$get(blogsurl).then(res => {
        this.blogs = res;

        this.blogs.sort((a, b) => {
          return b.id - a.id;
        });
      });
    }
  },
  created: function() {
    if (process.client) {
      this.loadBlog();
    }
  }
};
</script>
<style>
.bloglist {
  margin: 1em;
}
</style>