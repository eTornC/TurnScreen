<template>
  <div class="main" v-html="StoreListHtmlCode" ></div>
</template>


<script>
export default {
  props: {
    jsonConfig: Object
  },
  data() {
    return {
        StoreListHtmlCode:null,
    };
  },
  mounted: function() {
      console.log(this.jsonConfig);
      this.generateGrid(this.jsonConfig);

  },
  methods: {
       generateGrid(jsonConfig) {
      this.StoreListHtmlCode = "";
      if (jsonConfig.rows) {
        for (let i = 0; i < jsonConfig.rows.length; i++) {
          this.StoreListHtmlCode += `<div class="row" style="height: ${
            jsonConfig.rows[i].height
          }%;border: 0px solid black">
													${this.generateGrid(jsonConfig.rows[i])}
												</div>`;
        }

        return this.StoreListHtmlCode;
      } else if (jsonConfig.cols) {
        for (let i = 0; i < jsonConfig.cols.length; i++) {
          this.StoreListHtmlCode += `<div class="col col-md-${
            jsonConfig.cols[i].width
          }" style=" height: ${
            jsonConfig.cols[i].height
          }%; border: 0px solid black">
													${this.generateGrid(jsonConfig.cols[i])}
												</div>`;
        }

        return this.StoreListHtmlCode;
      } else {
        return `
        <div class="turn_list">
            <div class="store_name_content">
                <div class="store_name">
                </div>
            </div>
            <div class="store_turn_content">
                <div class="store_turn">
                <ul>
                    <li> <span class="actual">-------</span>
                    </li>
                </ul>
                <ul>
                    <li>-------</li>
                    <li>-------</li>
                    <li>-------</li>
                    <li>-------</li>
                </ul>
                </div>
            </div>
        </div>
        `;
      }
      //console.log(StoreListHtmlCode);

      this.StoreListHtmlCode = StoreListHtmlCode;
    }
  }
};
</script>

<style scoped>
.main {
    height: 100%;
}

</style>


<style>
.col{
    padding: 0 !important;
}
.row{
    margin: 0;
}
.turn_list {
  height: 100%;
  width: 100%;
  background-color: #eee;
  font-family: sans-serif;
  text-align: left;
}

/* store name*/
.turn_list .store_name_content {
  height: 20px;
  width: 100%;
  display: flex;
}
.turn_list .store_name {
  background-color: #aaa;
  width: 100%;
  margin: 4px;
  display: flex;
text-align: left;  align-items: center;
  font-size: 4em;
  border-radius: 5px;
}

/* turn list*/
.turn_list .store_turn_content {
  height: 85%;
  width: 100%;
  display: flex;
}
.turn_list .store_turn {
  width: 100%;
  font-size: 0.1rem;
}
.turn_list .store_turn ul {
  list-style: none;
  padding: 0px 20px;
  margin:0;
}
.turn_list .store_turn ul li {
  border-bottom: solid 1px black;
  color: grey;
  margin:0;
}
.actual {
  font-size: 0.5rem;
  color: black;
}


</style>