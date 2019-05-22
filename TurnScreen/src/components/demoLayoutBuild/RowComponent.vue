<template>
  <div
    class="row"
    v-if="config.cols"
    :style="'border: 0px solid black; height:'+ config.height+'%;'"
  >
    <template v-for="(col, index) in config.cols">
      <col-component :mode="mode" :class="'col col-md-' + col.width" :config="col" :key="index"/>
    </template>
  </div>
  <div v-else :style="'height:'+ config.height +'%'+';border: 0px solid black'">
    <div class="turnBox">
      <publicit-demo :id="config.id" :mode="mode" v-if="config.type == 'Publicity'"/>
      <totemStore-demo :id="config.id" :mode="mode" v-else-if="config.type == 'TotemStore'"/>
      <turnList-demo :id="config.id" :mode="mode" v-else-if="config.type == 'TrunList'"/>
      <span v-else>Layot type Error</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { copyFile } from "fs";

import publicitDemo from "../screendemo/publicity.vue";
import totemStoreDemo from "../screendemo/totemStore.vue";
import turnListDemo from "../screendemo/turnList.vue";

export default {
  props: {
    config: Object,
    mode: String
  },
  components: {
    "publicit-demo": publicitDemo,
    "totemStore-demo": totemStoreDemo,
    "turnList-demo": turnListDemo
  },
  data() {
    return {
      stores: null
    };
  },

  methods: {
    select(ev) {
      ev.target.style.backgroundColor =
        "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    }
  },
  mounted() {
    console.log(this.config.height);
  },
  created() {}
};
</script>

<style scoped>
.turnBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;
}
.col {
  padding: 0;
}
.row {
  margin: 0;
}
</style>