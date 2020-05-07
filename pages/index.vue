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
    return {
      token: {}
    };
  },
  created: function() {
    if (process.client) {
      let jwt = this.$store.state.auth.jwt;
      this.token = jwt;
    }
  },
  asyncData: async function(context) {
    const blogsurl = conf.api_url + "/blogs?_sort=id:DESC";
    try {
      let res = await context.$axios.$get(blogsurl);
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