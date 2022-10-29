const carousels = document.querySelectorAll('.fakeHeader h1, .fakeHeader h2')
const fadeInTimeline = gsap.timeline()
fadeInTimeline
	.set(carousels, { opacity: 0 })
	.to(carousels, { opacity: 1, delay: 1, stagger: 1, duration: 2 })
carousels.forEach((carousel) => {
	const spanTag = carousel.querySelector('span')
	const spanWidth = spanTag.clientHeight
	for (let i = 0; i < 30; i++) {
		carousel.appendChild(spanTag.cloneNode(true))
	}
	const movementTimeline = gsap.timeline({
		repeat: -1,
	})
	movementTimeline
		.set(carousel, { x: 0 })
		.to(carousel, { x: spanWidth * -1, duration: 6, ease: 'linear' })
})
