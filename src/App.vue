<template>
	<Landing />
	<Caroussel />
	<ScrolledElement/>
	<Footer />
</template>

<script>
import Landing from './components/Landing'
import Caroussel from './components/Caroussel'
import ScrolledElement from './components/ScrolledElement'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
	Landing,
	Caroussel,
	ScrolledElement,
	Footer
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
body{
	overscroll-behavior: none;

}
</style>
