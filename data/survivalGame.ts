export interface Choice {
  text: string
  next: string
  scoreChange?: number
}

export interface Scene {
  id: string
  title: string
  text: string
  choices: Choice[]
  isEnd?: boolean
  endType?: 'win' | 'lose' | 'neutral'
}

export const scenes: Record<string, Scene> = {
  start: {
    id: 'start',
    title: '午後雷陣雨',
    text: '下午 2 點，你正走在前往奇萊南峰的稜線上。突然天色變暗，遠方雷聲滾滾，閃電劃過天際。預計距離山屋還有 2 小時路程。',
    choices: [
      { text: '加快腳步衝向山屋', next: 'rush', scoreChange: -10 },
      { text: '尋找地形遮蔽，等雷陣雨過去', next: 'shelter', scoreChange: 20 },
      { text: '原地架設帳篷紮營', next: 'tentOnRidge', scoreChange: -20 },
    ],
  },
  rush: {
    id: 'rush',
    title: '稜線上的危機',
    text: '你加快腳步，但稜線上完全暴露在雷電下。突然一道閃電打在你前方 50 公尺的巨石上。你的腿已經開始發抖。',
    choices: [
      { text: '立刻蹲低，找凹地趴下等待', next: 'crouch', scoreChange: 20 },
      { text: '繼續衝，你的目標是山屋', next: 'died_lightning', scoreChange: -50 },
    ],
  },
  shelter: {
    id: 'shelter',
    title: '找到遮蔽',
    text: '你迅速評估地形，在稜線凹陷處找到一塊突出岩石。你避開樹下（雷擊風險），蹲低身體等待。20 分鐘後雨勢漸小。',
    choices: [
      { text: '雨停後繼續前進', next: 'continue_safe', scoreChange: 10 },
      { text: '天色已暗，決定就地紮營', next: 'campsite_check', scoreChange: 0 },
    ],
  },
  tentOnRidge: {
    id: 'tentOnRidge',
    title: '糟糕的決定',
    text: '你試圖在稜線上架帳篷，但強風讓帳篷根本無法立起。閃電越來越近，你在空曠的稜線上毫無遮蔽。',
    choices: [
      { text: '放棄帳篷，趕快尋找地形遮蔽', next: 'shelter', scoreChange: 0 },
      { text: '堅持架帳篷', next: 'died_lightning', scoreChange: -50 },
    ],
  },
  crouch: {
    id: 'crouch',
    title: '等待雷陣雨',
    text: '你蹲低並找到凹地趴下，把登山杖放遠。20 分鐘後雷陣雨過去。你安全了，但已損失許多時間。',
    choices: [
      { text: '天色已暗，決定就地紮營', next: 'campsite_check', scoreChange: 0 },
      { text: '使用頭燈繼續夜間行進', next: 'night_hike', scoreChange: -10 },
    ],
  },
  continue_safe: {
    id: 'continue_safe',
    title: '順利抵達山屋',
    text: '雨後空氣清新，你在黃昏前抵達山屋。管理員告訴你下午有兩組人因雷陣雨受困在稜線。今晚山屋暖意洋洋，你喝著熱湯，感覺一切值得。',
    choices: [
      { text: '完成挑戰！', next: 'end_win' },
    ],
  },
  campsite_check: {
    id: 'campsite_check',
    title: '選擇紮營地點',
    text: '你決定就地紮營。眼前有三個可能的地點：(A) 稜線旁平坦地，視野好但風大 (B) 樹林邊緣，有遮風但落石風險 (C) 溪溝旁，平坦且避風',
    choices: [
      { text: '選 A：稜線旁平坦地', next: 'camp_a', scoreChange: -10 },
      { text: '選 B：樹林邊緣', next: 'camp_b', scoreChange: 10 },
      { text: '選 C：溪溝旁', next: 'camp_c', scoreChange: -20 },
    ],
  },
  camp_a: {
    id: 'camp_a',
    title: '風大難眠',
    text: '帳篷整晚被強風吹得嘎嘎作響，你幾乎無法入睡。隔天體力大損，但安全抵達山屋。下次記得避開風口！',
    choices: [{ text: '完成挑戰！', next: 'end_neutral' }],
  },
  camp_b: {
    id: 'camp_b',
    title: '樹林紮營',
    text: '你評估落石風險後選擇安全的位置，樹林擋住了大部分的風。一夜安眠，隔天精神飽滿出發，順利抵達。',
    choices: [{ text: '完成挑戰！', next: 'end_win' }],
  },
  camp_c: {
    id: 'camp_c',
    title: '溪溝的危機',
    text: '午夜，山上的雨水沿溪溝湧來，你的帳篷開始積水。你緊急轉移，雖然安全，但裝備濕透，體力與士氣大損。這是山難常見原因之一。',
    choices: [{ text: '完成挑戰（但學到教訓）', next: 'end_neutral' }],
  },
  night_hike: {
    id: 'night_hike',
    title: '夜間行進的代價',
    text: '頭燈照亮了前方的路，但你在一個轉彎處踩空，扭傷了腳踝。幸好傷勢不重，但你必須以緩慢的步伐爬回山屋，比預期晚了 3 小時。',
    choices: [{ text: '完成挑戰（帶著教訓）', next: 'end_neutral' }],
  },
  died_lightning: {
    id: 'died_lightning',
    title: '遊戲結束',
    text: '稜線雷擊是台灣山難重要原因之一。在開闊稜線上遭遇雷陣雨，應立即尋找地形遮蔽，蹲低縮小身體，遠離高聳物體。',
    choices: [{ text: '重新挑戰', next: 'start' }],
    isEnd: true,
    endType: 'lose',
  },
  end_win: {
    id: 'end_win',
    title: '🏔 完美達成',
    text: '你做出了正確的判斷！在山上，保持冷靜、評估風險、不強行推進，才是真正的強者。下次帶朋友一起挑戰吧！',
    choices: [{ text: '再玩一次', next: 'start' }],
    isEnd: true,
    endType: 'win',
  },
  end_neutral: {
    id: 'end_neutral',
    title: '平安下山',
    text: '你雖然安全下山，但過程中有些判斷值得改進。山岳活動最重要的是平安，每次出發都是學習的機會。',
    choices: [{ text: '再玩一次', next: 'start' }],
    isEnd: true,
    endType: 'neutral',
  },
}
