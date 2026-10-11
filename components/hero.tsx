import { ArrowUpRight, Bot, Code2, Globe2, MessageCircle, Palette, Server, TrendingUp } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { admin } from '@/lib/site'
import { cn } from '@/lib/utils'

const showcase = [
  { icon: Bot, name: 'Bot', desc: 'Jadi bot & sewa bot', meta: 'Mulai Rp2.000', href: '#bot' },
  { icon: Code2, name: 'Script', desc: 'SC Ourin & rename script', meta: 'Mulai Rp15.000', href: '#ourin' },
  { icon: Globe2, name: 'Nomor Virtual', desc: 'Nomor luar negeri', meta: '16 negara', href: '#nomor-virtual' },
  { icon: TrendingUp, name: 'Sosial Media', desc: 'Instagram, TikTok, YouTube', meta: 'Tanya admin', href: '#sosial-media' },
  { icon: Palette, name: 'Kreatif', desc: 'Edit foto, video, poster', meta: 'Tanya admin', href: '#kreatif' },
  { icon: Server, name: 'Digital', desc: 'Panel, APK premium, JPM', meta: 'Tanya admin', href: '#digital' },
]

const stats = [
  ['Rp2.000', 'Mulai dari'],
  ['1500+', 'Fitur bot'],
  ['24 Jam', 'Dukungan'],
]

export function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="duration-700 animate-in fade-in slide-in-from-bottom-3 motion-reduce:animate-none">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-cyan-accent" />
            Digital & Kreatif Store
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Layanan digital lengkap,{' '}
            <span className="text-cyan-accent">pesan lewat satu chat.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Bot, script, nomor virtual, sosial media, sampai jasa desain ada dalam satu katalog.
            Pilih layanannya, lalu konfirmasi langsung ke admin lewat WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#layanan"
              className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-5 text-sm hover:bg-primary/85')}
            >
              Lihat Katalog
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={admin}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 px-5 text-sm')}
            >
              <MessageCircle className="size-4" />
              Chat Admin
            </a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {stats.map(([value, label]) => (
              <div key={label}>
                <p className="text-xl font-bold text-white sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="duration-700 animate-in fade-in slide-in-from-bottom-4 motion-reduce:animate-none">
          <div className="rounded-2xl border border-border bg-card/80 p-3 backdrop-blur sm:p-4">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Katalog layanan
              </p>
              <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-cyan-accent">
                {showcase.length} kategori
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-2.5">
              {showcase.map(({ icon: Icon, name, desc, meta, href }, i) => (
                <li key={name}>
                  <a
                    href={href}
                    style={{ animationDelay: `${150 + i * 70}ms` }}
                    className="group flex h-full flex-col rounded-xl border border-border bg-background/60 p-3.5 transition duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards hover:-translate-y-0.5 hover:border-cyan-accent/40 hover:bg-secondary motion-reduce:animate-none"
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-cyan-accent">
                        <Icon className="size-[18px]" />
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-cyan-accent" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-white">{name}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{desc}</p>
                    <p className="mt-3 text-xs font-medium text-cyan-accent">{meta}</p>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#layanan"
              className="mt-3 flex items-center justify-between rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-cyan-accent transition-colors hover:bg-primary/20"
            >
              Lihat semua layanan
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <p className="mt-3 px-1 text-xs text-muted-foreground">
            Stok dan harga terbaru dikonfirmasi langsung oleh admin.
          </p>
        </div>
      </div>
    </section>
  )
}
