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
              <v-card-text>{{getDigest(b.body)}}</v-card-text>
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
  props: ["blogs"],
  data: function() {
    return {
      noimg: "/opt/no_image.png"
    };
  },
  methods: {
    loadImage: function(item) {
      if (item.topimages && item.topimages.length >= 1) {
        return conf.api_url + item.topimages[0].url;
      } else if (item.brand && item.brand.thumbnail) {
        return conf.api_url + item.brand.thumbnail.url;
      }
      return this.noimg;
    },
    getDigest: function(body) {
      let short = "";
      if (body) {
        let body2 = this.$md.render(body);
        let body3 = body2.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
        short = body3.slice(0, 300);
      }
      return short;
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