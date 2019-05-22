<template>
  <div class="show">
    <template v-if="templateSelect">
      <div class="turnsView">
        <showScreen-component :mode="'complet'" :jsonConfig="templateSelect.layout"/>
      </div>
    </template>
    <div v-else>
      <h1 class="mt-3" style="color:red;">Pantalla no Encontrado con id " {{$route.params.id}} "</h1>
      <h2 class="mt-3">Pantalla Disponibles</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">NOM</th>
            <th scope="col">DESCRIPCION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(template,index) in templates" :key="index">
            <td>{{template.id}}</td>
            <td>{{template.name}}</td>
            <td>{{template.description}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urls from "../api/config.js";

//import Screen from "./turnScreen/screen.vue";
//import showScreen from "./showScreen/showLayoutGenerator.vue";
import showScreen from "./demoLayoutBuild/LayoutGenerator.vue";

export default {
  components: {
    //"screen-component": Screen,
    "showScreen-component": showScreen
  },
  data() {
    return {
      templates: null,
      templateSelect: null,
      id: 0
    };
  },
  mounted: function() {
    this.getTemplates();
    this.id = this.$route.params.id;
    console.log(this.id);
  },
  methods: {
    getTemplates() {
      const url = urls.host + urls.routes.prefix + urls.routes.layouts;
      console.log(url);
      var reference = this;
      axios
        .get(url)
        .then(res => {
          reference.templates = res.data.filter(
            layout => layout.type == "TURNSCREEN"
          );
          console.log(reference.templates);
          this.templates.forEach(template => {
            if (template.id == this.id) {
              this.templateSelect = template;
            }
          });
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
.show {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.header__titel {
  margin: 0;
  width: 100%;
}
.logo {
  position: absolute;
  top: 0;
}
.turnsView {
  height: 100%;
}
</style>



<!--template>
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
        <button type="button" @click="select(null)" class="btn btn-danger">cancel</button>
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
</style-->