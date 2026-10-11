import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { infoLinks, site } from '@/config/site'
import { cn } from '@/lib/utils'

export function StoreInfo() {
  return (
    <section className="border-y border-white/[0.08] bg-white/[0.015] px-5 py-12 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="text-balance text-2xl font-black tracking-tight text-white sm:text-3xl">Tentang {site.name}</h2>
          <p className="mt-3 max-w-xl leading-7 text-muted-foreground">{site.description}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/produk" className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-5 text-sm font-bold hover:bg-primary/85')}>
              Lihat Semua Produk <ArrowUpRight className="size-4" />
            </Link>
            <Link href="/komunitas" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 px-5 text-sm font-bold')}>
              Gabung Komunitas
            </Link>
          </div>
        </div>

        <ul className="grid content-start gap-2.5">
          {infoLinks.map(({ label, desc, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex min-h-14 items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition duration-200 hover:border-primary/60 active:scale-[0.99]"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">{label}</span>
                  <span className="block text-[13px] text-muted-foreground">{desc}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition duration-200 group-hover:text-cyan-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
