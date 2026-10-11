import type { ReactNode } from 'react'
import { ArrowUpRight, MessageCircle, Send, Sparkles, Users } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { admin, channel, group } from '@/lib/site'
import { cn } from '@/lib/utils'

const channels = [
  { name: 'WHATSAPP GROUP', desc: 'Gabung grup komunitas Andri Official.', href: group, cta: 'GABUNG GRUP', icon: Users },
  { name: 'SALURAN WHATSAPP', desc: 'Ikuti informasi dan update terbaru Andri Official.', href: channel, cta: 'IKUTI SALURAN', icon: Send },
  { name: 'ADMIN ANDRI OFFICIAL', desc: 'Hubungi admin untuk melakukan pemesanan dan mengecek ketersediaan.', href: admin, cta: 'CHAT ADMIN', icon: MessageCircle },
]

function Action({ href = admin, children }: { href?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-xl px-5 text-sm font-bold hover:bg-primary/85')}
    >
      {children}
    </a>
  )
}

export function Contact() {
  return (
    <section id="kontak" className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
      <div className="mb-8 max-w-2xl sm:mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">TERHUBUNG DENGAN KAMI</p>
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">📱 GABUNG KOMUNITAS ANDRI OFFICIAL</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {channels.map(({ name, desc, href, cta, icon: Icon }) => (
          <div
            key={name}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-primary/60 sm:p-6"
          >
            <Icon className="text-primary" />
            <h3 className="mt-6 font-bold text-white sm:mt-8">{name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground md:min-h-12">{desc}</p>
            <div className="mt-5 sm:mt-6">
              <Action href={href}>
                {cta} <ArrowUpRight />
              </Action>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function OrderCta() {
  return (
    <section className="px-5 pb-16 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center sm:p-8 md:p-14">
        <Sparkles className="mx-auto mb-5 text-primary" />
        <h2 className="text-2xl font-black text-white sm:text-3xl md:text-5xl">SIAP MELAKUKAN PEMESANAN?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Hubungi admin untuk mengecek stok, harga, dan detail layanan terbaru.</p>
        <div className="mt-8">
          <Action>
            CHAT ADMIN SEKARANG <ArrowUpRight />
          </Action>
        </div>
      </div>
    </section>
  )
}
