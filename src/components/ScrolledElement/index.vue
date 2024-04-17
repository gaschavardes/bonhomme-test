<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="scrolledElement" :style="`height: ${items.length * 100}vh`">
		<div class="stickyEl">
			<div class="container" v-for="(item, key) in items" :key="key" ref="item" :style="`z-index: ${items.length - key}`">
				<div class="content">
					<h2 class="content-title">{{ item.title }}</h2> <span class="content-rate">{{ item.rate }}</span>
					<p class="content-summary">{{ item.summary }}</p>
					<p class="content-label">{{ item.label }}</p>
				</div>
				<div class="image" >
					<img :src="item.img" alt="">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import gsap from 'gsap'

import image1 from '@/assets/images/sticky-1-monster.jpg'
import image2 from '@/assets/images/sticky-3-anatomy.jpg'
import image3 from '@/assets/images/sticky-3-past.jpg'
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
				label:'our pick of the month',
				img: image1,
				color: 'burgundy'
			},
			{
				title: 'Anatomy of a fall',
				rate: '8.2/10',
				summary: "A woman is suspected of her husband's murder, and their blind son faces a moral dilemma as the sole witness.",
				label:'our pick of the month',
				img: image2,
				color: 'blue'
			},
			{
				title: 'Past lives',
				rate: '8.4/10',
				summary: "Nora and Hae Sung, two childhood friends, are reunited in New York for one fateful week as they confront notions of destiny, love, and the choices that make a life",
				label:'our pick of the month',
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
  },
  methods: {
	initTimeline() {
		this.$refs.item.forEach((element) => {
			element.text = element.querySelector('.content')
			element.image = element.querySelector('.image')
		})
		this.timeline = gsap.timeline({
			scrollTrigger: {
				trigger: this.$el,
				start: "top top", // when the top of the trigger hits the top of the viewport
				end: "bottom bottom", // end after scrolling 500px beyond the start
				scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
			}
		})
		this.$refs.item.forEach((element, id) => {
			gsap.set(element.text, { x: 0.9 * id * window.innerWidth + 'px' })
			gsap.set(element.image, { y: 40 * id + 'px', x:  25 * id + 'px', rotation: 5 * (this.$refs.item.length - id - 1) })
		})

		this.$refs.item.forEach((element, id) => {

			this.timeline.addLabel(`block-${id}`, '+=0.5')
			if(id > 0 && this.$refs.item[id + 1]) {
				this.timeline.to(this.$refs.item[id + 1].text, { x: '90vw'}, `block-${id}-=1`)
			}
			this.timeline.to(element.text, { x: '-50vw'}, `block-${id}`)
			.to(element.image, { y: '-=50vw', rotation: '+=25'}, `block-${id}`)
			if(this.$refs.item[id + 1]) {
				this.timeline.to(this.$refs.item[id + 1].text, { x: '0vw'}, `block-${id}`)
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