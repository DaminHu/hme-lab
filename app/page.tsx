import Link from 'next/link'
import { CheckSquare, Map, Swords, FlaskConical } from 'lucide-react'

const tools = [
  {
    href: '/checklist',
    Icon: CheckSquare,
    title: '裝備清單產生器',
    desc: '依路線類型、天數、季節、性別，自動產生個人化裝備清單，可勾選與分享。',
    tag: '免費使用',
  },
  {
    href: '/routes',
    Icon: Map,
    title: '登山路線圖鑑',
    desc: '精選台灣熱門登山路線，附難度、爬升、時間等資訊，找到適合你的路線。',
    tag: '持續更新',
  },
  {
    href: '/game',
    Icon: Swords,
    title: '戶外求生挑戰',
    desc: '文字冒險遊戲，模擬山林突發狀況，考驗你的戶外判斷力，寓教於樂。',
    tag: '互動遊戲',
  },
]

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-forest mb-4">
          <FlaskConical size={32} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-soil tracking-tight mb-4">
          HME Lab
        </h1>
        <p className="text-stone text-lg max-w-xl mx-auto leading-relaxed">
          戶外人的免費工具集。裝備清單、路線資訊、求生挑戰，讓你的每次出發更有準備。
        </p>
      </div>

      {/* Tool cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {tools.map(({ href, Icon, title, desc, tag }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white border border-sand rounded-3xl p-6 hover:border-bark hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-forest/8 rounded-2xl flex items-center justify-center">
                <Icon size={20} className="text-forest" strokeWidth={1.8} />
              </div>
              <span className="text-[10px] bg-sand text-stone px-2 py-1 rounded-full font-medium">{tag}</span>
            </div>
            <h2 className="font-semibold text-soil text-base mb-2 group-hover:text-forest transition-colors">{title}</h2>
            <p className="text-stone text-sm leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>

      {/* HME promo */}
      <div className="bg-forest rounded-3xl px-8 py-8 text-center text-white">
        <p className="text-white/50 text-sm mb-2 uppercase tracking-widest font-medium">Powered by</p>
        <h2 className="text-2xl font-bold mb-3">HME 戶外用品</h2>
        <p className="text-white/70 text-sm mb-5 max-w-md mx-auto">
          專業戶外裝備選品，Snow Peak、Arc&apos;teryx、Nanga、Osprey，為你的每次冒險做好準備。
        </p>
        <a
          href="https://www.hme.tw/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-forest font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-cream transition-colors"
        >
          前往官網選購
        </a>
      </div>
    </div>
  )
}
