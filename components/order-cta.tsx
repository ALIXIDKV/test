import { ArrowUpRight, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { links } from '@/config/site'
import { cn } from '@/lib/utils'

export function OrderCta() {
  return (
    <section className="px-5 pb-12 sm:pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center sm:p-8 md:p-14">
        <Sparkles className="mx-auto mb-5 text-primary" />
        <h2 className="text-2xl font-black text-white sm:text-3xl md:text-5xl">SIAP MELAKUKAN PEMESANAN?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Hubungi admin untuk mengecek stok, harga, dan detail layanan terbaru.</p>
        <div className="mt-8">
          <a
            href={links.admin}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-xl px-5 text-sm font-bold hover:bg-primary/85')}
          >
            CHAT ADMIN SEKARANG <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}
