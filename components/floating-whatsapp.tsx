import { MessageCircle } from 'lucide-react'
import { links } from '@/config/site'

export function FloatingWhatsApp() {
  return (
    <a
      href={links.admin}
      target="_blank"
      rel="noreferrer"
      aria-label="Hubungi admin via WhatsApp"
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 grid size-12 place-items-center rounded-full bg-primary text-white shadow-lg shadow-black/40 transition duration-200 hover:scale-105 hover:bg-primary/90 active:scale-95 md:bottom-6"
    >
      <MessageCircle className="size-5" />
    </a>
  )
}
