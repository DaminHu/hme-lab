'use client'
import { useState, useMemo } from 'react'
import { generateChecklist, CATEGORIES, type Activity, type Season, type Gender } from '@/data/gearList'

const activityOptions: { value: Activity; label: string; emoji: string }[] = [
  { value: 'daytrip',  label: '郊山一日',   emoji: '🌿' },
  { value: 'overnight',label: '中級山縱走', emoji: '⛺' },
  { value: 'alpine',   label: '百岳/高山',  emoji: '🏔' },
  { value: 'camping',  label: '平地露營',   emoji: '🔥' },
]

const dayOptions = [1, 2, 3, 4, 5, 7]

const seasonOptions: { value: Season; label: string }[] = [
  { value: 'spring', label: '春（3-5月）' },
  { value: 'summer', label: '夏（6-8月）' },
  { value: 'autumn', label: '秋（9-11月）' },
  { value: 'winter', label: '冬（12-2月）' },
]

const genderOptions: { value: Gender; label: string }[] = [
  { value: 'any',    label: '不指定' },
  { value: 'female', label: '女生' },
  { value: 'male',   label: '男生' },
]

function PixelSelect<T extends string>({
  value, onChange, options, label,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  label: string
}) {
  return (
    <div>
      <p className="pixel-font text-[7px] text-stone mb-2 tracking-wide">{label}</p>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value as T)}
          className="w-full appearance-none bg-cream-dark border-2 border-sand px-3 py-2.5 text-xs text-soil focus:outline-none focus:border-forest cursor-pointer"
          style={{ colorScheme: 'dark' }}
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none text-[10px]">▼</span>
      </div>
    </div>
  )
}

export default function ChecklistPage() {
  const [activity, setActivity] = useState<Activity>('overnight')
  const [days, setDays]         = useState(2)
  const [season, setSeason]     = useState<Season>('autumn')
  const [gender, setGender]     = useState<Gender>('any')
  const [checked, setChecked]   = useState<Set<string>>(new Set())
  const [generated, setGenerated] = useState(false)

  const list = useMemo(
    () => generated ? generateChecklist(activity, days, season, gender) : [],
    [generated, activity, days, season, gender]
  )

  const byCategory = CATEGORIES
    .map(cat => ({ category: cat, items: list.filter(i => i.category === cat) }))
    .filter(g => g.items.length > 0)

  const toggle = (id: string) => setChecked(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const doneCount = list.filter(i => checked.has(i.id)).length
  const pct = list.length > 0 ? Math.round((doneCount / list.length) * 100) : 0

  const handleShare = async () => {
    const actLabel = activityOptions.find(a => a.value === activity)?.label
    const text = list.map(i => `${checked.has(i.id) ? '✅' : '⬜'} ${i.name}`).join('\n')
    const shareText = `HME Lab 裝備清單（${actLabel}，${days}天）\n\n${text}\n\nhttps://hme-lab.vercel.app`
    if (navigator.share) {
      await navigator.share({ title: 'HME 裝備清單', text: shareText })
    } else {
      await navigator.clipboard.writeText(shareText)
      alert('清單已複製到剪貼簿！')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-lg text-soil mb-1">裝備清單產生器</h1>
      <p className="pixel-font text-[7px] text-stone/60 mb-8 tracking-widest">▶ FILL IN TRIP INFO TO GENERATE LIST</p>

      {/* ── Filters ── */}
      <div className="bg-cream-dark border-2 border-sand p-5 mb-6">

        {/* Activity */}
        <p className="pixel-font text-[7px] text-stone mb-3 tracking-wide">活動類型</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
          {activityOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => { setActivity(opt.value); setGenerated(false) }}
              className={`flex flex-col items-center gap-1.5 py-3 border-2 text-xs font-medium transition-all ${
                activity === opt.value
                  ? 'border-forest bg-forest/10 text-forest shadow-[2px_2px_0_0_#22C55E]'
                  : 'border-sand text-stone hover:border-bark hover:text-soil'
              }`}
            >
              <span className="text-lg">{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Days / Season / Gender */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {/* Days as buttons */}
          <div>
            <p className="pixel-font text-[7px] text-stone mb-2 tracking-wide">天數</p>
            <div className="flex flex-wrap gap-1">
              {dayOptions.map(d => (
                <button
                  key={d}
                  onClick={() => { setDays(d); setGenerated(false) }}
                  className={`px-2 py-1.5 border-2 text-xs font-medium transition-all ${
                    days === d
                      ? 'border-forest text-forest bg-forest/10'
                      : 'border-sand text-stone hover:border-bark'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <PixelSelect value={season} onChange={v => { setSeason(v); setGenerated(false) }} options={seasonOptions} label="季節" />
          <PixelSelect value={gender} onChange={v => { setGender(v); setGenerated(false) }} options={genderOptions} label="性別" />
        </div>

        <button
          onClick={() => { setGenerated(true); setChecked(new Set()) }}
          className="w-full py-3 bg-forest text-cream pixel-font text-[9px] tracking-widest hover:bg-forest-dark transition-colors border-b-4 border-forest-dark hover:border-b-0 hover:translate-y-1 active:translate-y-1"
        >
          ▶ 產生裝備清單
        </button>
      </div>

      {/* ── Generated list ── */}
      {generated && list.length > 0 && (
        <>
          {/* Progress + actions */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="pixel-font text-[7px] text-stone">CHECKED {doneCount} / {list.length}</span>
                <span className="pixel-font text-[7px] text-forest">{pct}%</span>
              </div>
              <div className="h-2 bg-sand overflow-hidden">
                <div
                  className="h-full bg-forest transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 pixel-font text-[7px] text-stone bg-cream-dark border-2 border-sand hover:border-forest hover:text-forest transition-colors"
            >
              <span>↗</span>SHARE
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 pixel-font text-[7px] text-stone bg-cream-dark border-2 border-sand hover:border-forest hover:text-forest transition-colors"
            >
              <span>⎙</span>PRINT
            </button>
          </div>

          {/* Category groups */}
          {byCategory.map(({ category, items }) => (
            <div key={category} className="mb-5">
              <p className="pixel-font text-[8px] text-stone/70 uppercase tracking-widest mb-2">
                ── {category}
              </p>
              <div className="bg-cream-dark border-2 border-sand overflow-hidden">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-forest/5 ${idx > 0 ? 'border-t border-sand' : ''} ${checked.has(item.id) ? 'bg-forest/5' : ''}`}
                  >
                    {/* Pixel checkbox */}
                    <div className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${checked.has(item.id) ? 'bg-forest border-forest' : 'border-bark hover:border-forest'}`}>
                      {checked.has(item.id) && <span className="text-cream text-xs leading-none font-bold">✓</span>}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm ${checked.has(item.id) ? 'line-through text-stone-light' : 'text-soil'}`}>
                          {item.name}
                        </span>
                        {item.essential && (
                          <span className="pixel-font text-[6px] border border-moss/50 text-moss px-1.5 py-0.5">[必備]</span>
                        )}
                        {item.note && (
                          <span className="text-[10px] text-stone">{item.note}</span>
                        )}
                      </div>
                      {item.hmeUrl && (
                        <a
                          href={item.hmeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1 text-[10px] text-forest hover:text-forest-light mt-0.5 transition-colors"
                        >
                          <span>↗</span>
                          {item.hmeLabel || 'HME 推薦'}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="pixel-font text-[7px] text-stone/30 text-center mt-6 tracking-widest">
            {list.length} ITEMS TOTAL ── HME LAB
          </p>
        </>
      )}
    </div>
  )
}
