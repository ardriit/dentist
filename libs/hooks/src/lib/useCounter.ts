'use client'

import { useState } from 'react'

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState<number>(initialValue)

  const increment = () => setCount((prevCount) => prevCount + 1)
  const decrement = () => setCount((prevCount) => prevCount - 1)
  const reset = () => setCount(initialValue)

  return {
    count,
    increment,
    decrement,
    reset,
  }
}
//generated hook
