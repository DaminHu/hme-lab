import Link from 'next/link'

const tools = [
  {
    href: '/checklist',
    icon: '☑',
    title: '裝備清單產生器',
    desc: '依路線類型、天數、季節、性別，自動產生個人化裝備清單，可勾選與分享。',
    tag: 'FREE',
    num: '01',
  },
  {
    href: '/routes',
    icon: '⊞',
    title: '登山路線圖鑑',
    desc: '精選台灣熱門登山路線，附難度、爬升、時間等資訊，找到適合你的路線。',
    tag: 'NEW',
    num: '02',
  },
  {
    href: '/game',
    icon: '⚔',
    title: 'WHAT IF',
    desc: '文字冒險遊戲，模擬山林突發狀況，考驗你的戶外判斷力，寓教於樂。',
    tag: 'PLAY',
    num: '03',
  },
]

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* Hero */}
      <div className="text-center mb-16">
        <p className="pixel-font text-[8px] text-stone mb-6 tracking-widest">▓▓▓ HME OUTDOOR ▓▓▓</p>
        <h1 className="pixel-font text-xl md:text-3xl text-forest mb-3 cursor">
          HME Lab
        </h1>
        <p className="pixel-font text-[8px] text-stone/60 mb-6 tracking-widest">── 戶外人的免費工具集 ──</p>
        <p className="text-stone text-sm max-w-md mx-auto leading-relaxed">
          裝備清單、路線資訊、求生挑戰，讓你的每次出發更有準備。
        </p>
        <p className="pixel-font text-[8px] text-moss mt-8 tracking-widest">
          ▼ SELECT YOUR TOOL ▼
        </p>
      </div>

      {/* Tool cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-16">
        {tools.map(({ href, icon, title, desc, tag, num }) => (
          <Link
            key={href}
            href={href}
            className="group bg-cream-dark border-2 border-sand p-5 hover:border-forest transition-all hover:shadow-[4px_4px_0_0_#4ADE80] relative"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="pixel-font text-[8px] text-stone-light">{num}</span>
              <span className="pixel-font text-[7px] border border-moss/40 text-moss px-2 py-1">[{tag}]</span>
            </div>
            <div className="w-10 h-10 bg-forest/10 border border-forest/25 flex items-center justify-center mb-4 text-xl">
              {icon}
            </div>
            <h2 className="text-soil text-xs mb-2 group-hover:text-forest transition-colors">{title}</h2>
            <p className="text-stone text-xs leading-relaxed">{desc}</p>
            <p className="pixel-font text-[7px] text-forest/0 group-hover:text-forest/70 mt-3 transition-colors">▶ ENTER</p>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <p className="pixel-font text-[7px] text-sand text-center mb-10 tracking-widest">
        ████████████████████████████████████████
      </p>

      {/* HME promo */}
      <div className="bg-cream-dark border-2 border-forest px-8 py-8 text-center shadow-[4px_4px_0_0_#22C55E]">
        <p className="pixel-font text-[8px] text-forest/70 mb-3 tracking-widest">★ POWERED BY ★</p>
        <h2 className="text-xl mb-3 text-soil">HME 戶外用品</h2>
        <p className="text-stone text-xs mb-6 max-w-md mx-auto leading-relaxed">
          Snow Peak、Arc&apos;teryx、Nanga、Osprey，為你的每次冒險做好準備。
        </p>
        <a
          href="https://www.hme.tw/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block pixel-font text-[9px] bg-forest text-cream font-bold px-6 py-3 hover:bg-forest-dark transition-colors border-b-4 border-forest-dark hover:border-b-0 hover:translate-y-1"
        >
          ▶ 前往官網選購
        </a>
      </div>

      <p className="pixel-font text-[7px] text-stone/30 text-center mt-10 tracking-widest">
        © {new Date().getFullYear()} HME LAB v1.0
      </p>
    </div>
  )
}
