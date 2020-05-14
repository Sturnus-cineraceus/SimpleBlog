<template>
  <v-app id="blog">
    <h1>{{res.title}}</h1>
    <div class="create_date">
      <p>投稿日 : {{ util.changeDateFormat(res.created_at) }}</p>
    </div>
    <div id="blogBody" v-html="$md.render(res.body)"></div>
  </v-app>
</template>
<script>
import appconf from "../../app.config";
const conf = appconf.default;

import utilobj from "../../utils/util";

export default {
  name: "blog",
  data: function() {
    return {
      util: utilobj
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
      },
      {
        hid: "og:image",
        property: "og:image",
        content: this.thumbnail
      }
    ];

    return {
      title: this.title,
      meta: metadata
    };
  },
  asyncData: async function(context) {
    let id = context.route.params.id;
    try {
      if (!id) {
        context.error({
          statusCode: 404,
          message: ""
        });
        return;
      }
      let res = await context.$axios(conf.api_url + "/blogs/" + id);

      let thumbnail = conf.base_url + "/opt/_aegimno.png";
      if (res.data.topimages && res.data.topimages.length >= 1) {
        thumbnail = conf.api_url + res.data.topimages[0].url;
      } else if (res.data.brand && res.data.brand.thumbnail) {
        thumbnail = conf.api_url + res.data.brand.thumbnail.url;
      }

      let data = {
        res: res.data,
        thumbnail: thumbnail
      };
      return data;
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
.create_date {
  padding-top: 1em;
  padding-left: 1em;
}
</style>