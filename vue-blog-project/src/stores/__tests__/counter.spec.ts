import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../counter'

describe('useCounterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with count = 0 and doubleCount = 0', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(0)
    expect(counter.doubleCount).toBe(0)
  })

  it('increment() increases count and updates doubleCount', () => {
    const counter = useCounterStore()

    counter.increment()
    expect(counter.count).toBe(1)
    expect(counter.doubleCount).toBe(2)

    counter.increment()
    expect(counter.count).toBe(2)
    expect(counter.doubleCount).toBe(4)
  })
})
