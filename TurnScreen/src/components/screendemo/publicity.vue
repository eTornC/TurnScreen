<template>
  <div class="main d-flex align-items-center justify-content-center">
    <div v-if="mode =='min'">
      <img src="#" width="50px" alt="publicity icon">
    </div>
    <template v-else-if="mode =='complet'">
      <div class="publicity" v-if="publicity" v-html="publicity.html"></div>
    </template>
    <div v-else>mode Error</div>
  </div>
</template>


<script>
import axios from "axios";
import config from "../../api/config";

export default {
  props: {
    jsonConfig: Object,
    id: Number,
    mode: String
  },
  data() {
    return {
      publicity: null
    };
  },
  mounted: function() {
    this.getPublicity();
  },
  methods: {
    getPublicity() {
      const url =
        config.host +
        config.routes.prefix +
        config.routes.publicity +
        "/" +
        this.id;
      axios
        .get(url)
        .then(res => {
          this.publicity = res.data;
        })
        .catch(err => {
          console.log("Fail");
        });
    }
  }
};
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
}
.publicity {
  height: 100%;
  width: 100%;
}
</style>
