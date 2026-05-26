'use client'
import { useState, useMemo } from 'react'
import { Check, ExternalLink, Share2, Printer } from 'lucide-react'
import { gearItems, generateChecklist, CATEGORIES, type Activity, type Season, type Gender } from '@/data/gearList'

const activityOptions: { value: Activity; label: string; emoji: string }[] = [
  { value: 'daytrip', label: '郊山一日', emoji: '🌿' },
  { value: 'overnight', label: '中級山縱走', emoji: '⛺' },
  { value: 'alpine', label: '百岳/高山', emoji: '🏔' },
  { value: 'camping', label: '平地露營', emoji: '🔥' },
]

const dayOptions = [1, 2, 3, 4, 5, 7]

const seasonOptions: { value: Season; label: string }[] = [
  { value: 'spring', label: '春（3-5月）' },
  { value: 'summer', label: '夏（6-8月）' },
  { value: 'autumn', label: '秋（9-11月）' },
  { value: 'winter', label: '冬（12-2月）' },
]

const genderOptions: { value: Gender; label: string }[] = [
  { value: 'any', label: '不指定' },
  { value: 'female', label: '女生' },
  { value: 'male', label: '男生' },
]

export default function ChecklistPage() {
  const [activity, setActivity] = useState<Activity>('overnight')
  const [days, setDays] = useState(2)
  const [season, setSeason] = useState<Season>('autumn')
  const [gender, setGender] = useState<Gender>('any')
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [generated, setGenerated] = useState(false)

  const list = useMemo(() => generated ? generateChecklist(activity, days, season, gender) : [], [generated, activity, days, season, gender])

  const byCategory = CATEGORIES.map(cat => ({
    category: cat,
    items: list.filter(i => i.category === cat),
  })).filter(g => g.items.length > 0)

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const doneCount = list.filter(i => checked.has(i.id)).length
  const pct = list.length > 0 ? Math.round((doneCount / list.length) * 100) : 0

  const handleShare = async () => {
    const text = list.map(i => `${checked.has(i.id) ? '✅' : '⬜'} ${i.name}`).join('\n')
    const shareText = `HME Lab 裝備清單（${activityOptions.find(a => a.value === activity)?.label}，${days}天）\n\n${text}\n\nhttps://hme-lab.vercel.app`
    if (navigator.share) {
      await navigator.share({ title: 'HME 裝備清單', text: shareText })
    } else {
      await navigator.clipboard.writeText(shareText)
      alert('清單已複製到剪貼簿！')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-soil mb-1">裝備清單產生器</h1>
      <p className="text-stone text-sm mb-8">填入行程資訊，自動產生個人化裝備清單</p>

      {/* Filters */}
      <div className="bg-white border border-sand rounded-3xl p-5 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          {activityOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => { setActivity(opt.value); setGenerated(false) }}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border text-sm font-medium transition-all ${activity === opt.value ? 'bg-forest text-white border-forest' : 'bg-cream border-sand text-stone hover:border-bark'}`}
            >
              <span className="text-xl">{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-stone mb-1.5">天數</label>
            <select
              value={days}
              onChange={e => { setDays(Number(e.target.value)); setGenerated(false) }}
              className="w-full bg-cream border border-sand rounded-xl px-3 py-2 text-sm text-soil focus:outline-none focus:border-bark"
            >
              {dayOptions.map(d => <option key={d} value={d}>{d} 天</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-stone mb-1.5">季節</label>
            <select
              value={season}
              onChange={e => { setSeason(e.target.value as Season); setGenerated(false) }}
              className="w-full bg-cream border border-sand rounded-xl px-3 py-2 text-sm text-soil focus:outline-none focus:border-bark"
            >
              {seasonOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-stone mb-1.5">性別</label>
            <select
              value={gender}
              onChange={e => { setGender(e.target.value as Gender); setGenerated(false) }}
              className="w-full bg-cream border border-sand rounded-xl px-3 py-2 text-sm text-soil focus:outline-none focus:border-bark"
            >
              {genderOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={() => { setGenerated(true); setChecked(new Set()) }}
          className="mt-4 w-full py-3 bg-forest text-white rounded-2xl font-medium hover:bg-forest-dark transition-colors"
        >
          產生裝備清單
        </button>
      </div>

      {/* Generated list */}
      {generated && list.length > 0 && (
        <>
          {/* Progress + actions */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs text-stone mb-1">
                <span>已確認 {doneCount} / {list.length} 項</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 bg-sand rounded-full overflow-hidden">
                <div className="h-full bg-forest rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-2 text-xs text-stone bg-white border border-sand rounded-xl hover:border-bark transition-colors">
              <Share2 size={13} />分享
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-2 text-xs text-stone bg-white border border-sand rounded-xl hover:border-bark transition-colors">
              <Printer size={13} />列印
            </button>
          </div>

          {/* Category groups */}
          {byCategory.map(({ category, items }) => (
            <div key={category} className="mb-5">
              <h2 className="text-xs font-semibold text-stone uppercase tracking-widest mb-2">{category}</h2>
              <div className="bg-white border border-sand rounded-2xl overflow-hidden">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-cream/50 ${idx > 0 ? 'border-t border-sand' : ''}`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${checked.has(item.id) ? 'bg-forest border-forest' : 'border-bark'}`}>
                      {checked.has(item.id) && <Check size={12} className="text-white" strokeWidth={3} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-medium ${checked.has(item.id) ? 'line-through text-stone-light' : 'text-soil'}`}>{item.name}</span>
                        {item.essential && <span className="text-[10px] bg-forest/10 text-forest px-1.5 py-0.5 rounded-full">必備</span>}
                        {item.note && <span className="text-[10px] text-stone">{item.note}</span>}
                      </div>
                      {item.hmeUrl && (
                        <a
                          href={item.hmeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1 text-[11px] text-forest hover:text-forest-dark mt-0.5 transition-colors"
                        >
                          <ExternalLink size={10} />
                          {item.hmeLabel || 'HME 推薦'}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
