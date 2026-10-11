'use client'

import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { Product } from '@/config/products'
import { productCta, productMeta } from '@/lib/products'
import { useReveal } from '@/lib/use-reveal'
import { cn } from '@/lib/utils'
import { adminLink, BlockView } from './block-view'

type Props = { product: Product; index: number; open: boolean; onToggle: () => void }

export function ProductCard({ product, index, open, onToggle }: Props) {
  const Icon = product.icon
  const ref = useReveal<HTMLElement>()
  const cta = productCta(product)

  return (
    <article
      ref={ref}
      id={product.id}
      style={{ animationDelay: `${Math.min(index, 6) * 45}ms` }}
      className={cn(
        'reveal rounded-xl border bg-card transition-[border-color,translate] duration-200',
        open ? 'border-primary/50 md:col-span-2' : 'border-border hover:-translate-y-0.5 hover:border-primary/60',
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${product.id}-detail`}
          onClick={onToggle}
          className="flex w-full items-center gap-3 rounded-xl p-3.5 text-left outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring active:bg-white/[0.04] sm:p-4"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-secondary text-cyan-accent">
            <Icon className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold leading-snug text-white">{product.title}</span>
            <span className="mt-0.5 block text-[13px] leading-5 text-muted-foreground">{product.desc}</span>
            <span className="mt-1.5 inline-block rounded-md bg-primary/15 px-2 py-0.5 text-xs font-semibold text-cyan-accent">{productMeta(product)}</span>
          </span>
          <ChevronDown className={cn('size-5 shrink-0 text-muted-foreground transition duration-300', open && 'rotate-180 text-white')} />
        </button>
      </h3>

      {/* Tinggi dianimasikan lewat grid-template-rows (0fr ↔ 1fr); inert menjaga isi tertutup tidak bisa difokus */}
      <div
        id={`${product.id}-detail`}
        inert={!open}
        className={cn('grid transition-[grid-template-rows] duration-300 ease-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
      >
        <div className={cn('min-h-0 overflow-hidden transition-opacity duration-200', open ? 'opacity-100 delay-75' : 'opacity-0')}>
          <div className="grid gap-5 border-t border-border p-3.5 sm:p-4">
            {product.blocks.map((block, i) => <BlockView key={i} block={block} />)}
            {cta && (
              <a {...adminLink} className={cn(buttonVariants({ size: 'lg' }), 'h-11 w-full px-5 text-sm font-bold hover:bg-primary/85 sm:w-fit')}>
                {cta} <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
