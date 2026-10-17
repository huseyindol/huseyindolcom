const fs = require('fs')
const path = require('path')

const blogDir = path.join(__dirname, '../src/data/blog')
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true })
}

const articlesData = [
  // --- FRONTEND: REACT ---
  {
    slug: 'frontend-react-architecture',
    title: 'Modern React Mimarisi ve Clean Code Pratikleri',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-16',
    readingTime: '6',
    content: `State yönetimi, Custom Hook'ların gücü ve Declarative (Bildirimsel) kod yazımının React ekosistemindeki önemine değindik. Projelerimizde Side effect'leri en aza indiren fonksiyonel yaklaşımlar sergiledik. React 19 ve concurrent özelliklerinin uygulamadaki performans getirileri muazzamdır.`,
  },
  {
    slug: 'frontend-react-performance',
    title: 'React Render Performans Optimizasyonu',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    order: 3,
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-16',
    readingTime: '5',
    content: `React Suspense, Lazy Loading ve RSC (React Server Components) konseptleri ile gereksiz re-render problemlerinin nasıl önüne geçilir? UseMemo ve UseCallback hook'larının doğru zamanda kullanımı üzerine case studyler inceledik.`,
  },
  {
    slug: 'frontend-react-shadcn',
    title: 'React ve Shadcn UI: Tasarım Sistemleri',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-16',
    readingTime: '7',
    content: `Klasik komponent kütüphanelerinin aksine, kodu tamamen bizim sahiplendiğimiz Shadcn UI mimarisi ile projelerde inanılmaz bir standartlaşma sağladık. Tailwind CSS'in utility first yaklaşımıyla birleştiğinde ortaya premium sonuçlar çıkıyor.`,
  },

  // --- FRONTEND: NEXTJS ---
  {
    slug: 'frontend-nextjs-elly-admin',
    title: 'Elly Admin Panel Mimarisi: Next.js App Router',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    order: 2,
    coverImage:
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-17',
    readingTime: '8',
    content: `Elly-admin-panel geliştirilirken Next.js'in SSR yeteneklerini ve App Router esnekliklerini kullandık. Layout pattern'i ile yetkilendirme katmanları, Server Actions üzerinden data mutasyonları sağlandı.`,
  },
  {
    slug: 'frontend-nextjs-seo',
    title: 'Next.js ile Kusursuz SEO ve Metadata Yönetimi',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    order: 1,
    coverImage:
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-17',
    readingTime: '5',
    content: `Pages Router tabanlı Next.js uygulamalarında <Seo /> (next/head), getStaticProps ve robots.txt.tsx / sitemap.xml.tsx entegrasyonu ile Google indeks sürelerini minimize ediyoruz.`,
  },
  {
    slug: 'frontend-nextjs-api-routes',
    title: 'Next.js Backend as a Frontend: API Routes',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-17',
    readingTime: '6',
    content: `Pages Router API Routes (src/pages/api/*) ile Next.js içerisinde BFF proxy oluşturarak mikroservislere köprü yapmak ve webhook/revalidate dinleyicilerini konumlandırmak. Cache konfigürasyonları ve res.revalidate() süreçleri.`,
  },

  // --- FRONTEND: NPMJS ---
  {
    slug: 'frontend-npmjs-uikit',
    title: 'Kurumsal UI Kit İnşası: NPMJS Üzerinde Paketleme',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-18',
    readingTime: '7',
    content: `Firmamın frontend projelerindeki karmaşayı çözmek için geliştirdiğimiz UI-Kit çalışmasının hikayesi. Button, Badge, Banner, Newsletter alanı gibi componentleri nasıl izole bir pakete dönüştürdük?`,
  },
  {
    slug: 'frontend-npmjs-versioning',
    title: 'NPM Paketlerinde Semantik Versiyonlama (SemVer)',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-18',
    readingTime: '4',
    content: `Yüzlerce farklı uygulamaya giden NPM paketinin güncellemelerinde hata oluşmaması için Breaking Change yönetimi, Git flow senkronizasyonu ve Semantic Versioning ilkelerini uyguladık.`,
  },
  {
    slug: 'frontend-npmjs-ci-cd',
    title: 'GitHub Actions ile NPM Paket Dağıtımı (CI/CD Otomasyonu)',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    order: 4,
    coverImage:
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-18',
    readingTime: '6',
    content: `Kod main branch'e birleştiği anda testlerden geçen component paketinin otomatik olarak NPM Registry'ye yeni versiyonla nasıl pushlandığı üzerindeki otomasyon tecrübemiz.`,
  },

  // --- FRONTEND: STORYBOOK ---
  {
    slug: 'frontend-storybook-playground',
    title: 'Storybook: UI Bileşenleri İçin İzole Oyun Alanı',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-19',
    readingTime: '5',
    content: `Geliştirdiğimiz UI-Kit NPM paketinin içerisindeki bileşenleri takım arkadaşlarına ve tasarımcılarına tanıtmak adına Storybook kullanarak elde ettiğimiz hız kazanımlarını değerlendiriyoruz.`,
  },

  // --- MOBILE: REACT NATIVE ---
  {
    slug: 'mobile-react-native-elly',
    title: 'Elly Mobile App: Modern React Native Mimarisi',
    category: 'Mobile',
    author: 'Hüseyin DOL',
    order: 1,
    coverImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-21',
    readingTime: '8',
    content: `Elly mobil projesinde, tam tema destekli (karanlık mod odaklı) mimari deneyimlerimiz, form bileşenleri ve navigation yapılandırmalarından elde ettiğim teknik tecrübeler.`,
  },
  {
    slug: 'mobile-react-native-performance',
    title: 'React Native FlatList Performans İpuçları',
    category: 'Mobile',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-21',
    readingTime: '6',
    content: `Binlerce verinin mobil ekranda kasma donma yaşamadan listelenebilmesi için memoization, keyextractor ve getItemLayout optimizasyon adımları.`,
  },
  {
    slug: 'mobile-react-native-animations',
    title: 'Reanimated ve Akışkan 60FPS Animasyonlar',
    category: 'Mobile',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-21',
    readingTime: '5',
    content: `UI/UX standartlarını çok yukarılara çekmek için JS thread dışına çıkarılan ve mikro-animasyonları kusursuz yöneten Reanimated 3 implementasyonlarımız.`,
  },

  // --- AI: MCP ---
  {
    slug: 'ai-mcp-integration',
    title: 'Kendi MCP Sunucunuzu Java/Node İle Yazmak',
    category: 'AI',
    author: 'Hüseyin DOL',
    order: 1,
    coverImage:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-22',
    readingTime: '8',
    content: `McpProjectScaffold içinde, Custom tool tanımlamaları ve prompt veritabanı enjekte etme işlemlerinin entegrasyon süreçleri. Büyük dil modelleri sizin API'lerinize nasıl erişebilir?`,
  },
  {
    slug: 'ai-mcp-security',
    title: 'Yapay Zeka Protokollerinde Güvenlik ve İzolasyon',
    category: 'AI',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-22',
    readingTime: '5',
    content: `MCP serverleri üzerinden sağlanan "safe-to-run" komutlarda riskli operasyonları nasıl limitleriz? LLM'lerin sadece okuma-yetkili (read-only) bağlanmasına uygun mimari teknikleri.`,
  },

  // --- AI: LLM AGENTS ---
  {
    slug: 'ai-agents-workflow',
    title: "AI Agent'lar İle Yazılım Geliştirme Kültürü",
    category: 'AI',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-23',
    readingTime: '10',
    content: `Artık sadece kod yazmak yetmiyor, kod yazdıran sistemleri (Agent, Antigravity, Claude, vs.) mimarimize entegre etmek gerekiyor. Kodlamadaki Agentic Workflow (ajan tabanlı akış) devrimi.`,
  },
  {
    slug: 'ai-agents-future',
    title: 'Otonom Sistemler ve Frontend Mühendisliğinin Geleceği',
    category: 'AI',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-23',
    readingTime: '12',
    content: `UX ve Tasarım Sistemleri artık AI tarafından üretiliyor. Yapay zekanın sadece asistan değil, bir bileşen (component) oluşturucu ve sistem mimarı rolüne büründüğü bu süreçte bizleri neler bekliyor?`,
  },
]

