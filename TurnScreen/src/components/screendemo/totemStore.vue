<template>
  <div class="main d-flex align-items-center justify-content-center">
    <div v-if="mode =='min'">
      <img src="#" width="50px" alt="totemStore Icon">
    </div>
    <template v-else-if="mode =='complet'">
      <div v-if="store" class="card" @click="normalTurn(store)" style="width: 70%; ">
        <img class="card-img-top" :src="store.photo_path" alt="Card image cap">
        <div class="card-body p-1">
          <h1>{{store.name}}</h1>
        </div>
      </div>
    </template>
    <div v-else>mode Error</div>
  </div>
</template>


<script>
import axios from "axios";
import urls from "../../api/config.js";

export default {
  props: {
    jsonConfig: Object,
    id: Number,
    mode: String
  },
  data() {
    return {
      store: null,
      store_photo_path: null
    };
  },
  mounted: function() {
    this.getStore();
  },
  methods: {
    getStore() {
      const url =
        urls.host + urls.routes.prefix + urls.routes.store + "/" + this.id;
      axios
        .get(url)
        .then(res => {
          this.store = res.data;
          this.store.photo_path = urls.host + this.store.photo_path;
        })
        .catch(err => {
          console.log("Fail");
        });
    },
    normalTurn(store) {
      this.checkImpresora(store);
    },
    checkImpresora(store) {
      const url = urls.impresoraHost + urls.routes.print + "/0";
      axios
        .get(url)
        .then(res => {
          console.log(res);
          this.pedirTurno(store);
        })
        .catch(err => {
          console.log(err)
          this.$swal("Impresora Conection Error ");
        });
    },
    pedirTurno(store) {
      const url =
        urls.host +
        urls.routes.prefix +
        urls.routes.store +
        "/" +
        store.id +
        "/turn";
      console.log(url);
     axios
        .post(url)
        .then(res => {
          console.log(res);
          this.$swal({
            type: "success",
            title: "Imprimir tiquet T " + res.data.turn.number,
            showConfirmButton: false,
            timer: 2500
          });
          console.log("Imprimir tiquet T " + res.data.turn.number);
          this.imprimirTicket(store.name, res.data.turn.number);
          //this.$swal('Imprimir tiquet' + JSON.stringify(res.data));
        })
        .catch(err => {
          this.$swal("Failako");
        });
    },
    imprimirTicket(storeName, number) {
      console.log("store nombre= " + storeName + ", numbre=" + number);
      const url =
        urls.impresoraHost + urls.routes.print + "/" + storeName + "/" + number;
      console.log("print Host: " + url);

      axios
        .post(url, {
          timeout: 3000
        })
        .then(res => {
          console.log(res);
          //this.$swal('Imprimir tiquet' + JSON.stringify(res.data));
        })
        .catch(err => {
          this.$swal("Impresora Error");
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
</style>
