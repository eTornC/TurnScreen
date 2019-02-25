<template>
  <div>
    <div v-if="selsect">
      <div class="closeButton">
        <button @click="tanca" type="button" class="close" aria-label="Close">
          <div>&times;</div>
        </button>
      </div>

      <screen-component :jsonConfig="screens[ScreenSelect]"/>
    </div>

    <div class="content" v-else>
      <div class="row">
        <div class="col-2">
          <ul class="screenList">
            <li @click="selectScreen(index)" v-for="(screen,index) in screensNames" :key="index">
              <h3>{{screen.name}}</h3>
            </li>
          </ul>
        </div>
        <div class="col-10">
          <div class="screenContent">
            <div class="screen">
              <div v-for="(screen,index) in screens" :key="index">
                <screen-component v-if="index==ScreenSelect" :jsonConfig="screens[ScreenSelect]"/>
              </div>
            </div>
          </div>
          <br>
          <button type="submit" @click="mostra" class="btn btn-primary mb-2">Mostra</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import TurnScreenComponent from "./showScreen/showLayoutGenerator.vue";

import urls from "../api/config.js";
import axios from "axios";
export default {
  props: {},
  components: {
    "screen-component": TurnScreenComponent
  },
  data() {
    return {
      urls,
      selsect: false,
      ScreenSelect: 0,
      screens: [],
      screensNames:[],
    };
  },

  methods: {
    selectScreen(name) {
      this.ScreenSelect = name;
      console.log(this.ScreenSelect);
    },
    mostra() {
      console.log(this.ScreenSelect);
      if (this.ScreenSelect != null) {
        this.selsect = true;
      }
    },
    tanca() {
      this.selsect = false;
    },
    getTurnScreen() {
      let url = urls.host + urls.routes.apiPrefix + urls.routes.turnScreen;

      axios
        .get(url)
        .then(res => {
          if (res.data.error) {
            this.actualTurn = {};
          } else {
            this.screensNames = res.data.records;
            console.log(this.screensNames);
            this.screens = res.data.records.map(function(value) {
              const allowed = ["layout"];
              const filtered = Object.keys(value)
                .filter(key => allowed.includes(key))
                .reduce((obj, key) => {
                  obj[key] = value[key];
                  return obj;
                }, {});
              console.log(filtered);
              return  JSON.parse(filtered.layout);
            });
            console.log(this.screens);
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
    this.getTurnScreen();
  }
};
</script>

<style>
.content {
  width: 80%;
  margin: 50px auto;
}
.screenContent {
  display: flex;
  justify-content: center;
}
.screen {
  width: 700px;
  background-color: rgb(107, 162, 235);
  border-radius: 2%;
}
.closeButton {
  z-index: 7;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.closeButton div {
  display: none;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  font-size: 70px;
  border-radius: 50%;
  background-color: #ddd;
}

.closeButton:hover div {
  display: flex;
}

.turnScreen h1 {
  font-size: 2em !important;
}
.turnScreen h3 {
  font-size: 1.5em !important;
}
.px-3,
.py-3 {
  padding: 0 !important;
}
.col-md-12 {
  padding: 15px;
}
.screenList {
  list-style: none;
  padding: 0;
}
.screenList li {
  background-color: #68f;
  margin: 15px 0;
  border-radius: 10px;
}
.screenList li h3 {
  padding: 15px 0;
}
.screenList li:hover {
  background-color: #68b;
}
</style>