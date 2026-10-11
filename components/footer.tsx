import { ArrowUp } from 'lucide-react'
import { LogoMark } from '@/components/logo-mark'
import { admin, channel, group } from '@/lib/site'

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Semua Layanan', href: '#layanan' },
  { label: 'Sewa Bot', href: '#sewa-bot' },
  { label: 'SC & Script', href: '#ourin' },
  { label: 'Nomor Virtual', href: '#nomor-virtual' },
  { label: 'Kontak', href: '#kontak' },
]

const communityLinks = [
  { label: 'WhatsApp Group', href: group },
  { label: 'Saluran WhatsApp', href: channel },
  { label: 'Chat Admin', href: admin },
]

const linkClass = 'block w-fit py-2 transition-colors hover:text-white'

export function Footer() {
  return (
    // pb-20 di mobile: memberi ruang agar baris terakhir tidak tertutup tombol WhatsApp
    <footer className="border-t border-white/10 px-5 pb-20 pt-12 lg:px-8 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <a href="#beranda" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="leading-none">
              <strong className="block text-sm font-bold tracking-wide text-white">ANDRI OFFICIAL</strong>
              <small className="mt-1 block text-[10px] font-medium tracking-[0.18em] text-muted-foreground">DIGITAL & KREATIF</small>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">Solusi digital dan kreatif untuk berbagai kebutuhan online.</p>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Navigasi</h3>
          <div className="text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className={linkClass}>{l.label}</a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Komunitas</h3>
          <div className="text-sm text-muted-foreground">
            {communityLinks.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={linkClass}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-muted-foreground">
        <p>© 2026 ANDRI OFFICIAL. Semua hak dilindungi.</p>
        <a href="#beranda" className="inline-flex min-h-11 items-center gap-1.5 rounded-lg pr-1 font-medium transition-colors hover:text-white">
          <ArrowUp className="size-4" /> Kembali ke atas
        </a>
      </div>
    </footer>
  )
}
