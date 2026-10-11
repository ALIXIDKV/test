import { Hero } from '@/components/hero'
import { LegacyHashRedirect } from '@/components/legacy-hash-redirect'
import { StoreInfo } from '@/components/store-info'

export default function HomePage() {
  return (
    <>
      <LegacyHashRedirect />
      <Hero />
      <StoreInfo />
    </>
  )
}
