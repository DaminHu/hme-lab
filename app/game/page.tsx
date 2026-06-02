'use client'
import { useState } from 'react'
import { scenes } from '@/data/survivalGame'

// ── Game catalogue ──────────────────────────────────────────────
const GAMES = [
  { id: 'mountain-hut',  title: '山屋興建、經營',    emoji: '🏔', tag: 'SIM',    status: 'soon'      },
  { id: 'survival',      title: '野外求生',          emoji: '🌲', tag: 'PLAY',   status: 'available' },
  { id: 'trail',         title: '步道維護',          emoji: '⛏', tag: 'SIM',    status: 'soon'      },
  { id: 'poacher',       title: '趨避山老鼠',        emoji: '🚫', tag: 'ACTION', status: 'soon'      },
  { id: 'cathole',       title: '嘿呦嘿呦挖貓洞',    emoji: '🐾', tag: 'SKILL',  status: 'soon'      },
  { id: 'lightning',     title: '躲避雷擊',          emoji: '⚡', tag: 'ACTION', status: 'soon'      },
  { id: 'plants',        title: '植物/花卉圖鑑',     emoji: '🌸', tag: 'GUIDE',  status: 'soon'      },
  { id: 'animals',       title: '鳥類/動物圖鑑',     emoji: '🦅', tag: 'GUIDE',  status: 'soon'      },
  { id: 'lnt',           title: 'LNT MASTER',       emoji: '♻', tag: 'QUIZ',   status: 'soon'      },
  { id: 'routes',        title: '登山路線推薦',      emoji: '🗺', tag: 'RPG',    status: 'soon'      },
]

// ── Survival game constants ──────────────────────────────────────
const endColors = { win: 'bg-forest/10 border-forest/30', lose: 'bg-red-900/20 border-red-800/30', neutral: 'bg-amber-900/20 border-amber-700/30' }
const endIcons  = { win: '🏔', lose: '⚡', neutral: '🏕' }

