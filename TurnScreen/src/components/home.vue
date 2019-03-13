<template>
  <div class="app">
    <!--HOME-->
    <div v-if="mode == 'home'" class="screenConten">
      <div class="screen" v-for="screen in turnScreen" :key="screen.id">
        <header>
          <div class="screen_name">
            <span>{{screen.name}}</span>
          </div>
          <div class="screen_option">
            <div @click="editScreen(screen.id)">
              <img
                src="https://image.flaticon.com/icons/svg/149/149307.svg"
                alt="Smi"
                height="100%"
                width="100%"
              >
            </div>
            <div @click="delScreen(screen.id)">
              <img
                src="https://image.flaticon.com/icons/svg/1345/1345823.svg"
                alt="delete"
                height="100%"
                width="100%"
              >
            </div>
          </div>
        </header>
        <div class="content">
          <img
            src="https://www.cssscript.com/wp-content/uploads/2015/03/Pinterest-like-Responsive-Fluid-Grid-Layout-with-Pure-JavaScript.jpg"
            alt="Smiley face"
            height="100%"
            width="100%"
          >
        </div>
      </div>
      <div class="turnScreenBottom">
        <div class="addButton">
          <img src="https://image.flaticon.com/icons/svg/748/748113.svg" width="50%" height="50%">
        </div>
      </div>
    </div>
    <!--EDIT MODE-->
    <div class="main_edit" v-else-if="mode == 'edit'">
      <edit-component v-on:input="mode = $event; getScreen();" :id="this.screenId" :mode="this.mode"/>
    </div>
    <!--CREAR MODE-->
  </div>
</template>

<script>
import axios from "axios";
import urls from "../api/config.js";
import edit from "./edit.vue";

export default {
  components: {
    "edit-component": edit
  },
  data() {
    return {
      turnScreen: null,
      mode: "home",
      edit_screen: null,
      StoreListHtmlCode: "",
      stores: [],
      screenId: null
    };
  },
  created: function() {
    this.getScreen();
  },
  mounted: function() {
    this.getScreen();
    this.getStores();
  },
  methods: {
    getStores() {
      const url = urls.host + urls.routes.prefix + urls.routes.stores;
      //console.log(url);
      var reference = this;
      axios
        .get(url)
        .then(res => {
          reference.stores = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    getScreen() {
      let url = urls.host + urls.routes.apiPrefix + urls.routes.turnScreen;
      var reference = this;
      axios
        .get(url)
        .then(res => {
          console.log(res.data.records);
          reference.turnScreen = res.data.records;
        })
        .catch(err => {
          console.log(err);
        });
    },
    delScreen(id) {
      let url = urls.host + urls.routes.apiPrefix + urls.routes.turnScreen;
      var reference = this;
      axios
        .delete(`${url}/${id}`, {})
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.getScreen();
    },
    getScreenLayout(id) {
      let url =
        urls.host + urls.routes.apiPrefix + urls.routes.turnScreen + "/" + id;
      var reference = this;
      console.log(url);
      axios
        .get(url)
        .then(res => {
          //console.log(res.data);
          reference.edit_screen = res.data;
          reference.StoreListHtmlCode = reference.generateGrid(
            JSON.parse(reference.edit_screen.layout)
          );
          console.log(reference.StoreListHtmlCode);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateScreenName: function(e) {
      console.log("UPDATING  this Screen" + e.target.innerText);
      let url =
        urls.host +
        urls.routes.apiPrefix +
        urls.routes.turnScreen +
        "/" +
        this.edit_screen.id;
      axios
        .put(url, {
          name: e.target.innerText
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    generateGrid(jsonConfig) {
      this.StoreListHtmlCode = "";
      if (jsonConfig.rows) {
        for (let i = 0; i < jsonConfig.rows.length; i++) {
          this.StoreListHtmlCode += `<div class="row px-3 py-3 mx-0" style="border: 1px solid black">
													${this.generateGrid(jsonConfig.rows[i])}
												</div>`;
        }

        return this.StoreListHtmlCode;
      } else if (jsonConfig.cols) {
        for (let i = 0; i < jsonConfig.cols.length; i++) {
          this.StoreListHtmlCode += `<div class="col-md-${
            jsonConfig.cols[i].width
          } px-3 py-3 mx-0 " style="border: 1px solid black">
													${this.generateGrid(jsonConfig.cols[i])}
												</div>`;
        }

        return this.StoreListHtmlCode;
      } else {
        return this.crearStoreList();
      }
      console.log(StoreListHtmlCode);

      this.StoreListHtmlCode = StoreListHtmlCode;
    },
    crearStoreList() {
      this.StoreListHtmlCode += '<select class="form-control' + '">';
      for (let i = 0; i < this.stores.length; i++) {
        this.StoreListHtmlCode +=
          '<option value="' + i + '">' + this.stores[i].name + "</option>";
      }
      this.StoreListHtmlCode += "</select>";
      return this.StoreListHtmlCode;
      console.log(this.StoreListHtmlCode);
    },
    editScreen(id) {
      this.setmode("edit");
      this.screenId = id;
      this.getScreenLayout(id);
      console.log(id);
    },
    setmode(mode) {
      this.mode = mode;
      if (this.mode == "home") {
        this.getScreen();
      }
    }
  }
};
</script>

<style>
/*main layout*/
.app {
  width: 100%;
  height: 100%;
  position: absolute;
}

.screenConten {
  display: flex;
  flex-wrap: wrap;
}
.screen {
  width: 450px;
  height: 400px;
  background-color: #999;
  margin: 10px auto;
}

.turnScreenBottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.addButton {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #2e9fcc;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Screen */
.screen {
  width: 350px;
  height: 250px;
  background-color: #e4e4e4;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
}
.screen header {
  height: 15%;
  width: 100%;
  display: flex;
}
.screen_name {
  width: 75%;
  height: 100%;
  background-color: #b1ccef;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 1.5rem;
}
.screen_name span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.screen_option {
  background-color: #b1ccef;
  display: flex;
  align-items: center;
  width: 40%;
}
.screen_option div {
  margin: 0 10px;
  width: 80%;
  height: 80%;
}
.screen .content {
  height: 76%;
  background-color: blue;
  margin: 3%;
}

/* edit */
.main_edit {
  height: 80%;
}
.main_edit .content {
  height: 700px;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.main_edit .content .name {
  width: 100%;
  font-size: 2rem;
  background-color: #999;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1% 0;
  border-radius: 5px;
}

.main_edit .content .template {
  background-color: #aaa;
  height: 100%;
  width: 100%;
  padding: 0;
}

.main_edit .option {
  height: 20%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>