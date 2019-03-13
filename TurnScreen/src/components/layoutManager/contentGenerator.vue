<template>
  <div class="inputContent my-2 mx-2">
    <div v-if="storeGet">
      <select-store
        v-model="storeSelected"
        v-on:input="storeSelected = $event; $emit('input', storeSelected);"
        :section="storeSelected"
        :stores="stores"
      ></select-store>
    </div>
  </div>
</template>


<script>
import urls from "../../api/config.js";
import axios from "axios";
export default {
  props: {
    sectionId: Number
  },
  data() {
    return {
      urls,
      actualTurn: 0,
      storeGet: false,
      stores: null,
      storeSelected: 0
    };
  },
  methods: {
    getStores() {
      const url = urls.host + urls.routes.prefix + urls.routes.stores;
      //console.log(url);

      axios
        .get(url)
        .then(res => {
          this.stores = res.data;
          this.storeGet = true;
          //console.log(this.store);
        })
        .catch(err => {
          console.error(err);
        });
    },
    getStoreSelectedId() {
      let url =
        urls.host +
        urls.routes.apiPrefix +
        urls.routes.section +
        "/" +
        this.sectionId;
      //console.log(url);
      axios
        .get(url)
        .then(res => {
          this.storeSelected = res.data.id_store;
          //console.log(this.store);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },

  computed: {},
  created() {
    this.getStores();
    this.getStoreSelectedId();
  }
};
</script>