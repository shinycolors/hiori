<template>
	<div class="sc3-options-module">
    <div class="module-name"><code>{{meta.name}}</code></div>
    <div class="module-desc">{{meta.description}}</div>
    <div class="module-options">
      <div class="module-option" v-for="option in meta.options">
        <!-- DROPDOWN -->
        <div v-if="option.type === 'dropdown'">
          {{option.title}}
          <select :data-module="meta.name" :data-optid="option.id" :data-notice="option.notice" :value="config.get(option.id)" v-on:change="dropdownChange">
            <option :value="choice.value" v-for="choice in option.data">{{choice.name}}</option>
          </select>
        </div>
        <!-- RADIO -->
        <div v-else-if="option.type === 'radio'">

        </div>
        <!-- CHECK -->
        <div v-else-if="option.type === 'check'">
          {{option.title}} <input type="checkbox" :data-module="meta.name" :data-optid="option.id" :data-notice="option.notice" v-on:change="checkChange" :checked="config.get(option.id) ? 'checked' : ''">
        </div>
        <!-- TEXT -->
        <div v-else>
          {{option.title}} <input type="text" :data-module="meta.name" :data-optid="option.id" :data-notice="option.notice" :value="config.get(option.id)" v-on:change="textChange">
        </div>
      </div>
    </div>
    <div class="module-notice" v-show="notice">{{notice}}</div>
	</div>
</template>

<script>
import HioriSDK from '@sdk'
export default {
  props: [ 'meta' ],
  data() {
    return {
      config: new HioriSDK.Options(this.meta.name),
      notice: ''
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
    margin:0px 0px 5px 0px;
    .module-option {

    }
  }
  .module-notice {
    padding:3px 5px;
    background:#def;
  }
}
</style>
