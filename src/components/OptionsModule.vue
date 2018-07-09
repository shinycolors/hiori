<template>
	<div class="sc3-options-module">
    <div class="module-name"><code>{{meta.name}}</code></div>
    <div class="module-desc">{{meta.description}}</div>
    <div class="module-options">
      <div class="module-option" v-for="option in meta.options" :key="option.id">
        <OptionForm :name="meta.name" :option="option" :config="config" v-on:notice="callNotice" />
      </div>
    </div>
    <div class="module-notice" v-show="notice">{{notice}}</div>
	</div>
</template>

<script>
import HioriSDK from '@sdk'
import OptionForm from './OptionForm.vue'
export default {
  props: [ 'meta' ],
  data() {
    return {
      config: new HioriSDK.Options(this.meta.name),
      notice: ''
    }
  },
  methods: {
    callNotice(notice) {
      if (notice) this.notice = notice
    }
  },
  components: {
    OptionForm
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
