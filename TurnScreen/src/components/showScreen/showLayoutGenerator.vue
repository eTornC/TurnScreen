<template>
      <div class="col-md-12">
        <show-row-component :config="jsonConfig" class="px-3 py-3 mx-0"/>
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
    generateGrid(jsonConfig) {
      let htmlCode = "";

      if (jsonConfig.rows) {
        for (let i = 0; i < jsonConfig.rows.length; i++) {
          htmlCode += `<div class="row px-3 py-3 mx-0" style="border: 1px solid black">
													${this.generateGrid(jsonConfig.rows[i])}
												</div>`;
        }

        return htmlCode;
      } else if (jsonConfig.cols) {
        for (let i = 0; i < jsonConfig.cols.length; i++) {
          htmlCode += `<div class="col-md-${
            jsonConfig.cols[i].width
          } px-3 py-3 mx-0" style="border: 1px solid black">
													${this.generateGrid(jsonConfig.cols[i])}
												</div>`;
        }

        return htmlCode;
      } else {
        return jsonConfig.content;
      }
    },

  },
  created(){
     
  }
};
</script>


