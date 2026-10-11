import {
  Bot, Code2, Gem, Globe2, Palette, Send, Server,
  ShieldCheck, Sparkles, Terminal, TrendingUp, Video,
  type LucideIcon,
} from 'lucide-react'

// Kategori tampil di filter dan katalog sesuai urutan ini. Kategori baru cukup ditambah di sini.
export const categories = [
  { name: 'Bot', icon: Bot, desc: 'Jadi bot & sewa bot' },
  { name: 'Script', icon: Code2, desc: 'SC Ourin & rename script' },
  { name: 'Nomor Virtual', icon: Globe2, desc: 'Nomor luar negeri' },
  { name: 'Sosial Media', icon: TrendingUp, desc: 'Instagram, TikTok, YouTube' },
  { name: 'Kreatif', icon: Palette, desc: 'Edit foto, video, poster' },
  { name: 'Digital', icon: Server, desc: 'Panel, APK premium, JPM' },
] as const

export type Category = (typeof categories)[number]['name']

export type Plan = { name: string; price: string; tag?: string }

export type Block =
  | { type: 'plans'; title?: string; rows: Plan[] }
  | { type: 'list'; title: string; items: string[]; id?: string; check?: boolean }
  | { type: 'compare'; title: string; id?: string; sides: { title: string; items: string[] }[] }
  | { type: 'chips'; title?: string; items: string[]; pill?: boolean }
  | { type: 'links'; title?: string; rows: { name: string; desc?: string; icon?: LucideIcon }[] }
  | { type: 'stat'; value: string; label: string }
  | { type: 'note'; text: string }

export type Product = {
  id: string // unik; dipakai sebagai alamat langsung, mis. /produk#sewa-bot
  title: string
  icon: LucideIcon
  category: Category
  desc: string
  meta?: string // label di kartu; jika kosong otomatis "Mulai <harga terendah>"
  cta?: string // teks tombol order di bawah detail
  blocks: Block[]
}

const jadiBot: Plan[] = [
  { name: '24 JAM', price: 'Rp2.000' },
  { name: '1 MINGGU', price: 'Rp5.000' },
  { name: '2 MINGGU', price: 'Rp8.000' },
  { name: '3 MINGGU', price: 'Rp12.000' },
  { name: '1 BULAN', price: 'Rp16.000' },
  { name: 'PERMANEN', price: 'Rp40.000' },
]

const sewaBot: Plan[] = [
  { name: '1 HARI', price: 'Rp5.000', tag: 'NOGAR' },
  { name: '7 HARI', price: 'Rp10.000', tag: 'FULLGAR' },
  { name: '12 HARI', price: 'Rp15.000', tag: 'FULLGAR' },
  { name: '1 BULAN', price: 'Rp20.000', tag: 'NOGAR' },
  { name: '1 BULAN', price: 'Rp30.000', tag: 'FULLGAR' },
  { name: 'PERMANEN', price: 'Rp40.000', tag: 'NOGAR' },
  { name: 'PERMANEN', price: 'Rp50.000', tag: 'FULLGAR' },
]

const negara = [
  '🇺🇸 USA', '🇿🇦 SOUTH AFRICA', '🇨🇦 CANADA', '🇬🇧 UNITED KINGDOM', '🇭🇰 HONG KONG', '🇵🇱 POLAND',
  '🇨🇴 COLOMBIA', '🇨🇱 CHILE', '🇷🇺 RUSSIA', '🇧🇷 BRAZIL', '🇩🇪 GERMANY', '🇹🇭 THAILAND',
  '🇵🇭 PHILIPPINES', '🇲🇾 MALAYSIA', '🇪🇸 SPAIN', '🇦🇺 AUSTRALIA',
]

const keuntungan = [
  'Fitur serbaguna untuk grup', 'Fitur group work lengkap', 'Bot mati/kenon? Bot diganti sesuai ketentuan garansi',
  'Bisa lapor jika bot mengalami masalah', 'Bot dipantau untuk memastikan tetap aktif', 'Respons cepat',
  'Perlindungan grup dari pengguna yang mengganggu', 'Bot diperbarui secara rutin', 'Fitur terus bertambah',
  'Pengaturan welcome/close grup', 'Fitur hidetag', 'Download link sosial media', 'Membuat sticker',
  'Dan masih banyak fitur lainnya',
]

