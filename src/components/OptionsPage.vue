<template>
	<div class="sc3-options-page">
    <div v-for="moduleKey in Object.keys(modules)" :key="moduleKey.id">
      <ModuleOptions :meta="modules[moduleKey]" />
    </div>
	</div>
</template>

<script>
import ModuleOptions from './OptionsModule.vue'
export default {
  props: [ 'modules' ],
  data() {
    return {

    }
  },
  components: {
    ModuleOptions
  }
}
</script>

<style lang="scss">
body {
  background:#f0f0f0;
  .sc3-options-page {
    padding:20px;
  }
}
</style>
