import { ArrowUpRight, Check, MessageCircle, Star } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { Block } from '@/config/products'
import { links } from '@/config/site'
import { cn } from '@/lib/utils'

export const adminLink = { href: links.admin, target: '_blank', rel: 'noreferrer' } as const

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'note':
      return <p className="text-sm leading-6 text-muted-foreground">{block.text}</p>

    case 'plans':
      return (
        <div>
          {block.title && <h4 className="mb-2 text-sm font-bold text-white">{block.title}</h4>}
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {block.rows.map((r) => (
              <li key={`${r.name}-${r.price}-${r.tag ?? ''}`} className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-semibold text-white">{r.name}</span>
                    {r.tag && (
                      <span className={cn('rounded px-1.5 py-0.5 text-xs font-bold', r.tag === 'FULLGAR' ? 'bg-primary/20 text-cyan-accent' : 'bg-white/10 text-muted-foreground')}>
                        {r.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-lg font-bold leading-none text-white">{r.price}</p>
                </div>
                <a
                  {...adminLink}
                  aria-label={`Pesan ${r.name} ${r.tag ?? ''} ${r.price} via admin`}
                  className={cn(buttonVariants({ size: 'lg' }), 'h-10 shrink-0 px-3.5 text-xs font-bold hover:bg-primary/85')}
                >
                  <MessageCircle className="size-3.5" /> Pesan
                </a>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'list':
      return (
        <div id={block.id}>
          <h4 className="mb-2 text-sm font-bold text-white">{block.title}</h4>
          <ul className={cn('grid gap-x-6 gap-y-2 text-[13px] leading-5 text-muted-foreground', block.items.length > 6 && 'sm:grid-cols-2')}>
            {block.items.map((item) => (
              <li key={item} className="flex gap-2">
                {block.check ? <Check className="mt-0.5 size-4 shrink-0 text-cyan-accent" /> : <span className="text-primary">•</span>}
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'compare':
      return (
        <div id={block.id}>
          <h4 className="mb-2 text-sm font-bold text-white">{block.title}</h4>
          <div className="grid gap-2 md:grid-cols-2">
            {block.sides.map((side) => (
              <div key={side.title} className="rounded-lg border border-border bg-background/60 p-3.5">
                <p className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
                  <span className="size-2 rounded-full bg-primary" /> {side.title}
                </p>
                <ul className="grid gap-2 text-[13px] leading-5 text-muted-foreground">
                  {side.items.map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-primary">•</span><span className="min-w-0">{item}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )

    case 'chips':
      return (
        <div>
          {block.title && <h4 className="mb-2 text-sm font-bold text-white">{block.title}</h4>}
          {block.pill ? (
            <div className="flex flex-wrap gap-2">
              {block.items.map((item) => (
                <span key={item} className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold text-cyan-accent">{item}</span>
              ))}
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {block.items.map((item) => (
                <li key={item} className="rounded-lg border border-border bg-background/60 px-3 py-2 text-[13px] font-semibold leading-snug text-white">{item}</li>
              ))}
            </ul>
          )}
        </div>
      )

    case 'links': {
      const withDesc = block.rows.some((r) => r.desc)
      return (
        <ul className={cn('grid gap-2', withDesc ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6')}>
          {block.rows.map(({ name, desc, icon: Icon }) => (
            <li key={name}>
              <a {...adminLink} className="flex h-full items-start gap-2.5 rounded-lg border border-border bg-background/60 p-3 transition duration-200 hover:border-primary/60 active:scale-[0.98]">
                {Icon && <Icon className="mt-0.5 size-4 shrink-0 text-cyan-accent" />}
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">{name}</span>
                  {desc && <span className="mt-0.5 block text-[13px] leading-5 text-muted-foreground">{desc}</span>}
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-cyan-accent">
                    Tanya admin <ArrowUpRight className="size-3" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )
    }

    case 'stat':
      return (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-3.5">
          <span className="grid size-11 place-items-center rounded-lg bg-primary text-white"><Star className="size-5" fill="currentColor" /></span>
          <div>
            <p className="text-2xl font-bold leading-none text-white">{block.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{block.label}</p>
          </div>
        </div>
      )
  }
}