const hubungiAdmin = 'Hubungi admin untuk harga dan ketersediaan terbaru.'

export const products: Product[] = [
  {
    id: 'bot',
    title: 'JADI BOT',
    icon: Bot,
    category: 'Bot',
    desc: 'Solusi bot untuk kebutuhan grup dan layanan otomatis.',
    blocks: [{ type: 'plans', title: 'LIST JADI BOT', rows: jadiBot }],
  },
  {
    id: 'sewa-bot',
    title: 'SEWA BOT',
    icon: Bot,
    category: 'Bot',
    desc: 'Bot untuk kebutuhan grup dan layanan otomatis.',
    blocks: [
      { type: 'note', text: 'Mau sewa bot untuk menjaga grup kalian? Di sini tempatnya.' },
      { type: 'plans', title: 'LIST SEWA BOT', rows: sewaBot },
      {
        type: 'compare',
        id: 'ketentuan',
        title: 'PERBEDAAN NOGAR & FULLGAR',
        sides: [
          { title: 'NOGAR', items: ['Pindah GB +Rp2K', 'No Call + PM Bot, ngeyel = hangus dan bayar denda', 'Bot kena kick, harus sewa ulang', 'Pakai bot sewajarnya, spam = bot keluar'] },
          { title: 'FULLGAR', items: ['Pindah GB = Gratis', 'No Call + PM Bot, ngeyel = denda', 'Bot kena kick = bisa ditambahkan lagi', 'Pakai bot sewajarnya, spam = bot keluar'] },
        ],
      },
      { type: 'list', id: 'keuntungan', title: 'KEUNTUNGAN SEWA BOT', items: keuntungan, check: true },
      { type: 'stat', value: '1500+', label: 'Fitur Bot' },
    ],
  },
  {
    id: 'ourin',
    title: 'SC OURIN DELUXE',
    icon: Code2,
    category: 'Script',
    desc: 'Script dengan pilihan paket pembaruan.',
    blocks: [
      { type: 'note', text: 'Pilih paket sesuai kebutuhan Anda.' },
      { type: 'plans', rows: [{ name: 'NO UPDATE', price: 'Rp25.000' }, { name: '2X UPDATE', price: 'Rp35.000' }, { name: 'FULL UPDATE', price: 'Rp60.000' }] },
      { type: 'list', title: 'Yang didapat', items: ['SC siap digunakan', 'Pilih sesuai kebutuhan', 'Update tersedia sesuai paket', 'Proses cepat dan rapi', 'Dukungan untuk pembeli'], check: true },
    ],
  },
  {
    id: 'rename',
    title: 'JASA RENAME SC / SCRIPT',
    icon: Terminal,
    category: 'Script',
    desc: 'Layanan rename script sesuai paket.',
    blocks: [
      { type: 'note', text: 'Layanan rename script dengan proses cepat dan rapi.' },
      { type: 'plans', rows: [{ name: 'RENAME BIASA', price: 'Rp15.000' }, { name: 'RENAME SAMPAI AKAR', price: 'Rp30.000' }] },
      { type: 'list', title: 'Setiap paket', items: ['Proses cepat', 'Rapi', 'Terpercaya'], check: true },
    ],
  },
  {
    id: 'nomor-virtual',
    title: 'NOMOR VIRTUAL',
    icon: Globe2,
    category: 'Nomor Virtual',
    desc: 'Nomor virtual dari berbagai negara.',
    meta: '16 negara',
    cta: 'CEK STOK',
    blocks: [
      { type: 'note', text: 'Nomor virtual dari berbagai negara dengan stok dan harga yang dapat berubah.' },
      { type: 'chips', items: ['TERMURAH', 'TERLENGKAP', 'TERPERCAYA'], pill: true },
      { type: 'chips', title: 'Pilihan negara', items: negara },
      { type: 'list', title: 'KEUNGGULAN', items: ['Proses cepat', 'Harga terjangkau', 'Bisa request negara lain', 'Layanan terpercaya', 'Mendukung berbagai kebutuhan yang diperbolehkan', 'Respons admin cepat'], check: true },
      { type: 'list', title: 'GARANSI', items: ['Garansi mengikuti ketentuan layanan', 'Penggantian mengikuti kondisi dan kebijakan produk'] },
      { type: 'note', text: 'Stok dan harga dapat berubah. Hubungi admin untuk mengecek ketersediaan dan harga terbaru.' },
    ],
  },
  {
    id: 'sosial-media',
    title: 'SUNTIK SOSIAL MEDIA',
    icon: TrendingUp,
    category: 'Sosial Media',
    desc: 'Layanan sosial media.',
    meta: 'Tanya admin',
    cta: 'TANYA ADMIN',
    blocks: [
      { type: 'note', text: 'Layanan sosial media tersedia sesuai stok dan jenis layanan.' },
      {
        type: 'links',
        rows: [
          { name: 'Instagram', icon: Globe2 }, { name: 'TikTok', icon: Video }, { name: 'YouTube', icon: Globe2 },
          { name: 'Telegram', icon: Send }, { name: 'Facebook', icon: Globe2 }, { name: 'X', icon: Globe2 },
        ],
      },
    ],
  },
  {
    id: 'kreatif',
    title: 'JASA EDIT & DESAIN',
    icon: Palette,
    category: 'Kreatif',
    desc: 'Edit foto, video, poster, banner, katalog, dan kebutuhan kreatif.',
    meta: 'Tanya admin',
    cta: 'TANYA ADMIN',
    blocks: [
      {
        type: 'links',
        rows: [
          { name: 'EDIT FOTO', desc: 'Desain dan edit foto sesuai kebutuhan.' },
          { name: 'EDIT VIDEO', desc: 'Edit video untuk kebutuhan pribadi maupun promosi.' },
          { name: 'POSTER', desc: 'Desain poster promosi.' },
          { name: 'BANNER', desc: 'Desain banner dan kebutuhan digital.' },
          { name: 'KATALOG', desc: 'Desain katalog produk.' },
          { name: 'CUSTOM', desc: 'Desain sesuai kebutuhan pelanggan.' },
        ],
      },
    ],
  },
  {
    id: 'jpm',
    title: 'JPM / MURID JPM',
    icon: Send,
    category: 'Digital',
    desc: 'Layanan JPM dan kebutuhan terkait.',
    meta: 'Tanya admin',
    cta: 'HUBUNGI ADMIN',
    blocks: [{ type: 'note', text: hubungiAdmin }],
  },
  {
    id: 'apk-bug',
    title: 'APK BUG / JASA BUG',
    icon: ShieldCheck,
    category: 'Digital',
    desc: 'Layanan sesuai kebutuhan yang tersedia.',
    meta: 'Tanya admin',
    cta: 'HUBUNGI ADMIN',
    blocks: [{ type: 'note', text: hubungiAdmin }],
  },
  {
    id: 'apk-premium',
    title: 'APK PREMIUM',
    icon: Gem,
    category: 'Digital',
    desc: 'Berbagai layanan aplikasi premium.',
    meta: 'Tanya admin',
    cta: 'HUBUNGI ADMIN',
    blocks: [{ type: 'note', text: hubungiAdmin }],
  },
  {
    id: 'panel',
    title: 'PANEL PTERODACTYL',
    icon: Server,
    category: 'Digital',
    desc: 'Panel server dengan berbagai pilihan kapasitas.',
    meta: 'Tanya admin',
    cta: 'HUBUNGI ADMIN',
    blocks: [{ type: 'note', text: hubungiAdmin }],
  },
  {
    id: 'lainnya',
    title: 'LAYANAN LAINNYA',
    icon: Sparkles,
    category: 'Digital',
    desc: 'Hubungi admin untuk layanan lainnya.',
    meta: 'Tanya admin',
    cta: 'HUBUNGI ADMIN',
    blocks: [{ type: 'note', text: 'Hubungi admin untuk layanan lainnya.' }],
  },
]
