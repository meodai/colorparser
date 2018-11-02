<script>
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import parseColors from './parseColor.js';

Vue.component('v-style', {
  props: ['html'],
  render: function(createElement) {
    return createElement('style', this.html);
  }
})

export default {
  name: "app",
  data: () => ({
    colorsByRules: null,
    colorRules: null,
    postCssResult: '',
    isReady: false,
    newColorsByRule: [],
  }),
  components: {
    HelloWorld
  },
  mounted () {
    parseColors.parse((colorsByRules, colorRules, postCssResult) => {
      
      this.colorsByRules = Array.from(colorsByRules); 
      this.colorRules = colorsByRules;
      this.postCssResult = postCssResult;
      console.log('cbr', this.colorsByRules )
      this.isReady = true;
    })
  },
  methods: {
    changeColor: function (e, color) {
      if(this.isReady) {
        const value = e.target.value;
        this.colorsByRules.forEach(color => {
          this.newColorsByRule.push([value, color[1]]);
        });
      }
    }
  },
  computed: {
    styleString () {
      if(this.newColorsByRule) {
        let str = ''; 
        this.newColorsByRule.forEach(col => {
          col[1].forEach(rule => {
            str += `${rule.selector} { ${rule.property}: ${col[1]}; }`
          })
        })
        return str;
      } else {
        return '';
      }
    }
  }
};
</script>

<template>
  <div id="app">
    <h1>dini mueter</h1>
    <input v-for="(color, key) in colorsByRules" :key="key" type="color" :value="color[0]" @input="changeColor($event, color)" />
    <v-style v-if="isReady" :html="styleString">
    </v-style>

     
  </div>
</template>

<style lang="scss">
#app {
  position: fixed;
  right: 0;
  top: 0;
}
</style>
