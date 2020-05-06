<template>
  <v-app id="top">
    <BlogList v-bind:blogs="blogs" />
  </v-app>
</template>
<script>
import BlogList from "../components/BlogList";

import appconf from "../app.config";
const conf = appconf.default;

export default {
  name: "top",
  components: { BlogList },
  data: function() {
    return {};
  },
  created: function() {
    if (process.client) {
      console.log("fet");
      let jwt = this.$store.state.auth.jwt;
      console.log("jwt", jwt);
    }
  },
  asyncData: async function(context) {
    const blogsurl = conf.api_url + "/blogs?_sort=id:DESC";
    try {
      let res = await context.$axios.$get(blogsurl);
      // let bs = res;
      // bs.sort((a, b) => {
      //   return b.id - a.id;
      // });
      return {
        blogs: res
      };
    } catch (error) {
      if (error.response) {
        context.error({
          statusCode: error.response.status,
          message: error.response.data.message
        });
      } else {
        context.error({
          statusCode: 503,
          message: "internal server error"
        });
      }
    }
  }
};
</script>
<style>
</style>