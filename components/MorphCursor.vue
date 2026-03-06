<template>
  <div>
    <!-- SVG goo filter -->
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0"
      style="position:absolute;pointer-events:none;">
      <defs>
        <filter id="morph-goo">
          <feGaussianBlur in="SourceGraphic" :stdDeviation="blur" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>

    <!-- Cursor dots -->
    <div ref="cursorEl" class="morph-cursor" :style="cursorStyle">
      <!-- spans injected dynamically -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MorphCursor',

  props: {
    /** Number of trailing dots */
    amount: { type: Number, default: 20 },
    /** Dot diameter in px */
    dotSize: { type: Number, default: 26 },
    /** Dot color */
    dotColor: { type: String, default: '#ffffff' },
    /** Idle timeout in ms before dots float */
    idleTimeout: { type: Number, default: 150 },
    /** Gaussian blur for goo effect */
    blur: { type: Number, default: 6 },
    /** CSS mix-blend-mode */
    blendMode: { type: String, default: 'difference' },
  },

  data() {
    return {
      mousePosition: { x: 0, y: 0 },
      dots: [],
      timeoutID: null,
      idle: false,
      lastFrame: 0,
      rafID: null,
    };
  },

  computed: {
    sineDots() {
      return Math.floor(this.amount * 0.3);
    },
    cursorStyle() {
      return {
        mixBlendMode: this.blendMode,
        filter: 'url(#morph-goo)',
      };
    },
  },

  mounted() {
    this.loadGSAP().then(() => {
      this.buildDots();
      this.lastFrame = performance.now();
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('touchmove', this.onTouchMove, { passive: true });
      this.rafID = requestAnimationFrame(this.render);
    });
  },

  beforeUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    clearTimeout(this.timeoutID);
    cancelAnimationFrame(this.rafID);
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

    buildDots() {
      const cursorEl = this.$refs.cursorEl;
      for (let i = 0; i < this.amount; i++) {
        const scale = 1 - 0.05 * i;
        const range = this.dotSize / 2 - (this.dotSize / 2) * scale + 2;
        const el = document.createElement('span');
        el.style.cssText = `
          position: absolute;
          display: block;
          width: ${this.dotSize}px;
          height: ${this.dotSize}px;
          border-radius: 50%;
          background-color: ${this.dotColor};
          transform-origin: center center;
          transform: translate(-50%, -50%);
        `;
        window.TweenMax.set(el, { scale });
        cursorEl.appendChild(el);
        this.dots.push({
          index: i, anglespeed: 0.05,
          x: 0, y: 0, scale, range,
          lockX: 0, lockY: 0, angleX: 0, angleY: 0,
          element: el,
        });
      }
    },

    lockDot(dot) {
      dot.lockX = dot.x;
      dot.lockY = dot.y;
      dot.angleX = Math.PI * 2 * Math.random();
      dot.angleY = Math.PI * 2 * Math.random();
    },

    drawDot(dot) {
      if (!this.idle || dot.index <= this.sineDots) {
        window.TweenMax.set(dot.element, { x: dot.x, y: dot.y });
      } else {
        dot.angleX += dot.anglespeed;
        dot.angleY += dot.anglespeed;
        dot.y = dot.lockY + Math.sin(dot.angleY) * dot.range;
        dot.x = dot.lockX + Math.sin(dot.angleX) * dot.range;
        window.TweenMax.set(dot.element, { x: dot.x, y: dot.y });
      }
    },

    render(timestamp) {
      this.positionCursor();
      this.lastFrame = timestamp;
      this.rafID = requestAnimationFrame(this.render);
    },

    positionCursor() {
      let x = this.mousePosition.x;
      let y = this.mousePosition.y;
      this.dots.forEach((dot, index) => {
        const next = this.dots[index + 1] || this.dots[0];
        dot.x = x;
        dot.y = y;
        this.drawDot(dot);
        if (!this.idle || index <= this.sineDots) {
          x += (next.x - dot.x) * 0.35;
          y += (next.y - dot.y) * 0.35;
        }
      });
    },

    startIdleTimer() {
      this.timeoutID = setTimeout(this.goInactive, this.idleTimeout);
      this.idle = false;
    },

    resetIdleTimer() {
      clearTimeout(this.timeoutID);
      this.startIdleTimer();
    },

    goInactive() {
      this.idle = true;
      this.dots.forEach(this.lockDot);
    },

    onMouseMove(e) {
      this.mousePosition.x = e.clientX - this.dotSize / 2;
      this.mousePosition.y = e.clientY - this.dotSize / 2;
      this.resetIdleTimer();
    },

    onTouchMove(e) {
      this.mousePosition.x = e.touches[0].clientX - this.dotSize / 2;
      this.mousePosition.y = e.touches[0].clientY - this.dotSize / 2;
      this.resetIdleTimer();
    },
  },
};
</script>

<style scoped>
.morph-cursor {
  pointer-events: none;
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>