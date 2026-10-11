import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import { LogoMark } from '@/components/logo-mark'
import { community, footerLinks, site } from '@/config/site'

const linkClass = 'block w-fit py-2 transition-colors hover:text-white'

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-12 md:pb-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="leading-none">
              <strong className="block text-sm font-bold tracking-wide text-white">{site.name}</strong>
              <small className="mt-1 block text-[10px] font-medium tracking-[0.18em] text-muted-foreground">{site.tagline}</small>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">{site.about}</p>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Navigasi</h2>
          <div className="text-sm text-muted-foreground">
            {footerLinks.map((l) => (
              <Link key={l.label} href={l.href} className={linkClass}>{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Komunitas</h2>
          <div className="text-sm text-muted-foreground">
            {community.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={linkClass}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-muted-foreground">
        <p>© {site.year} {site.name}. Semua hak dilindungi.</p>
        <a href="#beranda" className="inline-flex min-h-11 items-center gap-1.5 rounded-lg pr-1 font-medium transition-colors hover:text-white">
          <ArrowUp className="size-4" /> Kembali ke atas
        </a>
      </div>
    </footer>
  )
}