articlesData.forEach(article => {
  let customBody = ''

  switch (article.slug) {
    case 'frontend-react-architecture':
      customBody = `Modern Front-end dünyasında React'in giderek karmaşıklaşan yapısı, sürdürülebilir bir mimari tasarlamayı zorunlu kılıyor. 50'den fazla sayfaya sahip bir kurumsal uygulamada bileşen hiyerarşisinde kaybolmamak için "Separation of Concerns" (Sorumlulukların Ayrılığı) prensibini en temel yapıtaşı yapmalıyız. Bu prensip yalnızca klasik backend katman mimarisinin (Controller-Service-Repository) frontend'teki yansıması değil; aynı zamanda bileşen düzeyinde sorumluluk dağılımını belirleyen temel kuraldır.\n\nProjelerde karmaşık durumları yönetirken \`useEffect\` kullanımını minimize ediyor ve iş mantığını tamamen **Custom Hook** yapılarına devrediyorum. Bu yaklaşımın temelinde şu düşünce yatıyor: bir React bileşeni yalnızca "ne gösterilecek" sorusuyla ilgilenmeli, "veri nereden gelecek" veya "hangi koşulda ne olacak" gibi sorular hook katmanında cevaplanmalıdır. Container/Presenter mantığını modern Hook ekosistemiyle birleştirmek, testlerin kolaylaşmasını ve kodun her yerde kullanılabilmesini (reusability) sağlıyor.\n\n\`\`\`tsx\n// Örnek: İş mantığının UI'dan izole edilmesi\nexport function useProfileData(userId: string) {\n  const { data, isLoading, error } = useQuery({\n    queryKey: ['profile', userId],\n    queryFn: () => fetcher(\`/api/user/\${userId}\`),\n    staleTime: 5 * 60 * 1000, // 5 dakika cache\n  });\n  return { profile: data, isLoading, error };\n}\n\n// UI bileşeni sadece render ile ilgilenir\nexport function ProfileCard({ userId }: { userId: string }) {\n  const { profile, isLoading } = useProfileData(userId);\n  if (isLoading) return <ProfileSkeleton />;\n  return <Card>{profile.name}</Card>;\n}\n\`\`\`\n\nDizin yapısında ise feature-based (özellik tabanlı) organizasyon tercih ediyorum: \`src/features/auth\`, \`src/features/dashboard\` gibi klasörler altında her özelliğin kendi hook'ları, bileşenleri ve tip tanımları bir arada yaşıyor. Bu modüler yapı sayesinde, 6 kişilik bir frontend ekibinde paralel çalışırken merge conflict oranımız %80 düştü.\n\nReact 19 ve concurrent rendering özellikleri bu mimarinin üstüne konduğunda, \`useTransition\` ile ağır tab geçişlerini bloklamadan işleyebiliyor, \`Suspense\` sınırlarıyla sayfa yüklenme deneyimini granüler seviyede kontrol edebiliyoruz. Custom Hook'lar üzerinde ilerlediğimizde UI bileşenleri tamamen "aptal" (dumb) hale gelir ve sadece gelen datayı render etmekle ilgilenir. Bu izolasyon, ekibin projeye adaptasyon sürecini aylar seviyesinden haftalara indirir ve onboarding maliyetini dramatik biçimde azaltır.`
      break

    case 'frontend-react-performance':
      customBody = `React'in popülerliği arttıkça, sıkça karşılaşılan performans darboğazlarının başında "gereksiz tekrar render edilme" (unnecessary re-renders) sorunu geliyor. Dashboardlarında 2000'den fazla DOM node'u barındıran Elly admin panelimizde bu problemi bizzat yaşadık: bir filtreleme input'una her karakter yazıldığında tüm tablo satırları yeniden render ediliyordu ve Chrome DevTools Profiler'da 300ms+ render süreleri görüyorduk.\n\nÇözüm sürecinde React DevTools Profiler ile render waterfall'ları analiz ettik ve darboğaz noktalarını tespit ettik. \`React.memo\`, \`useMemo\` ve \`useCallback\` fonksiyonlarını her yerde değil, yalnızca **profiler'da kırmızı işaretli** olan bileşenlerde uyguladık. Premature optimization tuzağına düşmeden, veri odaklı karar aldık.\n\n\`\`\`tsx\n// ❌ Anti-pattern: Her render'da filtre fonksiyonu yeniden oluşur\nfunction Dashboard({ items }) {\n  const filtered = items.filter(i => i.active); // Her render'da çalışır\n  return <DataTable data={filtered} />;\n}\n\n// ✅ Doğru yaklaşım: Sadece items değiştiğinde hesapla\nfunction Dashboard({ items }) {\n  const filtered = useMemo(\n    () => items.filter(i => i.active),\n    [items]\n  );\n  return <DataTable data={filtered} />;\n}\n\n// Ağır liste bileşenlerini memo ile sarmalama\nconst TableRow = memo(function TableRow({ row }: { row: RowData }) {\n  return (\n    <tr>\n      <td>{row.name}</td>\n      <td>{row.status}</td>\n    </tr>\n  );\n});\n\`\`\`\n\n10.000+ satırlık tablolar için ise \`@tanstack/react-virtual\` (eski adıyla react-window) ile virtualization uyguladık. Ekranda yalnızca görünen 20-30 satır DOM'a yazılıyor, geri kalanı viewport dışında kalıyor. Bu teknikle initial render süremiz 300ms'den 18ms'ye düştü.\n\nReact Server Components (RSC) ile bu optimizasyonların bir kısmı artık sunucu tarafında çözülüyor: veri çekme ve filtreleme sunucuda yapılıp istemciye sadece render-ready HTML gönderiliyor. Bu da JavaScript bundle boyutunu küçültürken, Time to Interactive (TTI) metriğini dramatik biçimde iyileştiriyor. Sonuç olarak Lighthouse Performance skoru 62'den 94'e yükseldi.`
      break

    case 'frontend-react-shadcn':
      customBody = `Klasik component kütüphanelerinin (Ant Design, MUI, Chakra UI) en büyük sorunu, kurumsal projelerde ihtiyaç duyulan ince tasarım ayarlarını yapmak için CSS override savaşlarına girmek zorunda kalmanızdır. Elly projesinde bu sorunu derinden yaşadık: MUI'nin DatePicker bileşenini firmamızın tasarım rehberine uydurmak için 200 satır override CSS yazmıştık. Shadcn UI bu zorluğu Headless (Radix) felsefesiyle kökünden çözdü.\n\nShadcn UI'ın devrimsel farkı, bileşen kodlarının \`node_modules\` içinde saklı kalması yerine bizzat projenizin \`src/components/ui\` dizinine kopyalanmasıdır. Bu "copy-paste" yaklaşımı ilk bakışta garip gelse de, pratikte devasa bir esneklik sunuyor: bileşenin her satırı sizin kontrolünüzde, istediğiniz gibi özelleştirebilirsiniz. Tailwind CSS'in utility-first felsefesiyle birleştiğinde, tasarım varyasyonları class-variance-authority (CVA) üzerinden dakikalar içinde tanımlanıyor.\n\n\`\`\`tsx\n// components/ui/button.tsx — tamamen bizim kontrolümüzde\nimport { cva, type VariantProps } from 'class-variance-authority';\n\nconst buttonVariants = cva(\n  'inline-flex items-center rounded-lg font-medium transition-colors',\n  {\n    variants: {\n      variant: {\n        default: 'bg-emerald-600 text-white hover:bg-emerald-700',\n        destructive: 'bg-red-600 text-white hover:bg-red-700',\n        outline: 'border border-slate-300 hover:bg-slate-100',\n        ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800',\n      },\n      size: {\n        sm: 'h-8 px-3 text-xs',\n        md: 'h-10 px-4 text-sm',\n        lg: 'h-12 px-6 text-base',\n      },\n    },\n    defaultVariants: { variant: 'default', size: 'md' },\n  }\n);\n\`\`\`\n\nRadix UI'ın sağladığı accessibility (erişilebilirlik) altyapısı da cabası: Dialog, DropdownMenu, Tabs gibi karmaşık bileşenler keyboard navigation, focus trap ve ARIA etiketleriyle doğuştan uyumlu geliyor. Bizim yapmamız gereken tek şey görsel katmanı (Tailwind sınıfları) eklemek.\n\nEkip içinde \`shadcn add\` CLI komutuyla yeni bileşenler saniyeler içinde projeye ekleniyor ve \`components.json\` konfigürasyon dosyası üzerinden tema renkleri, border-radius değerleri ve CSS değişkenleri merkezi olarak yönetiliyor. Bu yaklaşım sayesinde 4 farklı projede tutarlı bir tasarım dili korurken, her projenin kendine özel ihtiyaçlarını da karşılayabiliyoruz.`
      break

    case 'frontend-nextjs-elly-admin':
      customBody = `Elly CMS sisteminin yönetim paneli ihtiyaçları doğrultusunda, SEO'ya duyarlı olmanın ötesinde çok hızlı karar alabilen bir "Server-Driven" arayüz gerekiyordu. İçerik yönetimi, kullanıcı rolleri (RBAC), form oluşturma ve tenant bazlı yapılandırma gibi karmaşık operasyonları barındıran bu panel, doğrudan Next.js'in App Router mimarisi ile güçlü bir entegrasyon gerektirdi.\n\nMimari kurguyu oluştururken \`(site)\` ve \`(admin)\` şeklinde route group'ları kullandık. Bu sayede admin paneli tamamen farklı bir layout (Sidebar + TopBar) kullanırken, site tarafı (Header + Footer) kendi layout'unda yaşıyor. Her iki taraf da aynı codebase'de ama birbirini etkilemeden geliştirilebiliyor.\n\n\`\`\`\nsrc/app/\n├── (site)/          # Public site layout (Header + Footer)\n│   ├── page.tsx\n│   ├── blog/\n│   └── about/\n├── (admin)/         # Admin layout (Sidebar + TopBar)\n│   ├── layout.tsx   # Auth guard + RBAC middleware burada\n│   ├── dashboard/\n│   ├── contents/\n│   └── users/\n└── layout.tsx       # Root layout (Theme, Providers)\n\`\`\`\n\nYükleme sürelerini minimize etmek için istemci (Client) ve sunucu (Server) bileşenleri arasındaki sınırları (boundaries) net çizgilerle ayırdık. Sayfanın ana veri çekme işlemleri async Server Component'lerde yapılırken, yalnızca kullanıcı etkileşimi gerektiren parçalar (modal, form, dropdown) \`'use client'\` direktifiyle işaretlendi. Bu strateji sayesinde admin panelinin JavaScript bundle boyutu %40 azaldı.\n\n\`\`\`tsx\n// app/(admin)/contents/page.tsx — Server Component\nexport default async function ContentsPage() {\n  const contents = await getContentsService({ page: 0, size: 20 });\n  return (\n    <div>\n      <ContentFilters />   {/* Client — arama/filtreleme */}\n      <ContentTable data={contents.data} />  {/* Server — statik tablo */}\n    </div>\n  );\n}\n\`\`\`\n\nOturum yönetimi için \`middleware.ts\` katmanında JWT token kontrolü yapılıyor ve yetkisiz istekler \`/login\` sayfasına yönlendiriliyor. Rol bazlı erişim kontrolü (RBAC) ise layout seviyesinde uygulanıyor: her admin sayfası render edilmeden önce kullanıcının ilgili permission'a sahip olup olmadığı Redis cache üzerinden kontrol ediliyor.\n\nVerinin işlendiği yere en yakın noktada çekilmesi, paneller arası geçişlerde sıfıra yakın bir hissiyat yarattı. \`revalidateTag\` ve \`revalidatePath\` API'leri ile CMS'te yapılan içerik değişiklikleri anında public siteye yansıyor, cache invalidation süreci tamamen otomatik.`
      break

    case 'frontend-nextjs-seo':
      customBody = `Ziyaretçiye statik göründüğü halde içeriklerini dinamik veri tabanlarından alan sitelerde Arama Motoru Optimizasyonu (SEO) en büyük mücadele alanıdır. Klasik React SPA'larda arama motorları boş bir \`<div id="root">\` görür — içerik JavaScript yüklendikten sonra render edildiği için botlar sayfayı boş algılar. Next.js Pages Router bu problemi SSG (\`getStaticProps\` + ISR) ve SSR (\`getServerSideProps\`) ile kökünden çözüyor.\n\nÖncelikle \`next/head\` üzerine inşa ettiğimiz merkezi \`<Seo />\` (\`src/lib/seo.tsx\`) bileşeni, her sayfa için dinamik meta tag üretimini ve \`key\` bazlı deduplication'ı mümkün kılıyor. Blog makalelerimizde \`getStaticProps\` ile slug parametresine göre içeriği çekip, başlık, açıklama, OpenGraph görseli ve canonical URL'yi sunucu tarafında \`<head>\` içine basıyoruz.\n\n\`\`\`tsx\n// src/pages/blog/[slug].tsx\nimport { Seo } from '@/lib/seo'\nimport type { GetStaticProps } from 'next'\n\nexport const getStaticProps: GetStaticProps = async ({ params }) => {\n  const post = getPostBySlug(String(params?.slug))\n  if (!post) return { notFound: true }\n  return { props: { post }, revalidate: 86400 }\n}\n\`\`\`\n\nSEO'nun ikinci kritik ayağı **sitemap.xml** ve **robots.txt** entegrasyonudur. Next.js Pages Router'da \`src/pages/sitemap.xml.tsx\` ve \`src/pages/robots.txt.tsx\` sayfalarında \`getServerSideProps\` üzerinden XML/text yanıtı üreterek bunları kodla yönetiyoruz.\n\nÜçüncü katman olarak **JSON-LD Structured Data** (Schema.org) ile arama sonuçlarında zengin snippet görüntüsü elde ediyoruz. Son olarak AI crawler'ları için \`robots.txt\`'te açık izin verip, \`llms.txt\` ve \`llms-full.txt\` dosyalarıyla sitemizin yapısını doğrudan LLM'lere sunuyoruz.`
      break

    case 'frontend-nextjs-api-routes':
      customBody = `Modern mikro-servis mimarilerinde frontend uygulamasının doğrudan backend API'lerine istek yapması, CORS sorunları, güvenlik açıkları ve API anahtarlarının tarayıcıya sızma riski gibi ciddi problemlere yol açıyor. Elly CMS altyapısında Java Spring Boot backend'imiz ile tenant sitesi arasında Next.js Pages Router API Routes (\`src/pages/api/*\`) kullanarak "Backend for Frontend" (BFF) pattern'ini uyguladık.\n\nPages Router API rotaları (\`NextApiRequest\`, \`NextApiResponse\`), Next.js sunucusu üzerinde çalışan server-side endpoint'lerdir. İstemciden gelen istekler önce Next.js sunucusuna gelir, burada \`httpOnly\` cookie'den JWT token okuma/yenileme, rate limiting ve Zod validasyonu yapılır, ardından istek backend API'sine iletilir.\n\n\`\`\`ts\n// src/pages/api/contents.ts\nimport type { NextApiRequest, NextApiResponse } from 'next'\n\nexport default async function handler(req: NextApiRequest, res: NextApiResponse) {\n  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })\n  const token = req.cookies['accessToken']\n  if (!token) return res.status(401).json({ error: 'Unauthorized' })\n  const upstream = await fetch(\`\${process.env.NEXT_PUBLIC_API}/contents/list\`, {\n    headers: { Authorization: \`Bearer \${token}\` },\n  })\n  return res.status(upstream.status).json(await upstream.json())\n}\n\`\`\`\n\nSayfalarda \`getStaticProps\` + \`revalidate\` ile ISR kullanılırken, CMS'te bir içerik güncellendiğinde \`src/pages/api/revalidate.ts\` endpoint'ine gelen POST isteği \`await res.revalidate(path)\` çağrısıyla ilgili sayfaları anında yeniler.`
      break

    case 'frontend-npmjs-uikit':
      customBody = `Büyüyen yazılım ekiplerinin birbirinden kopuk projeler geliştirdiğinde yaşadığı en büyük kriz tutarsızlıktır: bir projede buton yeşil, diğerinde mavi; birinde border-radius 4px, diğerinde 8px. Kullanıcılar farklı ürünler arasında gezinirken marka algısı zedelenir. Elly ekosisteminde 3 farklı frontend projesi (public site, admin panel, mobile web) aynı marka kimliğini taşıması gerekiyordu.\n\nBu sorunu çözmek için firmanın tasarım sistemini (Design System) kapsayan bir NPM paketi oluşturduk. Button, Badge, Banner, Input, Modal, Toast gibi 25+ temel bileşeni, Tailwind CSS theme token'ları ve utility fonksiyonlarla birlikte tek bir pakete sardık. Paket, tree-shakeable yapıda olduğu için tüketici projeler yalnızca kullandıkları bileşenleri bundle'a dahil ediyor.\n\n\`\`\`tsx\n// UI Kit paket yapısı\npackages/ui-kit/\n├── src/\n│   ├── components/\n│   │   ├── Button/\n│   │   │   ├── Button.tsx\n│   │   │   ├── Button.stories.tsx\n│   │   │   ├── Button.test.tsx\n│   │   │   └── index.ts\n│   │   ├── Badge/\n│   │   ├── Input/\n│   │   └── Modal/\n│   ├── tokens/\n│   │   ├── colors.ts    // Marka renk paleti\n│   │   ├── spacing.ts\n│   │   └── typography.ts\n│   └── index.ts         // Public API — barrel export\n├── package.json\n└── tsup.config.ts       // Build konfigürasyonu\n\`\`\`\n\nPaketin build sürecinde \`tsup\` kullanarak hem ESM hem CJS formatında çıktı üretiyoruz. TypeScript tip tanımları otomatik oluşturuluyor, böylece tüketici projelerde IntelliSense desteği tam çalışıyor.\n\n\`\`\`bash\n# Kurulum\nbun add @huseyindol/ui-kit\n\n# Kullanım\nimport { Button, Badge, Input } from '@huseyindol/ui-kit';\n\`\`\`\n\nBu yaklaşımın en büyük getirisi, ürün yönetimi yeni bir platform sipariş ettiğinde geliştirici ekibinin sıfırdan tasarım yazmakla uğraşmamasıdır. Markanın hazır bloklarını bir araya getirerek %40 efor tasarrufuyla yayına çıkılabiliyor. Ayrıca tasarım değişikliği yapıldığında (örneğin marka rengi güncellemesi) tek pakette yapılan değişiklik, tüm projelere otomatik yansıyor.`
      break

    case 'frontend-npmjs-versioning':
      customBody = `Paylaşımlı bir NPM paketi ekosistemi yönetiyorsanız, en büyük kabusunuz masum görünen bir güncellemenin downstream projelerini çökertmesidir. Biz bunu acı tecrübeyle öğrendik: UI Kit'in Button bileşeninde prop adını değiştirdiğimizde, 3 farklı projenin build'i aynı anda kırıldı. O günden sonra Semantic Versioning'i (SemVer) katı bir disiplinle uygulamaya başladık.\n\nSemVer'in kuralı basittir ama uygulaması disiplin gerektirir: \`MAJOR.MINOR.PATCH\` formatında, breaking change → MAJOR, yeni özellik → MINOR, hata düzeltme → PATCH. Bu kuralları \`changesets\` aracıyla otomatikleştirdik. Her PR'da developer bir changeset dosyası oluşturur ve değişikliğin seviyesini belirtir.\n\n\`\`\`bash\n# Changeset oluşturma\nbunx changeset\n\n# Soru: Bu değişiklik hangi seviyede?\n# ○ patch — Hata düzeltme\n# ○ minor — Yeni özellik (geriye uyumlu)\n# ● major — Breaking change\n\`\`\`\n\nHer release'de otomatik oluşturulan \`CHANGELOG.md\` dosyası, tüketici projelerin geliştiricilerine hangi versiyonda ne değiştiğini net olarak gösterir.\n\n\`\`\`markdown\n## @huseyindol/ui-kit@2.0.0\n\n### Major Changes\n- **BREAKING**: Button bileşeninin 'type' prop'u 'variant' olarak yeniden adlandırıldı\n- Migration guide: type=\"primary\" → variant=\"default\"\n\n### Minor Changes\n- Yeni Badge bileşeni eklendi\n- Toast bileşenine 'duration' prop'u eklendi\n\`\`\`\n\nAyrıca lockfile stratejisi de kritiktir. Tüm projelerde \`bun.lock\` dosyası versiyon kontrolüne dahil ediliyor. Bu sayede "bende çalışıyor" mazeretleri sona eriyor, CI ortamında \`--frozen-lockfile\` flag'iyle tam deterministik build garantileniyor. PeerDependencies doğru tanımlanıyor ve React versiyon uyumsuzlukları derleme aşamasında yakalanıyor.`
      break

    case 'frontend-npmjs-ci-cd':
      customBody = `Lokal ortamda geliştirdiğimiz NPM paketini elle versiyonlamak ve teker teker registry'e atmak, insan hatasına açık ve ölçeklenemeyen bir yöntemdir. Bir keresinde developer yanlış versiyon numarasıyla publish yaptı ve downstream projelerin tamamı kırıldı. Bu olaydan sonra CI/CD pipeline'ını sıfırdan kurguladık.\n\nWorkflow'umuz iki aşamalıdır: PR aşamasında kalite kontrolü (lint, test, type-check), merge sonrasında ise otomatik publish. Her PR açıldığında GitHub Actions tetiklenir ve kodun tüm kalite kapılarından geçmesi zorunludur — tek bir test bile başarısız olursa merge butonu kilitlenir.\n\n\`\`\`yaml\n# .github/workflows/ci.yml\nname: CI/CD Pipeline\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  quality-gate:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: oven-sh/setup-bun@v1\n      - run: bun install --frozen-lockfile\n      - run: bun run lint         # ESLint kontrolü\n      - run: bun run type-check   # TypeScript doğrulama\n      - run: bun run format:check # Prettier tutarlılığı\n      - run: bun run test:ci      # Vitest + coverage\n\n  publish:\n    needs: quality-gate\n    if: github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: oven-sh/setup-bun@v1\n      - run: bun install --frozen-lockfile\n      - run: bun run build\n      - run: npm publish --access public\n        env:\n          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}\n\`\`\`\n\nBuild aşamasında \`tsup\` ile hem ESM hem CJS formatında çıktı üretiliyor, TypeScript declaration dosyaları otomatik oluşturuluyor. Publish öncesi \`npm pack --dry-run\` ile paketin içeriği kontrol ediliyor, yanlışlıkla \`node_modules\` veya test dosyalarının pakete dahil edilmesi engelleniyor.\n\nVersiyon yönetimi için \`changesets\` entegrasyonu kullanıyoruz. Developer PR'a bir changeset ekler, merge sonrasında bot otomatik olarak versiyon numarasını günceller, CHANGELOG.md'yi oluşturur ve NPM'e publish eder. Tüm süreç insan müdahalesi olmadan, deterministik ve tekrarlanabilir şekilde işliyor.\n\nBu pipeline sayesinde son 6 ayda 40+ release yaptık ve hiçbirinde manual hata yaşanmadı. Developer'ın yapması gereken tek şey: kodu yazmak, PR açmak ve review'dan geçirmek.`
      break

    case 'frontend-storybook-playground':
      customBody = `Geliştirdiğiniz bir Button bileşeninin loading, disabled, error, success, farklı boyut ve renk varyasyonlarını görmek için projeyi çalıştırıp ilgili sayfaya navigasyonla ulaşmak, o state'i manuel oluşturmak ve ekran görüntüsü almak — bu akış 10 dakikanızı alır ve tekrar edilemez. Storybook ile bu 10 dakika 5 saniyeye düşer.\n\n"Component-Driven Development" (CDD) kültürü ile her bileşeni projenin routing, state management ve API bağımlılıklarından tamamen kopararak izole bir sandbox'ta geliştiriyoruz. Storybook her bileşen için bir "hikaye" (story) dosyası tutar ve bu hikâyeler bileşenin tüm olası durumlarını sergiler:\n\n\`\`\`tsx\n// Button.stories.tsx\nimport type { Meta, StoryObj } from '@storybook/react';\nimport { Button } from './Button';\n\nconst meta: Meta<typeof Button> = {\n  title: 'UI/Button',\n  component: Button,\n  tags: ['autodocs'], // Otomatik doküman oluştur\n};\n\nexport default meta;\ntype Story = StoryObj<typeof Button>;\n\nexport const Default: Story = { args: { children: 'Kaydet' } };\nexport const Loading: Story = { args: { children: 'Yükleniyor...', isLoading: true } };\nexport const Disabled: Story = { args: { children: 'Pasif', disabled: true } };\nexport const Destructive: Story = { args: { children: 'Sil', variant: 'destructive' } };\n\`\`\`\n\nEkibin yazılımcı olmayan üyeleri — tasarımcılar, ürün sahipleri, QA mühendisleri — Storybook'un deploy edilmiş web arayüzüne girip bileşen kataloğunu sanki bir vitrin inceler gibi gezebiliyor. "Bu butonun hover rengini değiştirelim" gibi geri bildirimler, artık Slack mesajlarında değil doğrudan bileşenin yanında comment olarak bırakılıyor.\n\nStorybook aynı zamanda visual regression testing için de temel oluşturuyor: Chromatic entegrasyonuyla her PR'da bileşenlerin pixel-level karşılaştırması yapılıyor, istem dışı görsel değişiklikler anında yakalanıyor.`
      break

    case 'mobile-react-native-elly':
      customBody = `Elly mobil uygulamasının ekosistemini inşa ederken sadece performans hedeflemekle kalmadım, native hissini tam manasıyla yansıtabilecek bir navigasyon ve state iskeletine ihtiyaç dahi duyduk.

## Mimari Katman: Feature-Based Modüler Yapı

Projeyi klasik "screens → components → utils" yapısı yerine **Feature-Based Architecture** ile organize ettik. Her özellik (auth, profile, orders, notifications) kendi dizininde screen, hook, service ve type dosyalarını barındırıyor. Bu sayede bir modül üzerinde çalışan geliştirici diğer modüllere dokunmadan bağımsız ilerleyebiliyor.

\`\`\`
src/
├── features/
│   ├── auth/
│   │   ├── screens/LoginScreen.tsx
│   │   ├── hooks/useAuth.ts
│   │   ├── services/authService.ts
│   │   └── types/auth.types.ts
│   ├── orders/
│   │   ├── screens/OrderListScreen.tsx
│   │   ├── hooks/useOrders.ts
│   │   └── components/OrderCard.tsx
│   └── profile/
│       ├── screens/ProfileScreen.tsx
│       └── hooks/useProfile.ts
├── shared/
│   ├── components/   # Button, Input, Card...
│   ├── theme/         # Dark/Light token'ları
│   └── navigation/    # Root navigator
\`\`\`

## Navigation Mimarisi: Type-Safe Rotalar

React Navigation v6 ile **strongly-typed** navigation kurgusu oluşturduk. Her ekranın parametre tipi compile-time'da doğrulanıyor; yanlış parametre geçmek artık imkansız.

\`\`\`tsx
type RootStackParamList = {
  Home: undefined;
  OrderDetail: { orderId: string; source: 'list' | 'notification' };
  Profile: { userId: string };
};

// Navigate çağrısında TypeScript otomatik tamamlama ve hata yakalama
navigation.navigate('OrderDetail', { orderId: '123', source: 'list' });
\`\`\`

Nested Navigator yapısında Tab Navigator içinde Stack Navigator'lar kullanarak bottom tab'lar arasında bağımsız navigation stack'leri oluşturduk. Deep linking konfigürasyonu ile push notification'lardan doğrudan ilgili ekrana yönlendirme sağlanıyor.

## Tema Sistemi: Design Token Yaklaşımı

Elly'nin karanlık mod desteği sadece renk değişimi değil, tam bir **Design Token** sistemi üzerine kurulu. Spacing, typography, shadow ve border-radius değerleri tema bazlı değişiyor.

\`\`\`tsx
const theme = {
  dark: {
    colors: {
      background: '#0A0A0F',
      surface: '#1A1A2E',
      primary: '#6C63FF',
      text: '#E4E4E7',
      textSecondary: '#9CA3AF',
      border: '#2D2D44',
    },
    shadows: {
      card: { shadowColor: '#000', shadowOpacity: 0.4, elevation: 8 },
    },
  },
  light: {
    colors: {
      background: '#FAFAFA',
      surface: '#FFFFFF',
      primary: '#4F46E5',
      text: '#18181B',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
    },
    shadows: {
      card: { shadowColor: '#000', shadowOpacity: 0.08, elevation: 2 },
    },
  },
};
\`\`\`

\`useColorScheme()\` hook'u ile cihazın sistem temasını dinliyor ve \`ThemeContext\` üzerinden tüm uygulamaya yayıyoruz. Kullanıcı tercihini AsyncStorage'da saklayarak "sistem teması / manuel seçim" opsiyonu sunuyoruz.

## Form Yönetimi: React Hook Form + Zod

Mobilde form deneyimi web'den çok farklıdır; klavye yönetimi, scroll davranışı ve validation feedback'i kritiktir. React Hook Form ile \`Controller\` pattern'ini kullanarak her input'u kontrol altına aldık.

\`\`\`tsx
const schema = z.object({
  email: z.string().email('Geçerli bir e-posta giriniz'),
  phone: z.string().regex(/^05\\d{9}$/, 'Geçerli bir telefon numarası giriniz'),
});

function RegisterForm() {
  const { control, handleSubmit } = useForm({ resolver: zodResolver(schema) });

  return (
    <KeyboardAwareScrollView>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
    </KeyboardAwareScrollView>
  );
}
\`\`\`

## Sonuç: Cross-Platform Tutarlılık

Android ve iOS platformları için devasa iki farklı kod tabanı yönetmek yerine, tek bir mantıksal merkezden çıkan ve her iki ekosistemde de performanslı derlenen, kurumsal, taze bir form ve bileşen mimarisi kurulmuş oldu. Platform-specific davranışlar \`Platform.select()\` ile cerrahi müdahale seviyesinde ayrıştırılıyor, geri kalan %95 kod tamamen paylaşımlı.`
      break

    case 'mobile-react-native-performance':
      customBody = `React Native'in tartışmasız en büyük kronik rahatsızlıklarından biri çok miktarda kaydırılabilir veriyi (Infinite Fetch/List) ekrana dizerken yaşanan tıkanmalar ve RAM tüketimidir. Bunun için doğru render optimizasyonuna yönelmek zorundayız.

## FlatList Konfigürasyon Stratejisi

Kullanıcıların yüzlerce öğeyi "pürüzsüz" ve 0 frame-drop ile kaydırabilmesi için FlatList komponentini spesifik render kotalarıyla entegre ediyoruz. Her prop'un performans üzerindeki etkisini ölçerek optimum değerleri belirledik.

\`\`\`tsx
<FlatList
  data={feed}
  keyExtractor={item => item.id}
  renderItem={renderItem}
  // Ekran dışında render edilecek görünmez alan sayısı
  windowSize={11}
  initialNumToRender={10}
  maxToRenderPerBatch={5}
  // Sabit yükseklikli item'larda scroll hesaplamasını optimize eder
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  // Scroll durduğunda render tetiklenmesini geciktir
  updateCellsBatchingPeriod={50}
  removeClippedSubviews={true}
/>
\`\`\`

\`windowSize\` değeri ne kadar düşükse RAM'den o kadar tasarruf edilir ancak hızlı kaydırmada beyaz ekran (blank flash) riski artar. Projemizde 11 değeri ile optimal dengeyi bulduk.

## Memoization: Gereksiz Re-render'ların Önlenmesi

List Item'leri \`React.memo\` ile sarmak işin en kritik virajıdır. Ancak memo tek başına yetmez; callback referanslarının da stabilize edilmesi gerekir.

\`\`\`tsx
const OrderItem = memo(({ item, onPress }: OrderItemProps) => {
  return (
    <Pressable onPress={() => onPress(item.id)}>
      <Text>{item.title}</Text>
      <Text>{item.price}</Text>
    </Pressable>
  );
});

// Parent component'te callback stabilizasyonu
const handlePress = useCallback((id: string) => {
  navigation.navigate('OrderDetail', { orderId: id });
}, [navigation]);

const renderItem = useCallback(
  ({ item }: { item: Order }) => <OrderItem item={item} onPress={handlePress} />,
  [handlePress]
);
\`\`\`

## Görsel Optimizasyonu: Image Caching ve Placeholder

Liste içindeki görseller en büyük performans katilidir. \`react-native-fast-image\` ile HTTP cache ve memory cache katmanları oluşturuyoruz.

\`\`\`tsx
import FastImage from 'react-native-fast-image';

<FastImage
  source={{
    uri: item.imageUrl,
    priority: FastImage.priority.normal,
    cache: FastImage.cacheControl.immutable,
  }}
  style={{ width: 80, height: 80, borderRadius: 8 }}
  resizeMode={FastImage.resizeMode.cover}
/>
\`\`\`

Ayrıca backend tarafında thumbnail versiyonları (80x80, 160x160) üretilerek listeye küçük boyutlu görseller yükleniyor, detay ekranına geçildiğinde full-size görsel lazy load ediliyor.

## Infinite Scroll ve Pagination

Binlerce kayıt içeren listelerde tüm veriyi tek seferde çekmek yerine cursor-based pagination kullanıyoruz. TanStack Query'nin \`useInfiniteQuery\` hook'u ile entegrasyon sağlanıyor.

\`\`\`tsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ['orders'],
  queryFn: ({ pageParam = 0 }) => fetchOrders({ cursor: pageParam, limit: 20 }),
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
});

<FlatList
  data={data?.pages.flatMap(page => page.items) ?? []}
  onEndReached={() => hasNextPage && fetchNextPage()}
  onEndReachedThreshold={0.5}
  ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
/>
\`\`\`

## Performans Ölçümü: Flipper ve Profiling

Optimizasyonların gerçekten işe yarayıp yaramadığını ölçmek için Flipper'ın Performance plugin'ini ve React DevTools Profiler'ı kullanıyoruz. JS frame rate ve UI frame rate metriklerini ayrı ayrı izleyerek darboğazın hangi thread'de olduğunu tespit ediyoruz.

Yüksek resource'lu görsel medyalarla bile uygulamanın FPS çökmesini bertaraf edebiliyor, kullanıcının sanki native Kotlin/Swift dilinde yazılmış bir uygulamada geziyormuş hissiyatını güçlendiriyoruz.`
      break

    case 'mobile-react-native-animations':
      customBody = `Profesyonel mobil ürünleri rakiplerinden ayırt eden şey işlevi kadar sunduğu mikro-etkileşimler (Micro-animations) ve pürüzsüz geri bildirim dokularıdır. Ancak React Native JS ipliği animasyonlar için çok yavaştır.

## JS Thread vs UI Thread: Neden Animated API Yetmez?

React Native'in yerleşik \`Animated\` API'si her frame'de JS thread ile UI thread arasında bridge üzerinden iletişim kurar. Bu köprü geçişi ~5ms gecikme yaratır ve karmaşık animasyonlarda frame drop kaçınılmazdır. Reanimated 3 ise animasyon mantığını tamamen **UI thread'ine** (native taraf) taşıyarak bu darboğazı ortadan kaldırır.

\`\`\`
[Animated API]
JS Thread → Bridge → UI Thread (her frame'de köprü geçişi = jank)

[Reanimated 3]
Worklet → UI Thread (doğrudan native çalışma = 60FPS)
\`\`\`

## Shared Values ve Worklet'ler

Reanimated'in temel yapı taşı \`useSharedValue\` ve \`useAnimatedStyle\` hook'larıdır. Shared value'lar UI thread'de yaşar ve JS thread'i bloklamadan animasyonları yönetir.

\`\`\`tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

function AnimatedCard({ onPress }: Props) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(0.8, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 100 });
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {/* Card content */}
      </Animated.View>
    </Pressable>
  );
}
\`\`\`

## Gesture Handler Entegrasyonu

\`react-native-gesture-handler\` v2 ile Reanimated'i birleştirerek dokunma, sürükleme ve fırlatma hareketlerini 60FPS'de işliyoruz. Swipe-to-delete gibi etkileşimler artık native hissiyatla çalışıyor.

\`\`\`tsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

function SwipeableRow({ onDelete, children }: Props) {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = Math.min(0, event.translationX);
    })
    .onEnd(() => {
      if (translateX.value < -120) {
        translateX.value = withSpring(-200);
        runOnJS(onDelete)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={rowStyle}>{children}</Animated.View>
    </GestureDetector>
  );
}
\`\`\`

## Layout Animations: Entering ve Exiting

Reanimated 3'ün layout animation API'si ile liste elemanlarının eklenmesi ve silinmesi sırasında otomatik geçiş animasyonları uyguluyoruz. Tek satır kod ile profesyonel sonuçlar elde ediliyor.

\`\`\`tsx
import Animated, {
  FadeInDown,
  FadeOutLeft,
  LinearTransition,
} from 'react-native-reanimated';

function NotificationList({ items }: Props) {
  return (
    <Animated.FlatList
      data={items}
      itemLayoutAnimation={LinearTransition}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={FadeInDown.delay(index * 50).springify()}
          exiting={FadeOutLeft.duration(300)}
        >
          <NotificationCard item={item} />
        </Animated.View>
      )}
    />
  );
}
\`\`\`

## Spring vs Timing: Doğru Easing Seçimi

Her animasyon türü için doğru easing fonksiyonu seçmek UX kalitesini belirler. Temel kuralımız: **kullanıcı etkileşimi sonucu tetiklenen animasyonlarda spring**, **otomatik/sistem animasyonlarında timing** kullanmak.

| Senaryo | Animasyon Tipi | Neden? |
|---------|---------------|--------|
| Buton basma | \`withSpring\` | Doğal geri sekme hissi |
| Sayfa geçişi | \`withTiming + Easing.bezier\` | Kontrollü ve öngörülebilir |
| Pull-to-refresh | \`withSpring\` | Elastik geri dönüş |
| Toast bildirimi | \`withTiming\` | Sabit sürede giriş/çıkış |

Kullanıcının tıkladığı nesnenin yumuşakça esnemesi, sayfalar arasındaki sürükleme ivmesinin parmak hızını algılayıp tepki vermesi, UI/UX deneyimi açısından ürünümüzün kalitesini premium segmente yükseltti.`
      break

    case 'ai-mcp-integration':
      customBody = `Şirketinizdeki çok değerli backend metrikleri ya da CI/CD süreçlerinizi yöneten araçlarınız yapay zekanın doğrudan müdahalesine tamamen uzağa konuşlandırılmış durumda. Bunu kırmanın anahtarı kendi özel MCP sunucunuzu (Server) inşa etmektir.

## MCP Server Anatomisi

Bir MCP sunucusu temelinde JSON-RPC 2.0 protokolü üzerinden iletişim kuran bir servistir. İki transport yöntemi desteklenir: **stdio** (yerel geliştirme için) ve **SSE/Streamable HTTP** (uzak sunucular için). Sunucu, model'e hangi araçların mevcut olduğunu bildirir ve model bu araçları çağırdığında sonuçları döner.

\`\`\`
MCP Server Yaşam Döngüsü:
1. initialize    → Sunucu yeteneklerini bildir
2. tools/list    → Mevcut araçları listele
3. tools/call    → Model bir aracı çağırır
4. resources/read → Model bir kaynağı okur
5. shutdown      → Bağlantıyı kapat
\`\`\`

## TypeScript ile MCP Server Geliştirme

Node.js tarafında \`@modelcontextprotocol/sdk\` paketi ile hızlıca bir MCP sunucusu ayağa kaldırabilirsiniz. Aşağıda gerçek projemizden basitleştirilmiş bir örnek:

\`\`\`ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'elly-backend-tools',
  version: '1.0.0',
});

// Tool tanımlama: Fatura detayı sorgulama
server.tool(
  'get_invoice',
  'Belirtilen fatura ID ile fatura detaylarını getirir',
  { invoiceId: z.string().describe('Fatura ID') },
  async ({ invoiceId }) => {
    const response = await fetch(
      process.env.API_BASE_URL + '/api/v1/invoices/' + invoiceId,
      { headers: { Authorization: 'Bearer ' + process.env.API_TOKEN } }
    );
    const invoice = await response.json();
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(invoice, null, 2),
      }],
    };
  }
);

// Tool: Son hataları listele
server.tool(
  'list_recent_errors',
  'Son N dakikadaki uygulama hatalarını listeler',
  {
    minutes: z.number().default(60).describe('Kaç dakikalık hata logu'),
    severity: z.enum(['ERROR', 'WARN', 'CRITICAL']).default('ERROR'),
  },
  async ({ minutes, severity }) => {
    const errors = await queryErrorLogs(minutes, severity);
    return {
      content: [{
        type: 'text',
        text: formatErrorReport(errors),
      }],
    };
  }
);

// Resource: Sistem metrikleri
server.resource(
  'system://metrics',
  'Anlık sistem performans metrikleri',
  async () => ({
    contents: [{
      uri: 'system://metrics',
      mimeType: 'application/json',
      text: JSON.stringify(await getSystemMetrics()),
    }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

## Java Spring Boot ile MCP Server

Backend ekibimizin Java tarafında Spring Boot ile MCP sunucusu geliştirmesi de mümkün. Spring AI projesinin MCP desteği sayesinde mevcut REST controller'larınızı MCP tool'larına dönüştürmek son derece kolay.

\`\`\`java
@McpTool(description = "Müşteri siparişlerini sorgular")
public class OrderSearchTool {

    @Tool("search_orders")
    public List<OrderDTO> searchOrders(
        @Param("customerId") String customerId,
        @Param("status") OrderStatus status
    ) {
        return orderService.findByCustomerAndStatus(customerId, status);
    }
}
\`\`\`

## Gerçek Dünya Kullanım Senaryoları

Projelerde yarattığımız bu interaktif AI proxy'si sayesinde:

- **Müşteri Hizmetleri:** Agent, müşteri ID'siyle sipariş geçmişini sorgulayıp doğal dilde özetleyebiliyor
- **DevOps Analizi:** CI/CD pipeline hatalarını otomatik analiz edip çözüm önerileri sunuyor
- **Log İnceleme:** Binlerce satırlık log dosyasından anlamlı pattern'leri çıkarıyor
- **Veritabanı Sorguları:** Doğal dildeki soruları SQL'e çevirip güvenli bir şekilde çalıştırıyor

**Detaylı inceleme ve açık kaynak (Open Source) kodları için GitHub repomuza göz atmayı unutmayın:**
[McpProjectScaffold - Github Reposunu İnceleyin](https://github.com/huseyindol/McpProjectScaffold)`
      break

    case 'ai-mcp-security':
      customBody = `Bir LLM asistanının sisteminizin derinliklerine erişebilmesi muazzam bir güç olsa da; veri tabanına DROP komutu gönderebilecek olmaları ya da finansal bilgileri yanlış yetkiyle çekmeleri ölümcül güvenlik zafiyetleridir.

## Tehdit Modeli: AI Erişiminde Riskler

MCP sunucusu aracılığıyla LLM'lerin sistemlerinize erişim sağlaması, yeni bir tehdit yüzeyi oluşturur. Bu riskleri üç kategoride değerlendiriyoruz:

| Risk Kategorisi | Örnek | Etki |
|----------------|-------|------|
| **Prompt Injection** | Kullanıcı input'u üzerinden kötü niyetli komut enjeksiyonu | Model'in yetkisiz işlem yapması |
| **Over-Privileged Access** | Tüm DB tablolarına yazma yetkisi verilmesi | Veri kaybı veya bozulması |
| **Data Exfiltration** | Model'in hassas verileri yanıtlarına dahil etmesi | Gizlilik ihlali |
| **Hallucination Risk** | Model'in var olmayan bir API endpoint'i çağırması | Sistem kararsızlığı |

## Read-Only vs Mutation: Yetki Katmanları

Model Context Protocol içerisinde araçları **okuma** (read-only) ve **yazma** (mutation) olarak izole ediyoruz. Okuma araçları serbest çalışırken, yazma araçları ek güvenlik katmanlarından geçer.

\`\`\`ts
// Güvenlik katmanı: Tool çağrılarını sınıflandır
const TOOL_PERMISSIONS = {
  // Read-only: Serbest çalışabilir
  get_invoice: { level: 'read', requiresApproval: false },
  search_orders: { level: 'read', requiresApproval: false },
  list_errors: { level: 'read', requiresApproval: false },

  // Mutation: Human approval gerektirir
  update_order_status: { level: 'write', requiresApproval: true },
  delete_record: { level: 'write', requiresApproval: true },
  restart_service: { level: 'admin', requiresApproval: true },
};

// Middleware: Her tool çağrısında yetki kontrolü
function authorizeToolCall(toolName: string, context: RequestContext) {
  const permission = TOOL_PERMISSIONS[toolName];

  if (permission.level === 'admin' && !context.user.isAdmin) {
    throw new ForbiddenError('Bu işlem admin yetkisi gerektirir');
  }

  if (permission.requiresApproval) {
    return requestHumanApproval(toolName, context);
  }

  return { approved: true };
}
\`\`\`

## Human-In-The-Loop Mimarisi

Riskli görülen işlemlerde model, doğrudan eyleme geçmek yerine bir onay akışı tetikler. Kurumsal senaryolarda "Sistemi Yeniden Başlat" veya "Kullanıcı Kaydını Sil" gibi işlemlerde model önce yetkili bir developer'dan onay düğmesine basmasını şart koşuyor.

\`\`\`
Kullanıcı: "Hatalı siparişi iptal et"
     │
     ▼
[LLM Analizi] → Sipariş #12345 tespit edildi
     │
     ▼
[MCP Tool: cancel_order] → requiresApproval: true
     │
     ▼
[Slack Notification] → "Agent sipariş #12345'i iptal etmek istiyor. Onaylıyor musunuz?"
     │
     ▼
[Developer Onayı] → ✅ Approved / ❌ Rejected
     │
     ▼
[İşlem Yürütülür veya Reddedilir]
\`\`\`

## Input Sanitization ve Output Filtering

Prompt injection saldırılarına karşı, tool parametrelerine gelen her değer Zod şemaları ile doğrulanıyor. SQL injection girişimleri parametrize sorgularla engellenirken, model çıktılarında PII (Personally Identifiable Information) filtreleme uygulanıyor.

\`\`\`ts
// Input sanitization
const invoiceSearchSchema = z.object({
  query: z.string()
    .max(200)
    .regex(/^[a-zA-Z0-9\\s\\-]+$/, 'Özel karakter içeremez'),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
});

// Output filtering: Hassas alanları maskele
function sanitizeOutput(data: Record<string, unknown>) {
  const sensitiveFields = ['ssn', 'creditCard', 'password', 'apiKey'];
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) =>
      sensitiveFields.includes(key) ? [key, '***MASKED***'] : [key, value]
    )
  );
}
\`\`\`

## Audit Logging ve İzlenebilirlik

Her MCP tool çağrısı merkezi bir audit log'a kaydediliyor. Kim, ne zaman, hangi tool'u, hangi parametrelerle çağırdı ve sonuç ne oldu — tüm bu bilgiler traceability için saklanıyor. Anomali tespit sistemi, normal dışı çağrı kalıplarında (örneğin kısa sürede çok sayıda silme işlemi) otomatik alarm üretiyor.

Uygulanan sandbox ve onaya dayalı otomasyonlar (Safe-to-Run) devrim yaratırken, mimarimizin kontrolden çıkarak şirket zararlısına dönüşmesi ve halüsinasyon gören model tehlikesinin kökünü güvenli bir filtre ile kazımış oluyoruz.`
      break

    case 'ai-agents-workflow':
      customBody = `Yakın geçmişte geliştiriciler manuel terminal betiklerine bağımlıydı. Ancak bugün, hata bildirimleri üzerinden otonom şekilde projeyi tarayıp düzeltebilen, testleri koşup PR açan "Agentic Workflow" mimarisine ulaştık.

## Agentic Workflow Nedir?

Klasik yazılım geliştirmede döngü şöyledir: developer kodu yazar → test eder → hata bulur → düzeltir → commit eder → review ister. Agentic workflow'da bu adımların büyük kısmı otonom agent'lar tarafından yürütülür. Developer'ın rolü **yönetici ve denetçi** olmaya evrilir.

\`\`\`
Klasik Akış:
Developer → Kod Yaz → Test Et → Debug → Fix → PR → Review

Agentic Akış:
Developer → Talimat Ver → [Agent: Kod Yaz + Test Et + Fix] → Review → Merge
\`\`\`

## Pratikte Agent Kullanım Senaryoları

Elly projesinde agent'ları günlük iş akışımıza entegre ettik. İşte gerçek senaryolardan örnekler:

**Senaryo 1 — Bug Fix Otomasyonu:**
Sentry'den gelen bir hata bildirimi agent'a iletiliyor. Agent ilgili dosyaları tarayıp hatanın kaynağını tespit ediyor, fix yazıyor, ilgili test'i güncelliyor ve PR açıyor.

\`\`\`
Input: "TypeError: Cannot read property 'name' of undefined at OrderCard.tsx:42"

Agent Akışı:
1. OrderCard.tsx dosyasını oku → 42. satırdaki null reference'ı tespit et
2. order.customer?.name şeklinde optional chaining ekle
3. İlgili test dosyasını bul → null case için test ekle
4. bun run test:ci → testleri çalıştır → PASS
5. PR aç: "fix: handle null customer in OrderCard"
\`\`\`

**Senaryo 2 — Kod Review Asistanı:**
PR açıldığında agent otomatik olarak değişiklikleri analiz ediyor: güvenlik zaafiyetleri, performans sorunları, naming convention ihlalleri ve test coverage eksiklikleri raporlanıyor.

**Senaryo 3 — Refactoring Desteği:**
"Bu modüldeki tüm class component'leri functional component'e çevir" gibi geniş kapsamlı talimatlar veriliyor ve agent dosya dosya dönüşümü yapıyor.

## Agent Teams: Paralel Çalışma Modeli

Tek bir agent yerine, farklı uzmanlık alanlarına sahip agent takımları kullanıyoruz. Bu projede uyguladığımız takım yapısı:

\`\`\`
┌─────────────────┐
│   Team Lead     │  → Görevi alt task'lara böler
│   (Orchestrator)│
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    ▼         ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│  Test  │ │Security│ │  UI    │ │ Perf   │
│ Writer │ │Reviewer│ │Reviewer│ │Reviewer│
└────────┘ └────────┘ └────────┘ └────────┘
\`\`\`

Her agent kendi sorumluluğundaki dosyalarda çalışır, aynı dosyaya birden fazla agent yazamaz (conflict önleme). Bulgular yapılandırılmış formatta (impact, location, issue, fix) raporlanır.

## CLAUDE.md: Agent'ın Hafızası

Agent'ların projeyi anlaması için \`CLAUDE.md\` dosyası kritik öneme sahiptir. Bu dosya projenin tech stack'ini, kodlama kurallarını, dizin yapısını ve kaçınılması gereken anti-pattern'leri içerir. Agent her oturum başında bu dosyayı okuyarak projenin bağlamını kavrar.

Junior ya da Senior ayırt etmeksizin tüm ekibin sadece bir kodlayıcıdan ziyade, bir planlayıcı ve Geliştirici Mühendis gibi projeye geniş tepeden bakabilen mimar seviyesine yükselmesi artık bu akışlarla saatler değil dakikalar alıyor.`
      break

    case 'ai-agents-future':
      customBody = `Frontend ve yazılım mimarisinin geleceği salt kod üretiminden çekilip; "Talimatı analiz eden, dizaynı UI koduna ve Storybook'una kadar döken" sistem orkestrasyonuna doğru çok büyük bir kırılma yaşıyor.

## Bugünden Yarına: Paradigma Değişimi

Yazılım geliştirmenin evrimini üç döneme ayırabiliriz:

\`\`\`
Dönem 1 (2000-2020): Manuel Kodlama
  Developer her satırı elle yazar.
  Araçlar: IDE, StackOverflow, dokümantasyon

Dönem 2 (2020-2025): AI-Assisted Kodlama
  AI satır/blok tamamlar, developer yönlendirir.
  Araçlar: Copilot, ChatGPT, Claude

Dönem 3 (2025+): AI-Orchestrated Geliştirme
  AI modülleri tasarlar ve uygular, developer denetler.
  Araçlar: Agent sistemleri, MCP, otonom pipeline'lar
\`\`\`

Şu anda Dönem 2'den Dönem 3'e geçiş yaşanıyor. Bu geçişin en belirgin işareti: developer'ın "nasıl yazılacağı" yerine "ne yazılacağı" sorusuna odaklanması.

## Figma-to-Code: Tasarımdan Üretime

Agent'ların yakın gelecekteki en güçlü yeteneği, bir ürün yöneticisinin Figma tasarım dosyasını okuyarak tam bir uygulama iskeleti oluşturması olacak.

\`\`\`
Figma Design Token'ları
     │
     ▼
[AI Design Analyzer]
     │
     ├── Renk paleti → Tailwind theme config
     ├── Tipografi → Font system
     ├── Spacing → Design tokens
     ├── Component yapısı → React bileşenleri
     └── Responsive kurallar → Media queries
     │
     ▼
Tam Çalışan React + Storybook Projesi
\`\`\`

Bu vizyonun ilk adımları zaten gerçekleşiyor. Vercel'in v0 aracı, doğal dildeki açıklamalardan React bileşenleri üretiyor. Ancak asıl devrim, bileşen üretiminin ötesinde **tam sistem mimarisi** scaffold'ı seviyesine çıkacak.

## Frontend Developer'ın Yeni Rolü

Bu paradigma değişimiyle Frontend geliştiricilerin rolü fundamentel biçimde dönüşüyor:

**Eski Rol — Kod Zanaat Ustası:**
- Pixel-perfect CSS yazma
- State management karmaşıklığıyla boğuşma
- Cross-browser uyumluluk testleri
- Bundle size optimizasyonu

**Yeni Rol — Sistem Revizörü:**
- AI çıktılarını review ve doğrulama
- Mimari kararları yönlendirme
- Güvenlik sınırlarını regüle etme
- Kullanıcı deneyimi kalite güvencesi
- AI agent'ları koordine ve orkestre etme

\`\`\`
Developer'ın Yeni Sorumluluk Dağılımı (2026):
  %30 — AI çıktı review ve kalite kontrol
  %25 — Mimari tasarım ve sistem kararları
  %20 — Prompt engineering ve agent konfigürasyonu
  %15 — Karmaşık/kritik kod yazımı (AI'ın zorlandığı alanlar)
  %10 — Kullanıcı araştırması ve UX kararları
\`\`\`

## Hazırlıklı Olmak İçin Ne Yapmalı?

Bu dönüşüme hazırlanmak için önerilerim:

1. **MCP ve Agent SDK'larını öğrenin** — Yapay zeka araçlarını entegre etme becerisi, kod yazma becerisinden daha değerli hale gelecek.
2. **Sistem düşüncesi geliştirin** — Tek dosya yerine tüm sistemi anlama yetkinliği kritik.
3. **Review kültürünü güçlendirin** — AI çıktılarını değerlendirme, hataları yakalama ve kalite standartlarını koruma becerisi.
4. **Domain uzmanlığını derinleştirin** — AI genel kod yazabilir, ama iş mantığını anlamak hala insana ait.

Bu paradigma değişimiyle Frontend geliştiricilerin bizzat kodu kazıyan madenciler olmaktan ziyade sisteme direktif veren, sınırları regüle eden ve güvenlik mimarilerini onaylayan "Sistem Revizörleri" olarak çok daha stratejik ve zeki roller alacağı ortadadır.`
      break

    default:
      customBody = `Geliştirmelerim sırasında deneyimlediğim mimarilerin sağlam bir altyapı oluşturduğuna inanıyorum. Bu nedenle modern yazılım araçlarını yakından takip ediyoruz.\n\nTeknik tecrübeler, hata yapılan production ortamlarında saatlerce yapılan debug işlemlerinin sonucunda vücut bulur. Bu sebeple buradaki notların sadece teori değil, prodüksiyonda tecrübe edinilmiş bilgilerden harmanlandığını bilmelisiniz.\n\nYakın zamanda bu spesifik konuyla ilgili daha detaylı örnek testlerimi ve kod arşivimi yayınlayacağım. Bizi takip etmeye devam edin.`
      break
  }

  const mdxString = [
    '---',
    `title: "${article.title.replace(/"/g, '\\"')}"`,
    `description: "${article.content.substring(0, 100).replace(/"/g, '\\"')}..."`,
    `publishedAt: '${article.publishedAt}'`,
    `category: '${article.category}'`,
    `author: '${article.author}'`,
    `coverImage: '${article.coverImage}'`,
    `readingTime: '${article.readingTime}'`,
    article.order ? `order: ${article.order}` : `order: 99`,
    '---',
    '',
    `Bu makale **${article.category}** alanındaki deneyimlerimi ve yazılım geliştirme metodolojimi aktarmaktadır.\n`,
    '## Genel Bakış\n',
    `> ${article.content}\n`,
    customBody,
    '\n---\n*Bu içerik kişisel geliştirme laboratuvarımdan ve prodüksiyon maceralarımdan derlenmiştir.*',
  ].join('\n')

  const filePath = path.join(blogDir, article.slug + '.mdx')
  fs.writeFileSync(filePath, mdxString)
})

console.log('Successfully generated ' + articlesData.length + ' articles.')
