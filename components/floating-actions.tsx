'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { admin } from '@/lib/site'
import { cn } from '@/lib/utils'

// Dua tombol ditumpuk di kanan bawah. z-30 supaya overlay menu navbar (z-40) menutupinya.
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        aria-label="Kembali ke atas"
        onClick={() => window.scrollTo({ top: 0 })}
        className={cn(
          'grid size-11 place-items-center rounded-full border border-border bg-card/90 text-white shadow-lg shadow-black/30 backdrop-blur transition-[opacity,translate,visibility,border-color,scale] duration-200 hover:border-primary/60 active:scale-95',
          showTop ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0',
        )}
      >
        <ArrowUp className="size-5" />
      </button>

      <a
        href={admin}
        target="_blank"
        rel="noreferrer"
        aria-label="Hubungi Admin via WhatsApp"
        className="grid size-14 place-items-center rounded-full bg-primary text-white shadow-lg shadow-black/40 transition duration-200 hover:scale-105 hover:bg-primary/90 active:scale-95"
      >
        <MessageCircle />
      </a>
    </div>
  )
}
