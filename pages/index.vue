<template>
  <v-app id="top">
    <BlogList v-bind:blogs.sync="blogs" />
    <div v-intersect="onIntersect"></div>
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
      token: {},
      counturl: conf.api_url + "/blogs/count",
      blogurl: conf.api_url + "/blogs?_limit=10&_sort=id:DESC",
      isLoading: false
    };
  },
  head: function() {
    return {
      titleTemplate: ""
    };
  },
  created: function() {
    this.isLoading = true;
    if (process.client) {
      let jwt = this.$store.state.auth.jwt;
      this.token = jwt;
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.isLoading = false;
    }, 5 * 1000);
  },
  methods: {
    onIntersect: async function() {
      if (this.isLoading) {
        return;
      }
      console.log("kiken");
      this.isLoading = true;
      try {
        let countres = await this.$axios.$get(this.counturl);
        if (countres > this.blogs.length) {
          let neoblogs = await this.$axios.$get(
            this.blogurl + "&_start=" + this.blogs.length
          );
          this.blogs = this.blogs.concat(neoblogs);
        }
      } catch (er) {
        console.error(er);
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 1 * 1000);
      }
    }
  },
  asyncData: async function(context) {
    try {
      let res = await context.$axios.$get(
        conf.api_url + "/blogs?_limit=10&_sort=id:DESC"
      );
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