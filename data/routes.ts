export interface Route {
  id: string
  name: string
  region: string
  difficulty: 'easy' | 'moderate' | 'hard' | 'expert'
  elevation: number    // 最高點海拔 m
  gain: number         // 爬升高度 m
  distance: number     // 來回 km
  duration: string     // 建議時間
  seasons: string[]
  tags: string[]
  description: string
  tips: string
  image?: string
  hikingNotesUrl?: string
}

export const routes: Route[] = [
  {
    id: 'xueshan',
    name: '雪山主峰',
    region: '苗栗/台中',
    difficulty: 'hard',
    elevation: 3886,
    gain: 1300,
    distance: 21,
    duration: '2天1夜',
    seasons: ['春', '夏', '秋'],
    tags: ['百岳', '雪山圈谷', '台灣第二高峰'],
    description: '台灣第二高峰，以壯觀的雪山圈谷聞名。登頂後可俯瞰聖稜線，天氣好時遠眺玉山。',
    tips: '需申請入園、入山許可。翠池段需注意高山症，建議第一天在369山莊適應。',
  },
  {
    id: 'hehuanshan',
    name: '合歡山主峰',
    region: '南投/花蓮',
    difficulty: 'easy',
    elevation: 3417,
    gain: 170,
    distance: 3.2,
    duration: '2-3小時',
    seasons: ['春', '夏', '秋', '冬'],
    tags: ['入門百岳', '車行高地', '賞雪'],
    description: '最親民的百岳之一，從昆陽停車場出發僅需約 1.5 小時。冬季積雪為台灣少見的雪景勝地。',
    tips: '冬季需防止道路封閉，可查公路總局即時路況。高度已 3000m 以上，注意高山症。',
  },
  {
    id: 'qilainanfeng',
    name: '奇萊南峰',
    region: '花蓮/南投',
    difficulty: 'hard',
    elevation: 3358,
    gain: 1050,
    distance: 18,
    duration: '2天1夜',
    seasons: ['春', '夏', '秋'],
    tags: ['百岳', '南華山', '黑色奇萊'],
    description: '以霧多、風強著稱，有「黑色奇萊」之稱。南峰與南華山可連走，景色壯觀。',
    tips: '天候變化快，需備齊雨具與保暖裝備。建議走天池山莊進出路線。',
  },
  {
    id: 'biluoshan',
    name: '碧羅山',
    region: '宜蘭',
    difficulty: 'moderate',
    elevation: 1888,
    gain: 650,
    distance: 10,
    duration: '6-8小時',
    seasons: ['春', '夏', '秋'],
    tags: ['郊山', '芒草', '展望佳'],
    description: '宜蘭知名中級山，稜線上芒草景觀優美，天氣晴朗時可遠眺蘭陽平原。',
    tips: '部分路段較滑，建議穿登山鞋。全程無水源，需自備充足飲水。',
  },
  {
    id: 'yangmingshan',
    name: '七星山主峰',
    region: '台北',
    difficulty: 'easy',
    elevation: 1120,
    gain: 400,
    distance: 5,
    duration: '3-4小時',
    seasons: ['春', '夏', '秋', '冬'],
    tags: ['大台北', '陽明山', '入門'],
    description: '台北最高峰，位於陽明山國家公園內。硫磺噴氣孔為一大特色，天氣好時可遠眺台北盆地。',
    tips: '不需申請入山，適合初學者。夏天多霧，早出發視野較好。',
  },
  {
    id: 'wuling4peaks',
    name: '武陵四秀',
    region: '台中',
    difficulty: 'expert',
    elevation: 3884,
    gain: 2800,
    distance: 32,
    duration: '4天3夜',
    seasons: ['春', '夏', '秋'],
    tags: ['百岳', '縱走', '四座百岳'],
    description: '品田山、池有山、桃山、喀拉業山四座百岳連走，為經典台灣縱走路線之一。',
    tips: '需申請入園許可，行程難度高，建議有百岳經驗者參加。',
  },
]

export const difficultyMap = {
  easy: { label: '入門', color: 'bg-emerald-50 text-emerald-700' },
  moderate: { label: '中級', color: 'bg-amber-50 text-amber-700' },
  hard: { label: '進階', color: 'bg-orange-50 text-orange-700' },
  expert: { label: '高手', color: 'bg-red-50 text-red-600' },
}
