<template>
  <div class="main_edit">
    <div class="content">
      <div class="name">
        <span
          v-if="edit_screen"
          @blur="updateScreenName"
          contenteditable="true"
        >{{edit_screen.name}}</span>
      </div>
      <div v-if="edit_screen" class="template">
        <layout-component :sections="sections" :jsonConfig=" JSON.parse(edit_screen.layout)"/>
        <!--div v-html="StoreListHtmlCode"></div-->
      </div>
    </div>
    <div class="option">
      <div class="cancel">
        <button @click="$emit('input', 'home');" type="button" class="btn btn-danger">Cancelar</button>
      </div>
      <!--div class="save">
          <button type="button" class="btn btn-primary">Guardar</button>
      </div-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urls from "../api/config.js";

export default {
  props: {
    id: Number,
    mode: String
  },
  data() {
    return {
      edit_screen: null,
      StoreListHtmlCode: "",
      stores: [],
      sections: [0]
    };
  },
  mounted: function() {
    this.getStores();
    this.getScreenLayout(this.id);
    console.log(this.id);
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
    setmode(mode) {
      this.mode = mode;
    }
  }
};
</script>

<style>
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