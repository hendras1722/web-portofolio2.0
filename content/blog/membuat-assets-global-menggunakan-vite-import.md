---
title: 'Mapping data menggunakan component react'
description: 'React'
date: '2025-05-27'
---

## Mapping component di react
Membuat Assets import biasanya menggunakan import NamaFile from '@/assets/NamaFile'. nah kali ini saya buatkan function buat global function Assets

```ts
/**
 * importing asset dynamically using variables
 * @param {string} path path of asset that will be imported without prefix /assets/
 * @example <img :src="useAsset(dynamic_image_name + '.svg')" alt="Discover Nuxt 3" />
 * @return imported file
 */
export default function useAsset (path: string): string {
  const assets = import.meta.glob(['~/assets/**/*', '!~/assets/css/**/*'], {
    eager : true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets[`/assets/${path}`]
}
```

penggunannya cukup begini
```vue
 <img :src="useAsset('/me.jpg')" class=" w-[200px] h-[200px] object-cover rounded-full" alt="me" />
```

```react
 <img src={useAsset('/me.jpg')} class=" w-[200px] h-[200px] object-cover rounded-full" alt="me" />
```

