import { MessageCircle } from 'lucide-react'
import { admin } from '@/lib/site'

// Satu tombol WhatsApp yang compact. z-30 supaya overlay menu navbar (z-40) menutupinya.
export function FloatingWhatsApp() {
  return (
    <a
      href={admin}
      target="_blank"
      rel="noreferrer"
      aria-label="Hubungi admin via WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 grid size-12 place-items-center rounded-full bg-primary text-white shadow-lg shadow-black/40 transition duration-200 hover:scale-105 hover:bg-primary/90 active:scale-95"
    >
      <MessageCircle className="size-5" />
    </a>
  )
}