// ── Select screen ────────────────────────────────────────────────
function GameSelect({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-xl text-soil mb-1">WHAT IF</h1>
        <p className="pixel-font text-[8px] text-stone/60 tracking-widest">▶ SELECT YOUR SCENARIO</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((g, i) => {
          const available = g.status === 'available'
          return (
            <button
              key={g.id}
              onClick={() => available && onSelect(g.id)}
              disabled={!available}
              className={`text-left p-4 border-2 transition-all ${
                available
                  ? 'border-forest bg-cream-dark hover:shadow-[3px_3px_0_0_#4ADE80] cursor-pointer'
                  : 'border-sand bg-cream-dark opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="pixel-font text-[7px] text-stone-light">{String(i + 1).padStart(2, '0')}</span>
                <span className={`pixel-font text-[6px] border px-1.5 py-0.5 ${available ? 'border-moss/50 text-moss' : 'border-sand text-stone-light'}`}>
                  {available ? '[' + g.tag + ']' : '[SOON]'}
                </span>
              </div>
              <div className="text-xl mb-2">{g.emoji}</div>
              <p className={`text-xs font-medium ${available ? 'text-soil' : 'text-stone'}`}>{g.title}</p>
            </button>
          )
        })}
      </div>

      <p className="pixel-font text-[7px] text-stone/30 text-center mt-8 tracking-widest">
        {GAMES.filter(g => g.status === 'available').length} / {GAMES.length} UNLOCKED
      </p>
    </div>
  )
}

// ── Coming soon screen ───────────────────────────────────────────
function ComingSoon({ game, onBack }: { game: typeof GAMES[0]; onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button onClick={onBack} className="pixel-font text-[8px] text-stone hover:text-soil mb-8 block">◀ BACK</button>
      <div className="border-2 border-sand bg-cream-dark p-10 text-center">
        <div className="text-4xl mb-4">{game.emoji}</div>
        <h1 className="text-base text-soil mb-3">{game.title}</h1>
        <p className="pixel-font text-[8px] text-moss tracking-widest mb-2">COMING SOON</p>
        <p className="pixel-font text-[7px] text-stone/40 tracking-widest">████████░░░░░░░░ 50%</p>
      </div>
    </div>
  )
}

// ── Survival game ────────────────────────────────────────────────
function SurvivalGame({ onBack }: { onBack: () => void }) {
  const [sceneId, setSceneId]   = useState('start')
  const [score, setScore]       = useState(100)
  const [history, setHistory]   = useState<string[]>(['start'])
  const [animating, setAnimating] = useState(false)

  const scene = scenes[sceneId]
  const scoreColor = score >= 70 ? 'text-forest' : score >= 40 ? 'text-amber-400' : 'text-red-400'

  const choose = (next: string, scoreChange?: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setSceneId(next)
      setScore(s => Math.max(0, Math.min(100, s + (scoreChange ?? 0))))
      setHistory(h => [...h, next])
      setAnimating(false)
    }, 200)
  }

  const restart = () => { setSceneId('start'); setScore(100); setHistory(['start']) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <button onClick={onBack} className="pixel-font text-[8px] text-stone hover:text-soil mb-2 block">◀ BACK</button>
          <h1 className="text-xl text-soil mb-1">野外求生</h1>
          <p className="text-stone text-xs">模擬山林突發狀況，考驗你的判斷力</p>
        </div>
        {!scene.isEnd && (
          <div className="text-right">
            <div className="pixel-font text-[7px] text-stone mb-1">HP</div>
            <div className={`text-xl font-bold pixel-font ${scoreColor}`}>{score}</div>
          </div>
        )}
      </div>

      <div className={`bg-cream-dark border-2 p-6 mb-4 transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'} ${scene.isEnd ? `${endColors[scene.endType!]}` : 'border-sand'}`}>
        <div className="flex items-center gap-2 mb-4">
          {scene.isEnd && <span className="text-xl">{endIcons[scene.endType!]}</span>}
          <h2 className="text-sm text-soil">{scene.title}</h2>
        </div>
        <p className="text-xs text-soil leading-relaxed">{scene.text}</p>

        {scene.isEnd && (
          <div className="mt-4 pt-4 border-t border-sand/60">
            <div className="flex items-center justify-between text-xs">
              <span className="pixel-font text-[7px] text-stone">FINAL SCORE</span>
              <span className={`pixel-font text-[10px] ${scoreColor}`}>{score} / 100</span>
            </div>
            <div className="h-2 bg-sand mt-2 overflow-hidden">
              <div className={`h-full transition-all ${score >= 70 ? 'bg-forest' : score >= 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className={`space-y-2 transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        {scene.choices.map((choice, idx) => {
          const isRestart = choice.next === 'start' && scene.isEnd
          return (
            <button
              key={idx}
              onClick={() => isRestart ? restart() : choose(choice.next, choice.scoreChange)}
              className={`w-full text-left px-4 py-3 border-2 text-xs font-medium transition-all ${
                isRestart
                  ? 'bg-forest text-cream border-forest-dark hover:bg-forest-dark'
                  : 'bg-cream-dark border-sand text-soil hover:border-forest hover:shadow-[2px_2px_0_0_#4ADE80]'
              }`}
            >
              {!isRestart && <span className="pixel-font text-[7px] text-stone mr-2">{String.fromCharCode(65 + idx)}.</span>}
              {choice.text}
            </button>
          )
        })}
      </div>

      {history.length > 1 && !scene.isEnd && (
        <p className="pixel-font text-center text-[7px] text-stone/40 mt-6">
          SCENE {history.length}
        </p>
      )}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────
export default function GamePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (!selectedId) return <GameSelect onSelect={setSelectedId} />

  if (selectedId === 'survival') return <SurvivalGame onBack={() => setSelectedId(null)} />

  const game = GAMES.find(g => g.id === selectedId)!
  return <ComingSoon game={game} onBack={() => setSelectedId(null)} />
}
