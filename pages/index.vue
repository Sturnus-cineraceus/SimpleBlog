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
  asyncData: async function(context) {
    const blogsurl = conf.api_url + "/blogs";
    try {
      let res = await context.$axios.$get(blogsurl);
      let bs = res;
      bs.sort((a, b) => {
        return b.id - a.id;
      });
      return {
        blogs: bs
      };
    } catch (error) {
      context.error({
        statusCode: error.response.status,
        message: error.response.data.message
      });
    }
  }
};
</script>
<style>
</style>