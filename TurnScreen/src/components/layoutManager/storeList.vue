 <template>
  <div>
    <select class="form-control" v-on:input="$emit('input', $event.target.value)" v-model="selected" v-html="selectHtml"></select>
  </div>
</template>
<script>
export default {
  props: ["section", "stores"],
  data: function() {
    return {
      selectHtml: "",
      selected: this.section
    };
  },
  methods: {
    GenerateSelect: function() {
        //console.log(this.stores);
      for (let i = 0; i < this.stores.length; i++) {
        //en value +1 si el posisio de array correspont el store.
        this.selectHtml +=
          '<option value="' +
          parseInt(i + 1) +
          '">' +
          this.stores[i].name +
          "</option>";
      }
    }
  },
  created() {
    this.GenerateSelect();
  }
};
</script>
