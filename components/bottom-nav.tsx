'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/config/site'
import { isActive } from '@/lib/nav'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const pathname = usePathname()
  const current = navItems.findIndex(({ href }) => isActive(pathname, href))

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <nav aria-label="Navigasi utama" className="relative mx-auto grid max-w-lg" style={{ gridTemplateColumns: `repeat(${navItems.length}, 1fr)` }}>
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            current < 0 && 'opacity-0',
          )}
          style={{ width: `${100 / navItems.length}%`, transform: `translateX(${Math.max(current, 0) * 100}%)` }}
        >
          <span className="absolute inset-x-3 inset-y-1.5 rounded-2xl bg-primary/15" />
          <span className="absolute left-1/2 top-0 h-[3px] w-9 -translate-x-1/2 rounded-b-full bg-cyan-accent" />
        </span>

        {navItems.map(({ label, href, icon: Icon }, i) => {
          const active = i === current
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors duration-200 active:scale-95',
                active ? 'text-white' : 'text-muted-foreground',
              )}
            >
              <Icon className={cn('size-5 transition duration-300', active ? '-translate-y-px scale-110 text-cyan-accent' : 'scale-100')} />
              {label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
