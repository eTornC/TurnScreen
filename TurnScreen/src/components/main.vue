<template>
  <div v-if="crearScreen" class="row">
    <div class="col-2"></div>
    <div v-if="isSelect" class="col-8 workSpace-content">
      <br>
      <h1 @blur="updateScreenName" contenteditable="true">{{newScreenName}}</h1>
      <layout-component
        v-on:input="sections = $event"
        :sections="sections"
        :jsonConfig=" JSON.parse(newScreenLayout)"
      />
    </div>
    <div class="col-2"></div>
  </div>
  <div v-else class="row">
    <div class="col-8 workSpace-content">
      <!--layout-component v-if="isSelect" :jsonConfig=" templatesSelect"/-->
      <div v-if="isSelect">
        <div v-if="isSelect">{{templatesSelect.name}}</div>
        <h1>{{newScreenName}}</h1>
        <show-layout-component
          v-on:input="sections = $event"
          :sections="sections"
          :jsonConfig=" JSON.parse(newScreenLayout)"
        />
        <br>
        <button @click="crearNewScreen()" class="btn btn-primary">create</button>
        <!--div v-html="htmlCode"></div-->
      </div>
    </div>
    <div class="col-4 plantilla-content">
      <div
        @click="select(index)"
        v-for="(template,index) in templates"
        :key="template.name"
        :id="template.id"
      >
        <br>
        nom: {{template.name}}
        <show-layout-component :jsonConfig=" JSON.parse(template.layout)"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LayoutGenerator from "../components/layoutManager/layoutGenerator.vue";
import showLayoutGenerator from "../components/showScreen/showLayoutGenerator.vue";

import urls from "../api/config.js";


