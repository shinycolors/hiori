<template>
	<div class="sc3-options-module">
    <div class="module-name"><code>{{meta.name}}</code></div>
    <div class="module-desc">{{meta.description}}</div>
    <div class="module-options">
      <div class="module-option" v-for="option in meta.options">
        <!-- DROPDOWN -->
        <div v-if="option.type === 'dropdown'">
          <select :data-module="meta.name" :data-optid="option.id" v-on:change="dropdownChange">
            <option :value="choice.value" v-for="choice in option.data">{{choice.name}}</option>
          </select>
        </div>
        <!-- RADIO -->
        <div v-else-if="option.type === 'radio'">

        </div>
        <!-- TEXT -->
        <div v-else>
          <input type="text" :data-module="meta.name" :data-optid="option.id" v-on:change="textChange">
        </div>
      </div>
    </div>
	</div>
</template>

<script>

export default {
  props: [ 'meta' ],
  data() {
    return {

    }
  },
  methods: {
    dropdownChange: function(evt){
      let newValue = evt.target.value
      let moduleName = evt.target.getAttribute('data-module')
      let optionId = evt.target.getAttribute('data-optid')
      console.log('dropdownChange', moduleName, optionId, newValue)
      this.setConfigValue(moduleName, optionId, newValue)
    },
    textChange: function(evt){
      let newValue = evt.target.value
      let moduleName = evt.target.getAttribute('data-module')
      let optionId = evt.target.getAttribute('data-optid')
      console.log('dropdownChange', moduleName, optionId, newValue)
      this.setConfigValue(moduleName, optionId, newValue)
    },
    setConfigValue: function(moduleName, optionId, value) {
      if (!localStorage.getItem('config')) localStorage.setItem('config', '{}')
      let config = JSON.parse(localStorage.getItem('config'))
      if (!config[moduleName]) config[moduleName] = {}
      config[moduleName][optionId] = value
      localStorage.setItem('config', JSON.stringify(config))
    }
  }
}
</script>

<style lang="scss" scoped>
.sc3-options-module {
  background:#fff;
  border-bottom:1px solid #cecece;
  margin:0px auto 20px;
  padding:20px;
  max-width:700px;

  .module-name {
    code {
      background:#f0f0f0;
      padding:3px 5px;
    }
    font-weight:bold;
    font-size:16px;
    margin:0px 0px 5px 0px;
  }
  .module-desc {
    font-size:12px;
    margin:0px 0px 5px 0px;
  }
  .module-options {
    font-size:12px;
    .module-option {

    }
  }
}
</style>
