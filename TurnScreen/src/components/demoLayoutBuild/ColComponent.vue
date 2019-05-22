<template>
  <div :style="'height:'+ config.height +'%'+';border: 0px solid black'" v-if="config.rows">
    <template v-for="(row, index) in config.rows">
      <row-component :mode="mode" :config="row" :key="index"/>
    </template>
  </div>
  <div v-else :style="'height:'+ config.height+'%' +';border: 0px solid black'" class="px-0 py-0">
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
</style>
