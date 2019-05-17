<template>
  <div v-if="!templateSelect">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">NOM</th>
          <th scope="col">DESCRIPCION</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(template,index) in templates" :key="template.id" >
            <td>{{index + 1}}</td>
            <td>{{template.name}}</td>
            <td>{{template.description}}</td>
            <td><button type="button" @click="select(index)" class="btn btn-primary">Mostra</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="show" v-else>
        <showScreen-component :jsonConfig="templateSelect.layout"/>
        <!--button type="button" @click="select(null)" class="btn btn-danger">cancel</button-->
  </div>
</template>

<script>
import axios from "axios";
import urls from "../api/config.js";
import Screen from "./turnScreen/screen.vue";
import showScreen from "./showScreen/showLayoutGenerator.vue";
export default {
  components: {
    "screen-component": Screen,
    "showScreen-component":showScreen
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
      const url = urls.host + urls.routes.prefix + urls.routes.layouts;
      //console.log(url);
      var reference = this;
      axios
        .get(url)
        .then(res => {
            console.log(res.data);
          reference.templates = res.data.filter(
            layout => layout.type == "TURNSCREEN"
          );
          console.log(reference.templates);
        })
        .catch(err => {
          console.error(err);
        });
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

<style scoped>
.show{

    height: 100%;
}
</style>