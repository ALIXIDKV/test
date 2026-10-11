import { categories, products, type Category, type Product } from '@/config/products'

const toNumber = (price: string) => Number(price.replace(/\D/g, ''))

const plansOf = (items: Product[]) => items.flatMap((p) => p.blocks.flatMap((b) => (b.type === 'plans' ? b.rows : [])))

const lowest = (plans: { price: string }[]) => plans.reduce((a, b) => (toNumber(b.price) < toNumber(a.price) ? b : a))

export const categorySlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-')

export function productMeta(p: Product) {
  if (p.meta) return p.meta
  const plans = plansOf([p])
  return plans.length ? `Mulai ${lowest(plans).price}` : 'Tanya admin'
}

export function categoryMeta(name: Category) {
  const items = products.filter((p) => p.category === name)
  const plans = plansOf(items)
  if (plans.length) return `Mulai ${lowest(plans).price}`
  return items.length === 1 ? productMeta(items[0]) : 'Tanya admin'
}

export function lowestPrice() {
  const plans = plansOf(products)
  return plans.length ? lowest(plans).price : 'Tanya admin'
}

// Produk tanpa paket harga otomatis mendapat tombol order, walau cta tidak diisi
export function productCta(p: Product) {
  return p.cta ?? (plansOf([p]).length ? undefined : 'HUBUNGI ADMIN')
}

function productText(p: Product) {
  const parts: string[] = [p.title, p.desc, p.category]
  for (const b of p.blocks) {
    if (b.type === 'plans') parts.push(...b.rows.flatMap((r) => [r.name, r.price, r.tag ?? '']), b.title ?? '')
    else if (b.type === 'list') parts.push(b.title, ...b.items)
    else if (b.type === 'compare') parts.push(b.title, ...b.sides.flatMap((x) => [x.title, ...x.items]))
    else if (b.type === 'chips') parts.push(...b.items)
    else if (b.type === 'links') parts.push(...b.rows.flatMap((r) => [r.name, r.desc ?? '']))
    else if (b.type === 'note') parts.push(b.text)
    else parts.push(b.value, b.label)
  }
  // Versi tanpa titik supaya "25000" cocok dengan "Rp25.000"
  const text = parts.join(' ').toLowerCase()
  return `${text} ${text.replace(/\./g, '')}`
}

const index = products.map((p) => ({ p, text: productText(p) }))

export function searchProducts(query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return index.filter(({ text }) => words.every((w) => text.includes(w))).map(({ p }) => p)
}

export type Anchor = { id: string; product?: string; category?: Category }

// Menerjemahkan hash (#sewa-bot, #ketentuan, #kategori-digital, #digital) menjadi produk atau kategori tujuan.
// Produk dicek lebih dulu agar hash lama seperti #bot dan #kreatif tetap membuka produknya.
export function resolveAnchor(id: string): Anchor | null {
  if (products.some((p) => p.id === id)) return { id, product: id }
  const owner = products.find((p) => p.blocks.some((b) => 'id' in b && b.id === id))
  if (owner) return { id, product: owner.id }
  const category = categories.find((c) => id === `kategori-${categorySlug(c.name)}` || id === categorySlug(c.name))
  return category ? { id: `kategori-${categorySlug(category.name)}`, category: category.name } : null
}
