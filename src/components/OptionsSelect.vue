<template>
  <!-- DROPDOWN -->
  <div v-if="option.type === 'dropdown'">
    {{option.title}}
    <select :data-module="meta.name" :data-optid="option.id" :data-notice="option.notice" :value="value" v-on:change="dropdownChange">
      <option :value="choice.value" v-for="choice in option.data">{{choice.name}}</option>
    </select>
  </div>
  <!-- RADIO -->
  <div v-else-if="option.type === 'radio'">

  </div>
  <!-- CHECK -->
  <div v-else-if="option.type === 'check'">
    {{option.title}} <input type="checkbox" :data-module="meta.name" :data-optid="option.id" :data-notice="option.notice" v-on:change="checkChange" :checked="value ? 'checked' : ''">
  </div>
  <!-- TEXT -->
  <div v-else>
    {{option.title}} <input type="text" :data-module="meta.name" :data-optid="option.id" :data-notice="option.notice" :value="value" v-on:change="textChange">
  </div>
</template>

<script>
export default {
  props: [ 'meta', 'option', 'config', 'notice' ],
  data() {
    return {
      value: this.config.get(this.option.id)
    }
  },
  methods: {
    dropdownChange: function(evt){
      this.updateConfig(evt.target.getAttribute('data-optid'), evt.target.value, evt.target.getAttribute('data-notice'))
    },
    textChange: function(evt){
      this.updateConfig(evt.target.getAttribute('data-optid'), evt.target.value, evt.target.getAttribute('data-notice'))
    },
    checkChange: function(evt){
      this.updateConfig(evt.target.getAttribute('data-optid'), evt.target.checked, evt.target.getAttribute('data-notice'))
    },
    updateConfig: function(optId, value, notice){
      if (notice) this.notice = notice
      this.config.set(optId, value)
    }
  },
  mounted() {
    // this.config = new HioriSDK.Options(this.meta.name)
    this.$forceUpdate()
  }
}
</script>
