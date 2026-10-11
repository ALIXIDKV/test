import { Catalog } from '@/components/catalog'
import { Contact, OrderCta } from '@/components/contact'
import { FloatingActions } from '@/components/floating-actions'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <Contact />
        <OrderCta />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
