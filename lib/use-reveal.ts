import { useEffect, useRef } from 'react'

// Menandai elemen dengan data-visible saat masuk viewport (sekali saja).
// Animasinya sendiri ada di CSS (.reveal), jadi tidak ada library tambahan.
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.dataset.visible = ''
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.visible = ''
        observer.disconnect()
      },
      { rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
