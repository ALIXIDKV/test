'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { resolveAnchor } from '@/lib/products'

const pages: Record<string, string> = { layanan: '/produk', kontak: '/komunitas' }

// Tautan lama versi satu halaman (/#sewa-bot, /#layanan, /#kontak) diarahkan ke halaman barunya
export function LegacyHashRedirect() {
  const router = useRouter()

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (pages[id]) router.replace(pages[id])
    else if (resolveAnchor(id)) router.replace(`/produk#${id}`)
  }, [router])

  return null
}
