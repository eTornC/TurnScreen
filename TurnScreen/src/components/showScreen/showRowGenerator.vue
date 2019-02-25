<template>
  <div
    class="row w-100 py-3 px-3 mx-0"
    v-if="config.cols"
    style="border: 1px solid black"
  >
    <template v-for="(col, index) in config.cols">
      <show-col-component :class="' px-3 py-3 mx-0 col-md-' + col.width" :config="col" :key="index"/>
    </template>
  </div>
  <div v-else style="border: 1px solid black" class="px-3 py-3">
    <div class="turnBox">
        <show-content-component :sectionId="config.id"/>
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
    },

  },
  mounted() {},
  created() {

  }
};
</script>

<style>
.turnBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>