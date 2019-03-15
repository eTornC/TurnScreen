<template>
  <div class="main_edit">
    <div class="content">
      <div class="name">
        <span
          v-if="edit_screen"
          @blur="updateScreenName"
          contenteditable="true"
        >{{edit_screen.NAME}}</span>
      </div>
      <div class="template">
        <!--layout-component :sections="sections" :jsonConfig=" JSON.parse(edit_screen.layout)"/-->
        <div id="option"></div>
      </div>
    </div>
    <div class="option">
      <div class="cancel">
        <button @click="$emit('input', 'home');" type="button" class="btn btn-danger">Cancelar</button>
      </div>
      <div class="save">
        <button @click="save" type="button" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urls from "../api/config.js";
global.jQuery = require("jQuery");
var $ = global.jQuery;
window.$ = $;
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
      sections: [0],
      storeSelect: [],
      selectPositionCountID: 0,
      layoutPositionCountID: 0,
      newScreenLayout: ""
    };
  },
  mounted: function() {
    this.getStores();
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
          this.getScreenLayout(this.id);

          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    getScreenLayout(id) {
      const url =
        urls.host + urls.routes.apiPrefix + urls.routes.layouts + "/" + id;
      var reference = this;
      console.log(url);
      axios
        .get(url)
        .then(res => {
          //console.log(res.data);
          reference.edit_screen = res.data;
          reference.StoreListHtmlCode = reference.generateGrid(
            JSON.parse(reference.edit_screen.LAYOUT)
          );
          console.log("html" + reference.StoreListHtmlCode);
          $("#option").html(reference.StoreListHtmlCode);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateScreenName: function(e) {
      console.log("UPDATING  this Screen" + e.target.innerText);

      const url =
        urls.host +
        urls.routes.apiPrefix +
        urls.routes.layouts +
        "/" +
        this.edit_screen.ID;
      axios
        .put(url, {
          NAME: e.target.innerText
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
          this.StoreListHtmlCode += `<div class="row px-3 py-3 mx-0" style="height: ${
            jsonConfig.rows[i].height
          }%;border: 1px solid black">
													${this.generateGrid(jsonConfig.rows[i])}
												</div>`;
        }

        return this.StoreListHtmlCode;
      } else if (jsonConfig.cols) {
        for (let i = 0; i < jsonConfig.cols.length; i++) {
          this.StoreListHtmlCode += `<div class="col-md-${
            jsonConfig.cols[i].width
          } px-3 py-3 mx-0 " style=" height: ${
            jsonConfig.cols[i].height
          }%; border: 1px solid black">
													${this.generateGrid(jsonConfig.cols[i])}
												</div>`;
        }

        return this.StoreListHtmlCode;
      } else {
        return this.crearStoreList(jsonConfig.id);
      }
      //console.log(StoreListHtmlCode);

      this.StoreListHtmlCode = StoreListHtmlCode;
    },
    crearStoreList(id) {
      this.StoreListHtmlCode +=
        `<select selectId="${
          this.selectPositionCountID
        }" class="form-control selecte` + '">';
      for (let i = 1; i < this.stores.length; i++) {
        if (i == id) {
          this.StoreListHtmlCode +=
            '<option selected value="' + i + '">' + this.stores[i].name + "</option>";
        } else {
          this.StoreListHtmlCode +=
            '<option value="' + i + '">' + this.stores[i].name + "</option>";
        }
      }
      this.StoreListHtmlCode += "</select>";
      this.selectPositionCountID++;
      return this.StoreListHtmlCode;
      //console.log(this.StoreListHtmlCode);
    },
    generateNewScreenLayout(newLayout) {
      if (newLayout.rows) {
        this.newScreenLayout += '"rows":[';

        for (let i = 0; i < newLayout.rows.length; i++) {
          this.newScreenLayout += `{"height": ${newLayout.rows[i].height},`;
          this.generateNewScreenLayout(newLayout.rows[i]);
          if (i == newLayout.rows.length - 1) {
            this.newScreenLayout += "}";
          } else {
            this.newScreenLayout += "},";
          }
        }
        this.newScreenLayout += "]";
        return this.newScreenLayout;
      } else if (newLayout.cols) {
        this.newScreenLayout += '"cols":[';
        for (let i = 0; i < newLayout.cols.length; i++) {
          this.newScreenLayout += `{ "width": ${
            newLayout.cols[i].width
          } ,"height": ${newLayout.cols[i].height},`;
          this.generateNewScreenLayout(newLayout.cols[i]);
          if (i == newLayout.cols.length - 1) {
            this.newScreenLayout += "}";
          } else {
            this.newScreenLayout += "},";
          }
        }
        this.newScreenLayout += "]";
        return this.newScreenLayout;
      } else {
        this.newScreenLayout += `"id":${
          this.storeSelect[this.layoutPositionCountID]
        }`;
        this.layoutPositionCountID++;
        return this.newScreenLayout;
      }
    },
    updateLayout() {
      const url =
        urls.host + urls.routes.apiPrefix + urls.routes.layouts + "/" + this.id;

      axios
        .put(url, {
          LAYOUT: this.newScreenLayout
        })
        .then(function(response) {
          console.log(response);
          reference.templateSelect = null;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    save() {
      console.log("save");
      let storeSelect = [];
      $(".selecte").each(function(i) {
        storeSelect[$(this).attr("selectId")] = $(this)
          .children("option:selected")
          .val();
      });
      this.storeSelect = storeSelect;
      console.log(this.storeSelect);

      this.newScreenLayout = "{ ";
      this.generateNewScreenLayout(JSON.parse(this.edit_screen.LAYOUT));
      this.newScreenLayout += "}";
      console.log("new layout:" + this.newScreenLayout);
      this.updateLayout();
      this.layoutPositionCountID = 0;
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
  height: 90%;
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
.template #option {
  height: 100%;
}
</style>