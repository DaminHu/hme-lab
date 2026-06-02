'use client'
import { useState } from 'react'
import { routes, difficultyMap, type Route as RouteType } from '@/data/routes'

const difficultyOptions = [
  { value: 'all', label: '全部難度' },
  { value: 'easy', label: '入門' },
  { value: 'moderate', label: '中級' },
  { value: 'hard', label: '進階' },
  { value: 'expert', label: '高手' },
]

const regionOptions = ['全部地區', ...Array.from(new Set(routes.map(r => r.region)))]

function RouteCard({ route }: { route: RouteType }) {
  const [open, setOpen] = useState(false)
  const diff = difficultyMap[route.difficulty]

  return (
    <div className="bg-cream-dark border border-sand rounded-2xl overflow-hidden">
      <button
        className="w-full text-left px-5 py-4 hover:bg-cream/50 transition-colors"
        onClick={() => setOpen(v => !v)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="font-semibold text-soil text-base">{route.name}</h2>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${diff.color}`}>{diff.label}</span>
            </div>
            <p className="text-xs text-stone">{route.region}</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-stone shrink-0">
            <span className="hidden sm:flex items-center gap-1">▲ {route.elevation.toLocaleString()}m</span>
            <span className="hidden sm:flex items-center gap-1">◷ {route.duration}</span>
            <span className="text-bark pixel-font text-[10px]">{open ? '▲' : '▼'}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-3 text-xs text-stone sm:hidden">
          <span className="flex items-center gap-1">▲ {route.elevation.toLocaleString()}m</span>
          <span className="flex items-center gap-1">◷ {route.duration}</span>
          <span className="flex items-center gap-1">→ {route.distance}km</span>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-4 border-t border-sand">
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="bg-cream rounded-xl p-3 text-center">
              <div className="text-xs text-stone mb-0.5">最高海拔</div>
              <div className="font-semibold text-soil text-sm">{route.elevation.toLocaleString()}m</div>
            </div>
            <div className="bg-cream rounded-xl p-3 text-center">
              <div className="text-xs text-stone mb-0.5">爬升高度</div>
              <div className="font-semibold text-soil text-sm">+{route.gain.toLocaleString()}m</div>
            </div>
            <div className="bg-cream rounded-xl p-3 text-center">
              <div className="text-xs text-stone mb-0.5">來回距離</div>
              <div className="font-semibold text-soil text-sm">{route.distance}km</div>
            </div>
          </div>

          <p className="text-sm text-soil leading-relaxed mb-3">{route.description}</p>

          <div className="bg-cream border-l-2 border-moss px-4 py-3 mb-3">
            <p className="text-xs text-stone leading-relaxed"><span className="pixel-font text-[7px] text-moss mr-2">[!]</span>{route.tips}</p>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {route.tags.map(tag => (
              <span key={tag} className="text-[11px] bg-sand text-stone px-2 py-0.5 rounded-full">{tag}</span>
            ))}
            {route.seasons.map(s => (
              <span key={s} className="text-[11px] bg-forest/10 text-forest px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>

          {route.hikingNotesUrl && (
            <a
              href={route.hikingNotesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-forest hover:text-forest-dark transition-colors"
            >
                <span>↗</span> 查看健行筆記路線資訊
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default function RoutesPage() {
  const [difficulty, setDifficulty] = useState('all')
  const [region, setRegion] = useState('全部地區')
  const [search, setSearch] = useState('')

  const filtered = routes.filter(r => {
    if (difficulty !== 'all' && r.difficulty !== difficulty) return false
    if (region !== '全部地區' && r.region !== region) return false
    if (search && !r.name.includes(search) && !r.tags.some(t => t.includes(search))) return false
    return true
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-soil mb-1">登山路線圖鑑</h1>
      <p className="text-stone text-sm mb-8">精選台灣熱門路線，找到適合你的冒險</p>

      {/* Filters */}
      <div className="bg-cream-dark border border-sand rounded-3xl p-5 mb-6">
        <input
          type="text"
          placeholder="搜尋路線名稱或標籤..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-cream border border-sand rounded-xl px-4 py-2.5 text-sm text-soil placeholder:text-stone/60 focus:outline-none focus:border-bark mb-4"
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-stone mb-1.5">難度</label>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="w-full bg-cream border border-sand rounded-xl px-3 py-2 text-sm text-soil focus:outline-none focus:border-bark"
            >
              {difficultyOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-stone mb-1.5">地區</label>
            <select
              value={region}
              onChange={e => setRegion(e.target.value)}
              className="w-full bg-cream border border-sand rounded-xl px-3 py-2 text-sm text-soil focus:outline-none focus:border-bark"
            >
              {regionOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <p className="text-xs text-stone mb-3">共 {filtered.length} 條路線</p>
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map(route => <RouteCard key={route.id} route={route} />)
        ) : (
          <div className="text-center py-12 text-stone text-sm">
            找不到符合條件的路線
          </div>
        )}
      </div>

      <p className="text-center text-xs text-stone/60 mt-8">路線資料持續更新中 · 出發前請確認最新路況</p>
    </div>
  )
}
