---
title: 'rewrite api menggunakan next 14'
description: 'Next'
date: '2024-11-15'
---

## Settings next config mjs

```next [next.config.mjs]
/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
    return [
      {
        source: '/js-holder/:path*',
        destination: 'https://jsonplaceholder.typicode.com/:path*'
      }
    ]
  },
};

export default nextConfig;
```

```env
NEXT_PUBLIC_URL=http://localhost:3000
```

```fetching [app.tsx]
 try {
    const response = await fetch(process.env.NEXT_PUBLIC_URL + '/js-holder/todos/1');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Parse JSON response
    return { data }
  } catch (error) {
    console.error('Error fetching data:', error);
 }
```