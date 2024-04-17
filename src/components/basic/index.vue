<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="basic-component"></div>
</template>
<script>
export default {
  name: 'Basic-comp',
  components: {},
  props: {
    data: Object
  },
  data () {
    return {}
  },
  created () {
    // this._props.content.content.forEach((el) => {
    //   if (el.acf_fc_layout === 'text') {
    //     this.stepNumb++
    //     el.index = this.stepNumb
    //   }
    // })
  },
  mounted () {
    this.stepNumb = 0
  },
  methods: {
  }
}
</script>
<style lang="less">
	@import '../../assets/less/_imports.less';
	@import "./style.less";
</style>