export default {
  components: {
    "layout-component": LayoutGenerator,
    "show-layout-component": showLayoutGenerator
  },
  data() {
    return {
      htmlCode: "",
      templates: null,
      isSelect: false,
      templatesSelect: null,
      stores: null,
      sctionNumber: 1,
      newScreenLayout: "",
      sections: [0],
      newScreenName: "new screen",
      crearScreen: false,
      newScreenId: 0
    };
  },

  mounted() {},

  methods: {
    getSectionNumber() {
      let url = urls.host + urls.routes.apiPrefix + urls.routes.section;
      console.log("section" + url);
      axios
        .get(url)
        .then(res => {
          console.log(res.data.records[res.data.records.length-1].id);
          this.sctionNumber = res.data.records[res.data.records.length-1].id;
          return this.sctionNumber;
          console.log("seccion number:" + this.sctionNumber);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTemplate() {
      let url = urls.host + urls.routes.apiPrefix + urls.routes.template;
      console.log(url);

      axios
        .get(url)
        .then(response => {
          this.templates = response.data.records;
        })
        .catch(err => {
          console.log(err);
        });
    },
    select(id) {
      this.isSelect = true;
      this.crearScreen = false;
      this.templatesSelect = JSON.parse(this.templates[id].layout);

      this.generateGrid(this.templatesSelect);
      this.getSectionNumber();
      this.newScreenLayout = '{"name":"' + this.newScreenName + '",';
      this.sections = [0];
      this.generateNewScreenLayout(this.templatesSelect);
      this.newScreenLayout += "}";
      console.log(this.newScreenLayout);
    },
    generateNewScreenLayout(templatelayout) {
      if (templatelayout.rows) {
        this.newScreenLayout += '"rows":[';

        for (let i = 0; i < templatelayout.rows.length; i++) {
          this.newScreenLayout += "{";

          this.generateNewScreenLayout(templatelayout.rows[i]);
          if (i == templatelayout.rows.length - 1) {
            this.newScreenLayout += "}";
          } else {
            this.newScreenLayout += "},";
          }
        }
        this.newScreenLayout += "]";
        return this.newScreenLayout;
      } else if (templatelayout.cols) {
        this.newScreenLayout += '"cols":[';
        for (let i = 0; i < templatelayout.cols.length; i++) {
          this.newScreenLayout +=
            '{"width":' + templatelayout.cols[i].width + ",";
          this.generateNewScreenLayout(templatelayout.cols[i]);
          if (i == templatelayout.cols.length - 1) {
            this.newScreenLayout += "}";
          } else {
            this.newScreenLayout += "},";
          }
        }
        this.newScreenLayout += "]";
        return this.newScreenLayout;
      } else {
        this.sctionNumber += 1;
        this.newScreenLayout += '"id":' + this.sctionNumber;
        this.sections[this.sctionNumber] = 0;
        return this.newScreenLayout;
      }
    },
    generateGrid(jsonConfig) {
      this.htmlCode = "";
      if (jsonConfig.rows) {
        for (let i = 0; i < jsonConfig.rows.length; i++) {
          this.htmlCode += `<div class="row px-3 py-3 mx-0" style="border: 1px solid black">
													${this.generateGrid(jsonConfig.rows[i])}
												</div>`;
        }

        return this.htmlCode;
      } else if (jsonConfig.cols) {
        for (let i = 0; i < jsonConfig.cols.length; i++) {
          this.htmlCode += `<div class="col-md-${
            jsonConfig.cols[i].width
          } px-3 py-3 mx-0 " style="border: 1px solid black">
													${this.generateGrid(jsonConfig.cols[i])}
												</div>`;
        }

        return this.htmlCode;
      } else {
        return this.crearStoreList();
        /*return (
          '<div class="inputContent"><input id="' +
          jsonConfig.id +
          '" type="text"/>' +
          "</div>"
        );
        return jsonConfig.id;*/
      }

      console.log(htmlCode);

      this.htmlCode = htmlCode;
    },
    crearStoreList() {
      let htmlCode = '<select class="form-control' + '">';
      for (let i = 0; i < this.stores.length; i++) {
        htmlCode +=
          '<option value="' + i + '">' + this.stores[i].name + "</option>";
      }
      htmlCode += "</select>";
      console.log(htmlCode);
      return htmlCode;
    },
    getStores() {
      const url = urls.host + urls.routes.prefix + urls.routes.stores;
      //console.log(url);

      axios
        .get(url)
        .then(res => {
          this.stores = res.data;
          //console.log(this.stores);
          this.crearStoreList();
        })
        .catch(err => {
          console.error(err);
        });
    },
    crearNewScreen() {
      this.crearScreen = true;
      let url = urls.host + urls.routes.apiPrefix + urls.routes.turnScreen;
      axios
        .post(url, {
          name: this.newScreenName,
          layout: this.newScreenLayout
        })
        .then(response => {
          console.log(response);
          this.newScreenId = response.data;
          console.log("id del nou turn screen" + this.newScreenId);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateScreenName: function(e) {
      console.log("UPDATING  this Screen" + e.target.innerText);

      let url =
        urls.host +
        urls.routes.apiPrefix +
        urls.routes.turnScreen +
        "/" +
        this.newScreenId;
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
    }
  },
  created() {
    this.getTemplate();
    this.getStores();
    this.getSectionNumber();
  }
};
</script>

<style scoped>
.row {
  background-color: burlywood;
  height: 100%;
  margin: 0;
}

.plantilla-content {
  background-color: rgb(111, 252, 165);
  overflow: auto;
}

.plantilla-content div {
  background-color: rgb(4, 131, 52);
  margin: 15px 0;
}
.workSpace-content {
  background-color: rgb(99, 250, 133);
}
.tools-content {
  background-color: rgb(252, 243, 121);
}
</style>




<style>
.inputContent div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.px-3,
.py-3 {
  padding: 0 !important;
}
.col-md-12 {
  padding: 15px;
}

/*[ scroll bar style ]*/
/* width */
.plantilla-content::-webkit-scrollbar {
  width: 13px;
}

/* Track */
.plantilla-content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 15px;
}

/* Handle */
.plantilla-content::-webkit-scrollbar-thumb {
  background: #aaa;
  border-radius: 15px;
}

/* Handle on hover */
.plantilla-content::-webkit-scrollbar-thumb:hover {
  background: grey;
}
</style>