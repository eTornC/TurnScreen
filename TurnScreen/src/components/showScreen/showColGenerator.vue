<template>
  <div :style="'height:'+ config.height +'%'+';border: 1px solid black'" v-if="config.rows">
    <template v-for="(row, index) in config.rows">
      <show-row-component :config="row" :key="index"/>
    </template>
  </div>
  <div v-else :style="'height:'+ config.height+'%' +';border: 1px solid black'" class="px-3 py-3">
    <div class="turnBox">
      <show-content-component :storeId="config.id"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
