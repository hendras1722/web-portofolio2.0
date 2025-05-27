---
title: 'Function untuk menghapus duplicate data'
description: 'Javascript'
date: '2025-05-28'
---

## Mapping component di react
Function untuk menghapus sebuah array data yang ada duplicate data (datanya sama persis bukan id yang sama)
```ts
function deleteDuplicateData(data) {
  const seen = new Set();
  const uniqueData = [];

  for (const item of data) {
    const itemString = JSON.stringify(item);

    if (!seen.has(itemString)) {
      seen.add(itemString);
      uniqueData.push(item);
    }
  }

  return uniqueData;
}
```

