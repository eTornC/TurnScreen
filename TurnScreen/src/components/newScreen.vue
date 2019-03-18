<template>
  <div>
    <div v-if="templateSelect" class="form">
      <div class="form-group row">
        <label class="col-sm-5 col-form-label">Plantilla selectionado</label>
        <div class="col-sm-5">
          <label for="staticEmail">{{templateSelect.NAME}}</label>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">Nom</label>
        <div class="col-sm-8">
          <input
            required="required"
            v-model="newName"
            type="text"
            class="form-control"
            placeholder="nuevo nombre"
          >
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">Descripcion</label>
        <div class="col-sm-8">
          <input
            required="required"
            v-model="description"
            type="text"
            class="form-control"
            placeholder
          >
        </div>
        <button @click="save()" class="btn btn-primary mb-2">Guardar</button>
      </div>
    </div>

    <div class="templateContent">
      <div
        class="template"
        @click="select(index)"
        v-for="(template, index) in templates"
        :key="template.ID"
      >
        <header>
          <div class="template_name">
            <span>{{template.NAME}}</span>
          </div>
        </header>
        <div class="content">
          <screen-demo-component :jsonConfig="JSON.parse(template.LAYOUT)"/>
        </div>
      </div>
    </div>
    <div class="cancel">
      <button @click="$emit('input', 'home');" type="button" class="btn btn-danger">Cancelar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urls from "../api/config.js";
import demoScreen from "./turnScreen/screenDemo.vue";

export default {
  components: {
    "screen-demo-component": demoScreen
  },
  data() {
    return {
      templates: null,
      templateSelect: null,
      newName: null,
      description: null
    };
  },
  mounted: function() {
    this.getTemplates();
  },
  methods: {
    getTemplates() {
      const url = urls.host + urls.routes.apiPrefix + urls.routes.layouts;
      //console.log(url);
      var reference = this;
      axios
        .get(url)
        .then(res => {
          reference.templates = res.data.records.filter(
            layout => layout.TYPE == "TEMPLATE"
          );
          console.log(reference.templates);
        })
        .catch(err => {
          console.error(err);
        });
    },
    save() {
      if (this.templateSelect && this.newName && this.description) {
        console.log(this.newName);
        console.log(this.description);
        let reference = this;
        const url = urls.host + urls.routes.apiPrefix + urls.routes.layouts;
        axios
          .post(url, {
            NAME: this.newName,
            LAYOUT: this.templateSelect.LAYOUT,
            DESCRIPTION: this.description,
            TYPE: "TURN"
          })
          .then(function(response) {
            console.log(response);
            reference.templateSelect = null;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    select(index) {
      console.log(index);
      this.templateSelect = this.templates[index];
    },
    setmode(mode) {
      this.mode = mode;
    }
  }
};
</script>

<style>
.templateContent {
  display: flex;
  flex-wrap: wrap;
}

.template {
  width: 350px;
  height: 250px;
  background-color: #e4e4e4;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin: 50px auto;
  -webkit-box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
}
.template header {
  height: 15%;
  width: 100%;
  display: flex;
}
.template_name {
  width: 100%;
  height: 100%;
  background-color: #b1ccef;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.template .content {
  height: 85%;
  margin: 0%;
}
</style>