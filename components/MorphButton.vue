<template>
  <div class="hover-button" @mouseenter="onEnter" @mouseleave="onLeave" :style="rootStyle">
    <div class="hover-button__bg" ref="bg" :style="bgStyle"></div>
    <div class="hover-button__label" :style="labelStyle">
      <slot>Hover Me</slot>
    </div>
    <span v-if="badge" class="hover-button__badge" :style="badgeStyle">{{ badge }}</span>
  </div>
</template>

<script>
export default {
  name: 'HoverButton',

  props: {
    /** Badge text top-right (e.g. "01") */
    badge: { type: String, default: '01' },
    /** Accent / bg color */
    accentColor: { type: String, default: '#ee3d3d' },
    /** Label color (before hover) */
    labelColor: { type: String, default: '#ee3d3d' },
    /** Hover animation duration in seconds */
    timing: { type: Number, default: 0.65 },
    /** Skew angle for bg sweep */
    skew: { type: Number, default: -10 },
    /** Horizontal padding */
    paddingX: { type: String, default: '2%' },
  },

  emits: ['click'],

  data() {
    return {
      hovered: false,
      animating: false,
      forceOut: false,
    };
  },

  computed: {
    rootStyle() {
      return { padding: `0 ${this.paddingX}` };
    },
    bgStyle() {
      return {
        backgroundColor: this.accentColor,
        transform: `translateX(-112%) skew(${this.skew}deg)`,
      };
    },
    labelStyle() {
      return { color: this.labelColor };
    },
    badgeStyle() {
      return { color: this.accentColor };
    },
  },

  mounted() {
    this.loadGSAP();
  },

  methods: {
    loadGSAP() {
      return new Promise((resolve) => {
        if (window.TweenMax) return resolve();
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js';
        s.onload = resolve;
        document.head.appendChild(s);
      });
    },

    onEnter() {
      if (!this.hovered) {
        this.hovered = true;
        this.animating = true;
        this.forceOut = false;
        window.TweenMax.fromTo(
          this.$refs.bg,
          this.timing,
          { x: '-112%' },
          {
            x: '-12%',
            ease: window.Power3.easeOut,
            onComplete: () => {
              this.animating = false;
              if (this.forceOut) {
                this.forceOut = false;
                this.animateOut();
              }
            },
          }
        );
      }
    },

    onLeave() {
      if (!this.animating) {
        this.animateOut();
      } else {
        this.forceOut = true;
      }
    },

    animateOut() {
      this.hovered = false;
      window.TweenMax.to(this.$refs.bg, this.timing, {
        x: '100%',
        ease: window.Power3.easeOut,
      });
    },
  },
};
</script>

<style scoped>
.hover-button {
  position: relative;
  display: inline-block;
  z-index: 20;
  overflow: hidden;
  cursor: none;
}

.hover-button__bg {
  pointer-events: none;
  position: absolute;
  height: 100%;
  width: 125%;
  display: block;
  top: 0;
  left: 0;
}

.hover-button__label {
  position: relative;
  z-index: 1;
  mix-blend-mode: difference;
  font-weight: normal;
  font-family: 'Asul', 'Georgia', serif;
  margin: 0;
  font-size: 11vmax;
  line-height: 1;
  user-select: none;
}

.hover-button__badge {
  display: block;
  position: absolute;
  top: 5%;
  right: 3%;
  mix-blend-mode: difference;
  font-family: 'Asul', 'Georgia', serif;
  font-size: 1.2vmax;
  font-weight: bold;
  line-height: 1;
}
</style>