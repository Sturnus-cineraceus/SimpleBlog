<template>
  <v-app id="bloglist">
    <v-card class="bloglist" v-for="b in blogs" :key="b.id">
      <v-row>
        <v-col cols="auto">
          <v-avatar class="ma-3" size="254" tile>
            <v-img :src="img"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="auto">
          <v-card-title>{{b.title}}</v-card-title>
          <v-card-text>{{b.body}}</v-card-text>
        </v-col>
      </v-row>
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
      blogs: [],
      img: "/opt/no_image.png"
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