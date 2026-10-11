import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { OrderCta } from '@/components/order-cta'
import { buttonVariants } from '@/components/ui/button'
import { community } from '@/config/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Komunitas' }

export default function CommunityPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-24 sm:pb-16 sm:pt-28 lg:px-8">
        <div className="fade-up mb-8 max-w-2xl sm:mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-accent">TERHUBUNG DENGAN KAMI</p>
          <h1 className="text-balance text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">📱 GABUNG KOMUNITAS ANDRI OFFICIAL</h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {community.map(({ name, desc, href, cta, icon: Icon }, i) => (
            <div
              key={name}
              style={{ animationDelay: `${60 + i * 50}ms` }}
              className="fade-up flex flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-primary/60 sm:p-6"
            >
              <Icon className="text-primary" />
              <h2 className="mt-6 font-bold text-white sm:mt-8">{name}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{desc}</p>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: 'lg' }), 'mt-5 h-11 w-fit rounded-xl px-5 text-sm font-bold hover:bg-primary/85 sm:mt-6')}
              >
                {cta} <ArrowUpRight />
              </a>
            </div>
          ))}
        </div>
      </section>
      <OrderCta />
    </>
  )
}
