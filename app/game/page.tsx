'use client'
import { useState, useEffect } from 'react'
import { scenes } from '@/data/survivalGame'

const endColors = {
  win: 'bg-forest/10 border-forest/20',
  lose: 'bg-red-50 border-red-100',
  neutral: 'bg-amber-50 border-amber-100',
}

const endIcons = {
  win: '🏔',
  lose: '⚡',
  neutral: '🏕',
}

export default function GamePage() {
  const [sceneId, setSceneId] = useState('start')
  const [score, setScore] = useState(100)
  const [history, setHistory] = useState<string[]>(['start'])
  const [animating, setAnimating] = useState(false)

  const scene = scenes[sceneId]

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

  const restart = () => {
    setSceneId('start')
    setScore(100)
    setHistory(['start'])
  }

  const scoreColor = score >= 70 ? 'text-forest' : score >= 40 ? 'text-amber-600' : 'text-red-500'

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-soil mb-1">戶外求生挑戰</h1>
          <p className="text-stone text-sm">模擬山林突發狀況，考驗你的判斷力</p>
        </div>
        {!scene.isEnd && (
          <div className="text-right">
            <div className="text-xs text-stone mb-0.5">判斷力</div>
            <div className={`text-xl font-bold ${scoreColor}`}>{score}</div>
          </div>
        )}
      </div>

      {/* Scene card */}
      <div
        className={`bg-white border border-sand rounded-3xl p-6 mb-4 transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'} ${scene.isEnd ? `${endColors[scene.endType!]} border` : ''}`}
      >
        <div className="flex items-center gap-2 mb-4">
          {scene.isEnd && <span className="text-2xl">{endIcons[scene.endType!]}</span>}
          <h2 className="text-lg font-semibold text-soil">{scene.title}</h2>
        </div>
        <p className="text-sm text-soil leading-relaxed">{scene.text}</p>

        {scene.isEnd && (
          <div className="mt-4 pt-4 border-t border-sand/60">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone">最終判斷力分數</span>
              <span className={`font-bold text-base ${scoreColor}`}>{score} / 100</span>
            </div>
            <div className="h-2 bg-sand rounded-full overflow-hidden mt-2">
              <div
                className={`h-full rounded-full transition-all ${score >= 70 ? 'bg-forest' : score >= 40 ? 'bg-amber-500' : 'bg-red-400'}`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Choices */}
      <div className={`space-y-2.5 transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        {scene.choices.map((choice, idx) => {
          const isRestart = choice.next === 'start' && scene.isEnd
          return (
            <button
              key={idx}
              onClick={() => isRestart ? restart() : choose(choice.next, choice.scoreChange)}
              className={`w-full text-left px-5 py-3.5 rounded-2xl border text-sm font-medium transition-all ${
                isRestart
                  ? 'bg-forest text-white border-forest hover:bg-forest-dark'
                  : 'bg-white border-sand text-soil hover:border-bark hover:bg-cream/50'
              }`}
            >
              {choice.text}
            </button>
          )
        })}
      </div>

      {/* Progress breadcrumb */}
      {history.length > 1 && !scene.isEnd && (
        <p className="text-center text-xs text-stone/50 mt-6">
          已走過 {history.length} 個場景
        </p>
      )}
    </div>
  )
}
