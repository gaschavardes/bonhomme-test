<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="footer-component">
		<figure ref="figure">
			<img :src="image" alt="">
		</figure>
		<div class="content" ref="content">
			<p class="subtitle">{{ subtitle }}</p>
			<h2 v-html="title"></h2>
			<button class="cta">{{ button }}</button>
		</div>
	</div>
</template>
<script>
	import MainImage from '@/assets/images/push.jpg'
	import gsap from 'gsap'
	import ScrollTrigger from 'gsap/ScrollTrigger'

	gsap.registerPlugin(ScrollTrigger)
	export default {
		name: 'footer-comp',
		components: {
		},
		props: {
			data: Object
		},
		data () {
			return {
				title: "Le cinema de </br> Denis Villeneuve",
				subtitle: "Collection",
				button: "Découvrir",
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
				this.contentAnim = gsap.from(this.$refs.content, { opacity: 0., y: 100, paused: true})
				this.scrollTrigger = ScrollTrigger.create({
					trigger: this.$el, 
					start: "top bottom",
					end: "top top",
					onUpdate: () => {
						const val = -100 + this.scrollTrigger.progress * 100 + 'px'
						this.$refs.figure.style.transform = `translate3D(0, ${val}, 0)`
						this.contentAnim.progress(this.scrollTrigger.progress * 2 - 1)
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