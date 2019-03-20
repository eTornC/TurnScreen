<template>
      <div class="col-md-12" style="height:100%" >
        <show-row-component :config="jsonConfig" />
      </div>
</template>

<script>
export default {
  //per agafar data externa.
  props: {
    jsonConfig: Object
  },
  data() {
    return {
    };
  },

  mounted() {
    //this.htmlGrid = this.generateGrid(this.jsonConfig);
    //console.log(this.htmlGrid);
  },

  methods: {

  },
  created(){
     console.log(this.jsonConfig)
  }
};
</script>

<style>
.col-md-12{
  padding: 0 !important;
}
</style>


