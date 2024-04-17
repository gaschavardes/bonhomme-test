<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="caroussel-component">
		<div class="container">
			<h2>{{ title }}</h2>
			<p class="container-subtitle">{{ subtitle }}</p>
		</div>
		<div class="carrousel">
			<ul ref="list">
				<div id="proxy" ref='proxy'></div>
				<li v-for="(item, key) in items" :key="key" ref="item">
					<figure>
						<img :src="item.image" alt="">
					</figure>
					<div class="carrousel-content">
						<p>{{ item.title }} <span>( {{ item.year }} )</span></p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import store from '@/assets/js/store'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import InertiaPlugin from '@/assets/js/utils/gsap/InertiaPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'

import image1 from '@/assets/images/1.jpg'
import image2 from '@/assets/images/2.jpg'
import image3 from '@/assets/images/3.jpg'
import image4 from '@/assets/images/4.jpg'
import image5 from '@/assets/images/5.jpg'
import image6 from '@/assets/images/6.jpg'
import image7 from '@/assets/images/7.jpg'
import image8 from '@/assets/images/8.jpg'
import image9 from '@/assets/images/9.jpg'
import image10 from '@/assets/images/10.jpg'

gsap.registerPlugin(Draggable)
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(InertiaPlugin)
export default {
  name: 'Caroussel-comp',
  components: {},
  props: {
    data: Object
  },
  data () {
    return {
		title: 'Popular releases',
		subtitle: 'This week\'s top TV and movies',
		items: [
			{
				image: image1,
				title: 'Parasite',
				year: 2020,
			},
			{
				image: image2,
				title: 'Priscilla',
				year: 2024
			},
			{
				image: image3,
				title: 'Dune: Part two',
				year: 2024
			},
			{
				image: image4,
				title: 'poor things',
				year: 2024
			},
			{
				image: image5,
				title: 'All of us strangers',
				year: 2024
			},
			{
				image: image6,
				title: 'American fiction',
				year: 2024
			},
			{
				image: image7,
				title: 'A définir',
				year: 2024
			},
			{
				image: image8,
				title: 'Oppenheimer',
				year: 2024
			},
			{
				image: image9,
				title: 'A définir',
				year: 2024
			},
			{
				image: image10,
				title: 'A définir',
				year: 2024
			}
		]
	}
  },
  created () {
  },
  mounted () {
	let image = new Image()
	image.src = this.items[0].image
	image.onload = () => {
		this.$nextTick(() => {
			this.itemSize = this.$refs.item[0].getBoundingClientRect()
			this.$refs.list.style.height = this.itemSize.height + 'px'
			this.carousselSetup()
		})
	}
	
  },
  methods: {
	carousselSetup() {
		let size = 0
		const gap = 20
		this.$refs.item.forEach((element, i) => {
			console.log(element)
			element.transform = size +  gap * i
			size += this.itemSize.width
		});

		this.fullSize = size + gap * this.$refs.item.length 

		store.RAFCollection.add(this.onRaf, 1)
		this.initScrollTrigger()
		this.initDraggable()
	},

	initScrollTrigger() {
		this.scrollTrigger = ScrollTrigger.create({
			trigger: this.$el, 
			start: "top bottom",
			end: "bottom top",
			onUpdate: () => {
				this.dragUpdate()
			}
		})
	},

	initDraggable() {
		this.drag = Draggable.create(this.$refs.proxy, {
			type: 'x',
			dragClickables: true,
			edgeResistance: 0,
			overshootTolerance: 0,
			trigger: this.$refs.list,
		//   bounds: { minX: this.snaps[this.snaps.length - 1], maxX: 0 },
			inertia: true,
			maxDuration: 3,
			minDuration: 2,
			zIndexBoost: false,
			throwResistance: 999999,
			zIndex: 0,
			dragResistance: 0,
			allowEventDefault: event,
			onThrowUpdate: () => {
				this.dragUpdate()
			},
			onDrag: () => {
				this.dragUpdate()
			},
		})
		this.$nextTick(() => {
			this.dragUpdate()
		})
	},
	dragUpdate() {
		const scrollProgress = this.scrollTrigger.progress || 0
		this.$refs.item.forEach((element) => {
			element.style.transform = `translate3D(${this.mod(element.transform + this.drag[0].x - scrollProgress * 1000,this.fullSize ) - this.itemSize.width * 2 }px, 0, 0)`
		})
	},

	mod (n, m) {
		var remain = n % m;
		return Math.floor(remain >= 0 ? remain : remain + m);
	},
	onRaf() {
		// console.log( this.drag[0].x)
	}
  }
}
</script>
<style lang="less">
@import '../../assets/less/_imports.less';
@import "./style.less";
</style>