<template>
  <div v-if="store" class="turn_list">
    <div class="store_name_content">
      <div class="store_name">
        <span>{{store.name}}</span>
      </div>
    </div>
    <div class="store_turn_content">
      <div class="store_turn">
        <ul>
          <li>
            <span class="actual">{{computedActualTurn}}</span>
          </li>
        </ul>
        <ul>
          <li :key="waiting.id" v-for="waiting in turnWaiting" >T{{waiting.number}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import urls from "../../api/config.js";
import axios from "axios";
export default {
  props: {
    storeId: Number
  },
  data() {
    return {
      urls,
      actualTurn: 0,
      resfescar: null,
      resfescarWaiting: null,
      store: null,
      turnWaiting: []
    };
  },
  methods: {
    getStore() {
      const url =
        urls.host + urls.routes.prefix + urls.routes.store + "/" + this.storeId;
      //console.log(url);
      axios
        .get(url)
        .then(res => {
          this.store = res.data[0];

          this.updateActualTurn();
          this.updateTurnWaiting();
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
        this.store.id +
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
    },
    updateTurnWaiting() {
      const url =
        urls.host +
        urls.routes.prefix +
        urls.routes.store +
        "/" +
        this.store.id +
        "/turns";
      //console.log(url);

      axios
        .get(url)
        .then(res => {
          if (res.data.error) {
            this.turnWaiting = [];
          } else {
            this.turnWaiting = res.data;
            //console.log(this.turnWaiting);
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
    this.getStore();
    this.resfescar = null;
    this.resfescarWaiting = null;

    this.resfescar = setInterval(this.updateActualTurn, 1000);
    this.resfescarWaiting = setInterval(this.updateTurnWaiting, 1000);

  }
};
</script>

<style scoped>
.main {
  height: 100%;
}
</style>


<style>
.col {
  padding: 0 !important;
}
.row {
  margin: 0;
}
.turn_list {
  height: 100%;
  width: 100%;
  background-color: #eee;
  font-family: sans-serif;
  text-align: left;
}

/* store name*/
.turn_list .store_name_content {
  height: 70px;
  width: 100%;
  display: flex;
}
.turn_list .store_name {
  background-color: #aaa;
  width: 100%;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4em;
  border-radius: 5px;
}

/* turn list*/
.turn_list .store_turn_content {
  height: 85%;
  width: 100%;
  display: flex;
}
.turn_list .store_turn {
  width: 100%;
  font-size: 3rem;
}
.turn_list .store_turn ul {
  list-style: none;
  padding: 0px 20px;
  margin: 0;
}
.turn_list .store_turn ul li {
  border-bottom: solid 1px black;
  color: grey;
  margin: 0;
}
.actual {
  font-size: 6rem;
  color: black;
}
</style>