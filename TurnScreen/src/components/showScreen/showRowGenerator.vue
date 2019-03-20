<template>
  <div
    class="row"
    v-if="config.cols"
    :style="'border: 1px solid black; height:'+ config.height+'%;'"
  >
    <template v-for="(col, index) in config.cols">
      <show-col-component :class="'col col-md-' + col.width" :config="col" :key="index"/>
    </template>
  </div>
  <div v-else :style="'height:'+ config.height +'%'+';border: 1px solid black'">
    <div class="turnBox">
      <show-content-component :storeId="config.id"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { copyFile } from "fs";
export default {
  props: {
    config: Object
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

<style>
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
</style>