---
title: 'Kondisi if else react seperti di vue'
description: 'react'
date: '2024-11-14'
---

## Component react
Dalam pembuatan kondisi react menggunakan {} langsung dari html. dalam hal ini membaut tidak rapi dalam penulisan kode, 3 tahun saya di developer vue melihat struktur htmlnya sangat baik menurut saya. Dalam hal ini saya ingin mengimplementasi di react.

### Code Vue
```vue
<div v-if="active">
    <h1>hello active</h1>
</div>
<div v-else>
  <h1>hello inactive</h1>
</div>
```

Berikut code untuk di react:

```react [IfComponent.tsx]
import React, { ReactNode, createContext, useContext } from 'react';

const ConditionContext = createContext({ shouldRender: true });

interface IfProps {
  condition: boolean;
  children: ReactNode;
}

export const If: React.FC<IfProps> = ({ condition, children }) => {
  return (
    <ConditionContext.Provider value={{ shouldRender: condition }}>
      {condition ? children : null}
    </ConditionContext.Provider>
  );
};

interface ElseIfProps {
  condition: boolean;
  children: ReactNode;
}

export const ElseIf: React.FC<ElseIfProps> = ({ condition, children }) => {
  const { shouldRender } = useContext(ConditionContext);

  return (
    <ConditionContext.Provider value={{ shouldRender: shouldRender && !condition }}>
      {shouldRender && condition ? children : null}
    </ConditionContext.Provider>
  );
};

interface ElseProps {
  children: ReactNode;
}

export const Else: React.FC<ElseProps> = ({ children }) => {
  const { shouldRender } = useContext(ConditionContext);

  return shouldRender ? children : null;
};
```

```react [app.tsx]
   <If condition={isActived}>
      <div>
        <h1>Hello Active</h1>
      </div>
   </if>
   <Else>
      <div>
        <h1>Hello Inactive</h1>
      </div>
   </Else>
```