<template>
  <div class="main d-flex align-items-center justify-content-center">
    <div v-if="mode =='min'">
      <img src="#" width="50px" alt="turnList icon ">
    </div>
    <template v-else-if="mode =='complet'">
      <div v-if="store" class="card" style="width: 100%; height: 100%">
        <h1 class="store_name m-1">{{store.name}}</h1>
        <div class="card-body p-3 text-left">
          <h1 class="actualTurn border-bottom border-dark pl-2" v-if="!actualTurn">No Turn</h1>
          <h1
            class="border-bottom border-dark pl-2"
            v-else
            :key="index"
            v-for="(turn,index) in actualTurn"
          >
            >
            {{turnLeter(turn)}}
          </h1>
          <ul class="p-0 waitingTurns">
            <li  :key="index" v-for="(turn,index) in waitingTurns">
              <h3 v-if="turn.number" class="pl-2 border-bottom">{{turnLeter(turn)}}</h3>
            </li>
          </ul>
        </div>
      </div>
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
      store: null,
      actualTurn: [],
      waitingTurns: null,
      resfescar: null
    };
  },
  mounted: function() {
    this.getStore();
    this.getActualTurn();
    this.getWaitingTurn();
    this.resfescar = null;
    this.resfescar = setInterval(this.resfescarData, 1000);
  },
  methods: {
    refresh() {
      this.getStore();
      this.getActualTurn();
      this.getWaitingTurn();
    },
    resfescarData() {
      this.getActualTurn();
      this.getWaitingTurn();
    },
    getStore() {
      const url =
        config.host +
        config.routes.prefix +
        config.routes.store +
        "/" +
        this.id;
      axios
        .get(url)
        .then(res => {
          this.store = res.data;
          this.store.photo_path = config.host + this.store.photo_path;
        })
        .catch(err => {
          console.log("Fail");
        });
    },
    getActualTurn() {
      const url =
        config.host +
        config.routes.prefix +
        config.routes.store +
        "/" +
        this.id +
        config.routes.actualTurn;
      console.log(url);

      axios
        .get(url)
        .then(res => {
          this.actualTurn = res.data;
          //console.log(this.actualTurn);

          if (res.data.error) {
            this.actualTurn = false;
          }
        })
        .catch(err => {
          console.log("Fail");
        });
    },
    getWaitingTurn() {
      const url =
        config.host +
        config.routes.prefix +
        config.routes.store +
        "/" +
        this.id +
        config.routes.waitingTurns;

      console.log(url);

      axios
        .get(url)
        .then(res => {
          this.waitingTurns = res.data;
          //console.log(this.waitingTurns);
        })
        .catch(err => {
          console.log("Fail");
        });
    },
    turnLeter: function(turn) {
      if (turn.number != null) {
        if (turn.number.toString().length == 1) {
          turn.number = "0" + turn.number.toString();
        }
      }
      switch (turn.type) {
        case "normal":
          return "T" + turn.number;
          break;
        case "hour":
          if (turn.number) {
            return "A" + turn.number;
          } else {
            return "unsing";
          }
          break;
        case "vip":
          return "V" + turn.number;
          break;
      }
    }
  },
  computed: {
    // a computed getter
  }
};
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
}
.store_name {
  background-color: #ddd;
  border-radius: 10px;
}
.actualTurn {
}
.waitingTurns {
  list-style-type: none;
}
</style>
