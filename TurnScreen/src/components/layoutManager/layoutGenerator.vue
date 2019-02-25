<template>
      <div class="col-md-12">
        
        <row-component  v-model="section" :sections="section"  v-on:input="section = $event; $emit('input', section);" :config="jsonConfig" class="px-3 py-3 mx-0"/>
      </div>
</template>

<script>
export default {
  //per agafar data externa.
  props: {
    jsonConfig: Object,
    sections:Array
  },
  data() {
    return {
      section:this.sections,
    };
  },

  mounted() {
    //this.htmlGrid = this.generateGrid(this.jsonConfig);
    //console.log(this.htmlGrid);
  },

  methods: {
  
  },
  created(){
     console.log(this.sections);
  }
};
</script>


