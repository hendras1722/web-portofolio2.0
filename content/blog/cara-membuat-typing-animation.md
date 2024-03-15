---
title: 'Cara Bembuat Typing Animation'
description: 'Vue'
date: '2023-12-22'
---

<!-- Content of the page -->

[![N|Solid](https://res.cloudinary.com/practicaldev/image/fetch/s--Ccq57Hyl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xbeyh1fwkc3p8jcjs52o.gif)](typing)

Cara membuat typing animation di vue 3. Typing animation biasanya untuk tampilan halaman yang mempunyai kata yang banyak dan dibuat lebih ringkas.

## Membuat halaman Template

```js [app.vue]{4-6,7} meta-info=val
<template>
  <div class="container">
    <h1>
      Hi, I'm a
      <span class="typed-text">{{ typeValue }}</span>
      <span class="blinking-cursor">|</span>
      <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
    </h1>
  </div>
</template>
```

Setelah itu buat css nya.

```js [app.vue]{4-6,7} meta-info=val
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 6rem;
  font-weight: normal;
  span.typed-text {
    color: #d2b94b;
  }
}

// Cursor blinking CSS Starts...
.blinking-cursor {
  font-size: 6rem;
  color: #2c3e50;
  -webkit-animation: 1s blink step-end infinite;
  -moz-animation: 1s blink step-end infinite;
  -ms-animation: 1s blink step-end infinite;
  -o-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;
}
@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #2c3e50;
  }
}
@-moz-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #2c3e50;
  }
}
@-webkit-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #2c3e50;
  }
}
@-ms-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #2c3e50;
  }
}
@-o-keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: #2c3e50;
  }
}
// Cursor blinking CSS Ends...
</style>
```

Jika sudah buat script codenya

```js [app.vue]{4-6,7} meta-info=val
const typeValue = ref('')
const displayTextArray = ref([
  'YouTuber',
  'Developer',
  'Blogger',
  'Designer',
  'Freelancer',
])
const displayTextArrayIndex = ref(0)
const charIndex = ref(0)
const typeStatus = ref(false)
const newTextDelay = ref(2000)
const erasingSpeed = ref(100)
const typingSpeed = 100

function typeText() {
  if (
    charIndex.value < displayTextArray.value[displayTextArrayIndex.value].length
  ) {
    if (!typeStatus.value) typeStatus.value = true
    typeValue.value += displayTextArray.value[
      displayTextArrayIndex.value
    ].charAt(charIndex.value)
    charIndex.value += 1
    setTimeout(typeTextTitle, typingSpeed)
  } else {
    this.typeStatus = false
    setTimeout(eraseText(), newTextDelay.value)
  }
}

function eraseText() {
  if (charIndex.value > 0) {
    if (!typeStatus.value) typeStatus.value = true
    typeValue.value = displayTextArray.value[
      displayTextArrayIndex.value
    ].substring(0, charIndex.value - 1)
    charIndex.value -= 1
    setTimeout(eraseText(), erasingSpeed.value)
  } else {
    typeStatus.value = false
    displayTextArrayIndex.value += 1
    if (displayTextArrayIndex.value >= displayTextArray.value.length)
      displayTextArrayIndex.value = 0
    setTimeout(typeText(), typingSpeed.value + 1000)
  }
}
```

Sekian dan terima kasih.
