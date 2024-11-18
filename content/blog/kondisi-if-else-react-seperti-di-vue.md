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
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

// Context to manage condition state
const ConditionContext = createContext<{
  isConditionMet: boolean;
  markConditionMet: () => void;
}>({
  isConditionMet: false,
  markConditionMet: () => { },
});

// Provider to manage condition states across components
export const ConditionProvider: React.FC<{ children: ReactNode, condition: boolean }> = ({ children, condition }) => {
  const [isConditionMet, setIsConditionMet] = useState(false);

  // Reset isConditionMet whenever the children change
  useEffect(() => {
    if (condition) {
      setIsConditionMet(true);
    } else {
      setIsConditionMet(false);
    }
  }, [children, condition]);

  const markConditionMet = () => {
    setIsConditionMet(false);
  };

  return (
    <ConditionContext.Provider value={{ isConditionMet, markConditionMet }}>
      {children}
    </ConditionContext.Provider>
  );
};

// If Component
export const If: React.FC<{ condition: boolean; children: ReactNode }> = ({
  condition,
  children,
}) => {
  const { isConditionMet, markConditionMet } = useContext(ConditionContext);
  if (isConditionMet && condition) {
    markConditionMet(); // Mark condition as met
    return <>{children}</>;
  }

  return null;
};

// ElseIf Component
// export const ElseIf: React.FC<{ condition: boolean; children: ReactNode }> = ({
//   condition,
//   children,
// }) => {
//   const { isConditionMet, markConditionMet } = useContext(ConditionContext);

//   if (!isConditionMet && condition) {
//     markConditionMet(); // Mark condition as met
//     return <>{children}</>;
//   }

//   return null;
// }; 
// depreceted else if

// Else Component
export const Else: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isConditionMet } = useContext(ConditionContext);
  // Render only if no conditions are met
  return isConditionMet ? null : <>{children}</>;
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