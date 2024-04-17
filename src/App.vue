<template>
	<Landing />
	<Caroussel />
</template>

<script>
import Landing from './components/Landing'
import Caroussel from './components/Caroussel'
export default {
  name: 'App',
  components: {
	Landing,
	Caroussel
  }
}
</script>

<style lang="less">
@import '@/assets/less/_imports.less';
#app {
	font-family: NewsCycle;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
