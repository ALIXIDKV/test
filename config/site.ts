import { House, MessageCircle, Package, Send, Star, Users, type LucideIcon } from 'lucide-react'

export const site = {
  name: 'ANDRI OFFICIAL',
  tagline: 'DIGITAL & KREATIF',
  title: 'ANDRI OFFICIAL - Digital & Kreatif',
  description:
    'ANDRI OFFICIAL menyediakan layanan bot, script, nomor virtual, sosial media, desain, panel server, dan berbagai layanan digital lainnya.',
  about: 'Solusi digital dan kreatif untuk berbagai kebutuhan online.',
  year: 2026,
}

export const links = {
  admin: 'https://wa.me/message/PDHOP2R2RQI5C1',
  testimonial: 'https://whatsapp.com/channel/0029VbD4D92Id7nGvYswxH1e',
  group: 'https://chat.whatsapp.com/ITEkJgrq4Wc5mCo7C6Ysk9?s=cl&p=a&mlu=4&ilr=4',
  channel: 'https://whatsapp.com/channel/0029Vb91f1uKLaHiNHecmd2J',
}

type NavItem = { label: string; href: string; icon: LucideIcon }

export const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Produk', href: '/produk', icon: Package },
  { label: 'Komunitas', href: '/komunitas', icon: Users },
]

export const community = [
  { label: 'Testimoni', name: 'TESTIMONI PELANGGAN', desc: 'Lihat testimoni pelanggan Andri Official.', href: links.testimonial, cta: 'LIHAT TESTIMONI', icon: Star },
  { label: 'WhatsApp Group', name: 'WHATSAPP GROUP', desc: 'Gabung grup komunitas Andri Official.', href: links.group, cta: 'GABUNG GRUP', icon: Users },
  { label: 'Saluran WhatsApp', name: 'SALURAN WHATSAPP', desc: 'Ikuti informasi dan update terbaru Andri Official.', href: links.channel, cta: 'IKUTI SALURAN', icon: Send },
  { label: 'Chat Admin', name: 'ADMIN ANDRI OFFICIAL', desc: 'Hubungi admin untuk melakukan pemesanan dan mengecek ketersediaan.', href: links.admin, cta: 'CHAT ADMIN', icon: MessageCircle },
]

// Pintasan ke bagian informasi di halaman produk (id produk atau id blok di config/products.ts)
export const infoLinks = [
  { label: 'Nogar & Fullgar', desc: 'Perbedaan garansi sewa bot', href: '/produk#ketentuan' },
  { label: 'Keuntungan Sewa Bot', desc: 'Fitur dan layanan bot', href: '/produk#keuntungan' },
  { label: 'Panel, APK & JPM', desc: 'Panel Pterodactyl dan lainnya', href: '/produk#kategori-digital' },
]

export const footerLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Semua Layanan', href: '/produk' },
  { label: 'Sewa Bot', href: '/produk#sewa-bot' },
  { label: 'SC & Script', href: '/produk#ourin' },
  { label: 'Nomor Virtual', href: '/produk#nomor-virtual' },
  { label: 'Komunitas', href: '/komunitas' },
]
