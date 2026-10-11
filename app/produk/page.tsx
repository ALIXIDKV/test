import type { Metadata } from 'next'
import { Catalog } from '@/components/catalog/catalog'

export const metadata: Metadata = { title: 'Produk' }

export default function ProductsPage() {
  return <Catalog />
}
