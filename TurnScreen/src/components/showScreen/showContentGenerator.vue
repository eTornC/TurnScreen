<template>
  <div class="store_pantalla my-2 mx-2">
    <!--{{sectionId}}-->
    <div v-for="store in store" :key="store.name">
      <h1 class="mb-3 mt-2">{{store.name}}</h1>
      <h3 class="mb-1">Torn Actual: {{computedActualTurn}}</h3>
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
      resfescar: null,
      storeId: null,
      store: null
    };
  },
  methods: {
    getStoreId() {
      let url =
        urls.host +
        urls.routes.apiPrefix +
        urls.routes.section +
        "/" +
        this.sectionId;

      axios
        .get(url)
        .then(res => {
          if (res.data.error) {
            this.actualTurn = {};
          } else {
            this.storeId = res.data.id_store;
            //console.log(this.sectionId + " " + this.storeId);
            this.getStore();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getStore() {
      const url =
        urls.host + urls.routes.prefix + urls.routes.store + "/" + this.storeId;
      //console.log(url);

      axios
        .get(url)
        .then(res => {
          this.store = res.data;
          //console.log(this.store);
          this.updateActualTurn();
        })
        .catch(err => {
          console.error(err);
        });
    },
    updateActualTurn() {
      
      
      const url =
        urls.host +
        urls.routes.prefix +
        urls.routes.store +
        "/" +
        this.store[0].id +
        "/actualTurn";
      //console.log(url);

      axios
        .get(url)
        .then(res => {
          if (res.data.error) {
            this.actualTurn = {};
          } else {
            this.actualTurn = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    computedActualTurn() {
      switch (this.actualTurn.type) {
        case "VIP":
          return "V" + ("0" + this.actualTurn.number).slice(-2);
        case "NORMAL":
          return "T" + ("0" + this.actualTurn.number).slice(-2);
        case "MOBILE":
          return "M" + ("0" + this.actualTurn.number).slice(-2);
        default:
          return "NO TURNS";
      }
    }
  },
  created() {
    this.getStoreId();
    this.resfescar = null;
    //this.resfescar = setInterval(this.updateActualTurn, 1000);
  }
};
</script>