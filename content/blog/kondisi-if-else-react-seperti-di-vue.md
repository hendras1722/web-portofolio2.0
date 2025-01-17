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
'use client'

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'

// Context to manage condition state
const ConditionContext = createContext<{
  isConditionMet: boolean
  setIsConditionMet: (value: boolean) => void
}>({
  isConditionMet: false,
  setIsConditionMet: () => {},
})

// Provider to manage condition states across components
export const ConditionProvider: React.FC<{
  children: ReactNode
  initialCondition?: boolean
}> = ({ children, initialCondition = false }) => {
  const [isConditionMet, setIsConditionMet] = useState(initialCondition)

  return (
    <ConditionContext.Provider value={{ isConditionMet, setIsConditionMet }}>
      {children}
    </ConditionContext.Provider>
  )
}

// If Component
export const If: React.FC<{ condition: boolean; children: ReactNode }> = ({
  condition,
  children,
}) => {
  const { setIsConditionMet } = useContext(ConditionContext)

  useEffect(() => {
    setIsConditionMet(condition)
  }, [condition, setIsConditionMet])

  if (condition) {
    return <>{children}</>
  }

  return null
}

// Else Component
export const Else: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isConditionMet } = useContext(ConditionContext)
  return !isConditionMet ? <>{children}</> : null
}
```

```react [app.tsx]
 <ConditionProvider initialCondition={theme === 'light'}>
        <If condition={theme === 'light'}>
          <button onClick={() => handleMode()}>
            <FaSun />
          </button>
        </If>
        <Else>
          <button onClick={() => handleMode()}>
            <FaMoon />
          </button>
        </Else>
      </ConditionProvider>
```
