import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Keep scrub animations from thrashing on mobile address-bar resize.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }