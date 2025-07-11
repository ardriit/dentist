'use client'

import { useState, useCallback } from 'react'

export function useBoolean(initialValue = false) {
  const [value, setValue] = useState<boolean>(initialValue)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((prev) => !prev), [])

  return { value, setValue, setTrue, setFalse, toggle }
}
