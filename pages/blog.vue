<template>
  <v-app id="blog">{{title}}</v-app>
</template>
<script>
import appconf from "../app.config";
const conf = appconf.default;

export default {
  name: "blog",
  data: function() {
    return {
      // title: "",
      // body: ""
    };
  },
  asyncData: async function(context) {
    let id = context.query.id;
    console.log(id);
    try {
      let res = await context.$axios(conf.api_url + "/blogs/" + id);
      return res.data;
    } catch (error) {
      context.error({
        statusCode: error.response.status,
        message: error.response.data.message
      });
    }
  }
};
</script>