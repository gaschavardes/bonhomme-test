<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="landing-component">
		<figure ref="figure">
			<img :src="image" alt="">
		</figure>
		<div class="content">
			<p class="subtitle">{{ subtitle }}</p>
			<h1 v-html="title"></h1>
		</div>
	</div>
</template>
<script>
	import MainImage from '@/assets/images/hero.jpg'
	import gsap from 'gsap'
	import ScrollTrigger from 'gsap/ScrollTrigger'

	gsap.registerPlugin(ScrollTrigger)
	export default {
		name: 'Basic-comp',
		components: {
		},
		props: {
			data: Object
		},
		data () {
			return {
				title: "Spider-man : across </br> the spider-verse",
				subtitle: "New Arrival",
				image: MainImage
			}
		},
		created () {
		},
		mounted () {
			this.initScrollTrigger()
		},
		methods: {
			initScrollTrigger() {
				console.log(this.$el)
				this.scrollTrigger = ScrollTrigger.create({
					trigger: this.$el, 
					start: "top top",
					end: "bottom top",
					onUpdate: () => {
						const val = this.scrollTrigger.progress * 100 + 'px'
						this.$refs.figure.style.transform = `translate3D(0, ${val}, 0)`
					}
				})
			}
		}
	}
</script>
<style lang="less">
	@import '../../assets/less/_imports.less';
	@import "./style.less";
</style>