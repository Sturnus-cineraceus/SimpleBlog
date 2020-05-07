<template>
  <v-app id="blog">
    <h1>{{title}}</h1>

    <div id="blogBody" v-html="$md.render(body)"></div>
  </v-app>
</template>
<script>
import appconf from "../app.config";
const conf = appconf.default;

export default {
  name: "blog",
  data: function() {
    return {
      thumbnail: null
    };
  },
  head: function() {
    let metadata = [
      {
        hid: "og:title",
        property: "og:title",
        content: this.title
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "article"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: conf.base_url + this.$route.fullPath
      }
    ];

    let image = {
      hid: "og:image",
      property: "og:image",
      content: conf.base_url + this.$route.fullPath
    };

    //imageがある場合のみmetaに追加

    return {
      title: this.title,
      meta: metadata
    };
  },
  asyncData: async function(context) {
    let id = context.query.id;
    try {
      if (!id) {
        context.error({
          statusCode: 404,
          message: ""
        });
        return;
      }
      let res = await context.$axios(conf.api_url + "/blogs/" + id);
      return res.data;
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
#blogBody {
  margin-top: 2em;
}
#blogBody img {
  max-width: 500px;
}
</style>