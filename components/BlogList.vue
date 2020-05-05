<template>
  <v-app id="bloglist">
    <v-card class="bloglist" v-for="b in blogs" :key="b.id">
      <div class="innercard">
        <nuxt-link :to="'/blog?id=' + b.id">
          <v-row>
            <v-col cols="auto">
              <v-avatar class="ma-3" size="254" tile>
                <v-img :src="loadImage(b)"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="auto">
              <v-card-title>{{b.title}}</v-card-title>
              <v-card-text>{{b.short}}</v-card-text>
            </v-col>
          </v-row>
        </nuxt-link>
      </div>
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
      noimg: "/opt/no_image.png"
    };
  },
  methods: {
    loadImage: function(item) {
      if (item.topimages && item.topimages.length > 1) {
        console.log(item.topimages);
        return conf.api_url + item.topimages[0].url;
      }
      return this.noimg;
    },
    loadBlog: function() {
      const blogsurl = conf.api_url + "/blogs";
      this.$axios.$get(blogsurl).then(res => {
        this.blogs = res;

        this.blogs.sort((a, b) => {
          return b.id - a.id;
        });

        this.blogs.map((v, i, a) => {
          let body = v.body;
          let short = "";
          if (body) {
            short = body.slice(0, 140);
          }
          v["short"] = short;
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

.innercard {
  padding: 1em;
}
</style>