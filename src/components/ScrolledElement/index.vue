<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="scrolledElement" :style="`height: ${items.length * 100}vh`">
		<div class="stickyEl" ref="sticky">
			<div class="backgrounds" v-for="(item, key) in items" :key="key" :class="item.color" ref="backgrounds"></div>
			<div class="content-container">
				<div class="content container" v-for="(item, key) in items" :key="key" ref="content">
				<h2 class="content-title">{{ item.title }}</h2> <span class="content-rate">{{ item.rate }}</span>
				<p class="content-summary">{{ item.summary }}</p>
				<p class="content-label">{{ item.label }}</p>
			</div>
			</div>
		
			<div class="imageContainer" ref="imageContainer">
				<div class="image" v-for="(item, key) in items" :key="key" ref="image" :style="`z-index: ${items.length - key}`">
					<img :src="item.img" alt="">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import image1 from '@/assets/images/sticky-1-monster.jpg'
import image2 from '@/assets/images/sticky-3-anatomy.jpg'
import image3 from '@/assets/images/sticky-3-past.jpg'

gsap.registerPlugin(ScrollTrigger)
export default {
  name: 'Scrolled-comp',
  components: {},
  props: {
    data: Object
  },
  data () {
    return {
		items: [
			{
				title: 'Monster',
				rate: '8.6/10',
				summary: "When her young son Minato starts to behave strangely, his mother feels that there is something wrong. Discovering that a teacher is responsible, she storms into the school demanding to know what's going on. But as the story unfolds through the eyes of mother, teacher and child, the truth gradually emerges." ,
				label:' ☆ our pick of the month',
				img: image1,
				color: 'burgundy'
			},
			{
				title: 'Anatomy of a fall',
				rate: '8.2/10',
				summary: "A woman is suspected of her husband's murder, and their blind son faces a moral dilemma as the sole witness.",
				label:' ☆ our pick of the month',
				img: image2,
				color: 'blue'
			},
			{
				title: 'Past lives',
				rate: '8.4/10',
				summary: "Nora and Hae Sung, two childhood friends, are reunited in New York for one fateful week as they confront notions of destiny, love, and the choices that make a life",
				label:' ☆ our pick of the month',
				img: image3,
				color: 'brown'
			},
		]
	}
  },
  created () {

  },
  mounted () {
	this.initTimeline()
	this.initScrollTrigger()
  },
  methods: {
	initScrollTrigger() {
		this.contentAnim = gsap.from(this.$refs.content, { opacity: 0., y: 100, paused: true})
		this.imageAnim = gsap.from(this.$refs.imageContainer, { rotation: -20, y: 100, paused: true})
		this.mainScrollTrigger = ScrollTrigger.create({
			trigger: this.$refs.sticky, 
			start: "top bottom",
			end: "top top",
			onUpdate: () => {
				this.contentAnim.progress(this.mainScrollTrigger.progress * 2 - 0.9)
				this.imageAnim.progress(this.mainScrollTrigger.progress * 2 - 0.9)
			}
		})
	},

	initTimeline() {
		this.items.forEach((element, id) => {
			element.text = this.$refs.content[id]
			element.image = this.$refs.image[id]
		})
		this.timeline = gsap.timeline({
			scrollTrigger: {
				trigger: this.$el,
				start: "top top", // when the top of the trigger hits the top of the viewport
				end: "bottom bottom", // end after scrolling 500px beyond the start
				scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
			}
		})

		this.items.forEach((element, id) => {
			gsap.set(element.text, { x: 90 * id + '%', opacity: 1 - id * 0.5})
			gsap.set(element.image, { y: 50 * id + 'px', x:  40 * id + 'px', rotation: 2 * (this.items.length - id - 1), scale: 1 - id * 0.05 })
		})

		this.$refs.backgrounds.forEach((el, i) => {
			if(i !== 0) {
				gsap.set(el, { scale: 0})
			} else {
				gsap.set(el, { scale: 2})
			}
		})

		this.items.forEach((element, id) => {
			this.timeline.addLabel(`block-${id}`, '+=0.25')
			if(id > 0 && this.items[id + 1]) {
				this.timeline.to(this.items[id + 1].text, { x: '90%', opacity: 0.5}, `block-${id}-=0.75`)
				this.timeline.to(this.items[id + 1].image, { y: 50, x: 40, rotation: 2, scale: 1 - 0.05}, `block-${id}-=0.75`)
			}
			if(this.items[id + 1]) {
				this.timeline.to(element.text, { x: '-50vw'}, `block-${id}`)
				.to(element.image, { y: '-=100vh', rotation: '+=25'}, `block-${id}`)
				this.timeline.to(this.items[id + 1].text, { x: '0%', opacity: 1}, `block-${id}`)
				this.timeline.to(this.items[id + 1].image, { x: '0', y: 0, rotation: 4, scale: 1}, `block-${id}`)
				this.timeline.to(this.$refs.backgrounds[id + 1], { scale: 2}, `block-${id}`)
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