<template>
  <div class="row w-100 py-3 px-3 mx-0" v-if="config.cols" style="border: 1px solid black">
    <template v-for="(col, index) in config.cols">
      <col-component
        v-model="section"
        :sections="sections"
        v-on:input="sections = $event; $emit('input', sections);"
        :class="' px-3 py-3 mx-0 col-md-' + col.width"
        :config="col"
        :key="index"
      />
    </template>
  </div>
  <div v-else style="border: 1px solid black" class="px-3 py-3">
    <div class="turnBox">
     <!-- {{storeSelected}}
      {{config.id}}-->
      <content-component
        v-on:input="storeSelected = $event; section[config.id]= storeSelected; uploat();  $emit('input', section)"
        :sectionId="config.id"
      />
    </div>
  </div>
</template>

<script>
import urls from "../../api/config.js";
import axios from "axios";
export default {
  props: {
    config: Object,
    sections: Array
  },
  data() {
    return {
      stores: null,
      storeSelected: 1,
      section: this.sections
    };
  },

  methods: {
    uploat() {
      this.crearScreen = true;
      let url =
        urls.host +
        urls.routes.apiPrefix +
        urls.routes.section +
        "/" +
        this.config.id;
      axios
        .put(url, {
          id_store: this.storeSelected
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      console.log(this.sections);
    },
  },
  mounted() {},
  created() {
  }
};
</script>

<style>
.turnBox {
  /*display: flex;
  align-items: center;
  justify-content: center;*/
  height: 100%;
}
</style>