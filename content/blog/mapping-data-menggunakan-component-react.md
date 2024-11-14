---
title: 'Mapping data menggunakan component react'
description: 'React'
date: '2024-11-14'
---

## Mapping component di react
Dalam mappingan data dalam bentuk array biasanya react masih menggunakan {} untuk me-looping data dalam hal ini menjadi kurang nyaman dilihat. dan ketika saya melihat di vue me-looping data menggunakan v-for nampaknya sedikit menarik dan enak diliat di htmlnya. langsung saja codenya

before
```tsx
<div>
  {data.map(item => <span>{item.name}</span>)}
</div>

```

```tsx [ListItem.tsx]
import { Children } from 'react'

interface ListItemProps<T> {
  of: T[]
  render: (item: T, index: number) => React.ReactNode
}

export default function ListItem<T>({ of, render }: ListItemProps<T>) {
  return Children.toArray(of.map((item, index) => render(item, index)))
}

```
```tsx [using.tsx]
//cara pakainya
<div>
    <ListItem of={dataArray} render={(item) => (
      <span>{item.name}</span>
    )} />
</div>
```
