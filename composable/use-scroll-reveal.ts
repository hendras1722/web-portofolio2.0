import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  stagger?: number
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once = true,
    stagger = 80,
  } = options

  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  const childVisibilities = ref<boolean[]>([])
  let observer: IntersectionObserver | null = null

  const setupObserver = () => {
    if (!elementRef.value || !process.client) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true

            // Stagger children animations
            const children = entry.target.querySelectorAll('[data-reveal-child]')
            children.forEach((child, index) => {
              setTimeout(() => {
                childVisibilities.value[index] = true
                ;(child as HTMLElement).setAttribute('data-revealed', 'true')
              }, index * stagger)
            })

            if (once && observer) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            isVisible.value = false
            childVisibilities.value = childVisibilities.value.map(() => false)
            const children = entry.target.querySelectorAll('[data-reveal-child]')
            children.forEach((child) => {
              (child as HTMLElement).removeAttribute('data-revealed')
            })
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(elementRef.value)
  }

  onMounted(() => {
    setupObserver()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    elementRef,
    isVisible,
    childVisibilities,
  }
}

/**
 * Composable for tracking the active section in viewport for navigation highlighting
 */
export function useActiveSection(sectionIds: string[]) {
  const activeSection = ref('')

  onMounted(() => {
    if (!process.client) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    onUnmounted(() => observer.disconnect())
  })

  return { activeSection }
}

/**
 * Smooth scroll progress indicator
 */
export function useScrollProgress() {
  const progress = ref(0)

  const onScroll = () => {
    if (!process.client) return
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    progress.value = docHeight > 0 ? scrollTop / docHeight : 0
  }

  onMounted(() => {
    if (!process.client) return
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onUnmounted(() => {
    if (!process.client) return
    window.removeEventListener('scroll', onScroll)
  })

  return { progress }
}
