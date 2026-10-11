'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { LogoMark } from '@/components/logo-mark'
import { buttonVariants } from '@/components/ui/button'
import { links, navItems, site } from '@/config/site'
import { isActive } from '@/lib/nav'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-200',
        scrolled ? 'border-border bg-background/90 backdrop-blur-xl' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 rounded-lg sm:gap-2.5">
          <LogoMark />
          <span className="min-w-0 leading-none">
            <strong className="block truncate text-[13px] font-bold tracking-wide text-white sm:text-sm">{site.name}</strong>
            <small className="mt-1 hidden text-[10px] font-medium tracking-[0.18em] text-muted-foreground sm:block">{site.tagline}</small>
          </span>
        </Link>

        <nav aria-label="Menu utama" className="hidden items-center gap-1 md:flex">
          {navItems.map(({ label, href }) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:text-white active:scale-[0.97]',
                  'after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-cyan-accent after:transition-transform after:duration-300',
                  active ? 'text-white after:scale-x-100' : 'text-muted-foreground after:scale-x-0',
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <a
          href={links.admin}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat admin via WhatsApp"
          className={cn(buttonVariants({ size: 'lg' }), 'h-10 shrink-0 gap-2 px-3.5 text-[13px] hover:bg-primary/85 sm:px-4')}
        >
          <MessageCircle className="size-4" />
          Admin
        </a>
      </div>
    </header>
  )
}
