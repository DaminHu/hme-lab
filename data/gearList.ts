export type Activity = 'daytrip' | 'overnight' | 'alpine' | 'camping'
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'
export type Gender = 'any' | 'female' | 'male'

export interface GearItem {
  id: string
  name: string
  category: string
  essential: boolean
  activities: Activity[]
  seasons?: Season[]
  gender?: Gender
  hmeUrl?: string       // HME 商品或文章連結
  hmeLabel?: string     // 連結文字
  note?: string
}

export const CATEGORIES = ['行走系統', '衣著', '睡眠系統', '炊事', '安全急救', '導航', '照明', '個人衛生', '其他']

export const gearItems: GearItem[] = [
  // 行走系統
  { id: 'boots', name: '登山鞋', category: '行走系統', essential: true, activities: ['daytrip', 'overnight', 'alpine'], hmeUrl: 'https://www.hme.tw/', hmeLabel: '選鞋指南' },
  { id: 'trekpoles', name: '登山杖', category: '行走系統', essential: false, activities: ['daytrip', 'overnight', 'alpine'], hmeUrl: 'https://www.hme.tw/', hmeLabel: '登山杖推薦' },
  { id: 'gaiters', name: '綁腿', category: '行走系統', essential: false, activities: ['alpine'], seasons: ['winter'] },
  { id: 'crampon', name: '冰爪', category: '行走系統', essential: false, activities: ['alpine'], seasons: ['winter'] },
  { id: 'sandals', name: '輕便涼鞋（營地用）', category: '行走系統', essential: false, activities: ['overnight', 'alpine', 'camping'] },

  // 衣著
  { id: 'baselayer', name: '排汗底層衣', category: '衣著', essential: true, activities: ['daytrip', 'overnight', 'alpine', 'camping'] },
  { id: 'midlayer', name: '保暖中層（刷毛/羽絨）', category: '衣著', essential: true, activities: ['overnight', 'alpine'], seasons: ['spring', 'autumn', 'winter'], hmeUrl: 'https://www.hme.tw/', hmeLabel: 'Nanga 羽絨' },
  { id: 'hardshell', name: '硬殼外套', category: '衣著', essential: true, activities: ['alpine', 'overnight'], seasons: ['spring', 'autumn', 'winter'], hmeUrl: 'https://www.hme.tw/', hmeLabel: "Arc'teryx Beta LT" },
  { id: 'softshell', name: '軟殼外套', category: '衣著', essential: false, activities: ['daytrip', 'overnight', 'alpine'] },
  { id: 'rainpants', name: '防水雨褲', category: '衣著', essential: false, activities: ['overnight', 'alpine'] },
  { id: 'glovewarm', name: '保暖手套', category: '衣著', essential: true, activities: ['alpine', 'overnight'], seasons: ['winter', 'autumn', 'spring'] },
  { id: 'hat', name: '遮陽帽', category: '衣著', essential: true, activities: ['daytrip', 'overnight', 'alpine', 'camping'], seasons: ['summer', 'spring', 'autumn'] },
  { id: 'beanie', name: '毛帽', category: '衣著', essential: true, activities: ['alpine', 'overnight'], seasons: ['winter', 'autumn', 'spring'] },
  { id: 'socksbase', name: '羊毛排汗襪', category: '衣著', essential: true, activities: ['daytrip', 'overnight', 'alpine'] },
  { id: 'bra', name: '運動內衣', category: '衣著', essential: true, activities: ['daytrip', 'overnight', 'alpine', 'camping'], gender: 'female' },
  { id: 'sunprotect', name: '防曬衣/袖套', category: '衣著', essential: false, activities: ['daytrip', 'overnight', 'alpine'], seasons: ['summer'] },

  // 睡眠系統
  { id: 'sleepbag', name: '睡袋', category: '睡眠系統', essential: true, activities: ['overnight', 'alpine', 'camping'], hmeUrl: 'https://www.hme.tw/', hmeLabel: '睡袋挑選指南' },
  { id: 'sleepmat', name: '睡墊', category: '睡眠系統', essential: true, activities: ['overnight', 'alpine', 'camping'] },
  { id: 'tent', name: '帳篷', category: '睡眠系統', essential: true, activities: ['overnight', 'alpine', 'camping'], hmeUrl: 'https://www.hme.tw/', hmeLabel: 'Snow Peak 帳篷' },
  { id: 'innerbag', name: '內袋/睡袋套', category: '睡眠系統', essential: false, activities: ['overnight', 'alpine'] },

  // 炊事
  { id: 'stove', name: '爐具', category: '炊事', essential: true, activities: ['overnight', 'alpine', 'camping'], hmeUrl: 'https://www.hme.tw/', hmeLabel: 'Snow Peak 爐具' },
  { id: 'gas', name: '瓦斯罐', category: '炊事', essential: true, activities: ['overnight', 'alpine', 'camping'] },
  { id: 'pot', name: '炊事鍋', category: '炊事', essential: true, activities: ['overnight', 'alpine', 'camping'], hmeUrl: 'https://www.hme.tw/', hmeLabel: '鈦合金鍋推薦' },
  { id: 'mug', name: '鈦杯/馬克杯', category: '炊事', essential: false, activities: ['daytrip', 'overnight', 'alpine', 'camping'] },
  { id: 'spork', name: '湯匙/叉子', category: '炊事', essential: true, activities: ['overnight', 'alpine', 'camping'] },
  { id: 'waterbottle', name: '水瓶/水袋', category: '炊事', essential: true, activities: ['daytrip', 'overnight', 'alpine', 'camping'] },
  { id: 'filter', name: '濾水器', category: '炊事', essential: false, activities: ['overnight', 'alpine'] },

  // 安全急救
  { id: 'firstaid', name: '急救包', category: '安全急救', essential: true, activities: ['daytrip', 'overnight', 'alpine', 'camping'] },
  { id: 'whistle', name: '求救哨', category: '安全急救', essential: true, activities: ['daytrip', 'overnight', 'alpine'] },
  { id: 'emergency', name: '緊急保溫毯', category: '安全急救', essential: true, activities: ['overnight', 'alpine'] },
  { id: 'lighter', name: '打火機/防水火柴', category: '安全急救', essential: true, activities: ['overnight', 'alpine', 'camping'] },
  { id: 'knife', name: '多功能刀', category: '安全急救', essential: false, activities: ['overnight', 'alpine', 'camping'] },

  // 導航
  { id: 'map', name: '地圖（紙本）', category: '導航', essential: true, activities: ['overnight', 'alpine'] },
  { id: 'compass', name: '指北針', category: '導航', essential: false, activities: ['alpine'] },
  { id: 'gps', name: 'GPS 手錶/裝置', category: '導航', essential: false, activities: ['alpine', 'overnight'] },

  // 照明
  { id: 'headlamp', name: '頭燈', category: '照明', essential: true, activities: ['daytrip', 'overnight', 'alpine', 'camping'], hmeUrl: 'https://www.hme.tw/', hmeLabel: 'Black Diamond 頭燈' },
  { id: 'extrabat', name: '備用電池', category: '照明', essential: true, activities: ['overnight', 'alpine'] },
  { id: 'lantern', name: '營燈', category: '照明', essential: false, activities: ['camping', 'overnight'] },

  // 個人衛生
  { id: 'sunscreen', name: '防曬乳', category: '個人衛生', essential: true, activities: ['daytrip', 'overnight', 'alpine', 'camping'], seasons: ['summer', 'spring'] },
  { id: 'insect', name: '防蚊液', category: '個人衛生', essential: false, activities: ['daytrip', 'overnight', 'camping'], seasons: ['summer', 'spring'] },
  { id: 'toilet', name: '山林如廁工具組', category: '個人衛生', essential: true, activities: ['overnight', 'alpine'] },
  { id: 'sanitizer', name: '乾洗手', category: '個人衛生', essential: true, activities: ['daytrip', 'overnight', 'alpine', 'camping'] },
  { id: 'period', name: '生理用品', category: '個人衛生', essential: false, activities: ['daytrip', 'overnight', 'alpine', 'camping'], gender: 'female' },

  // 其他
  { id: 'pack', name: '登山背包', category: '其他', essential: true, activities: ['daytrip', 'overnight', 'alpine'], hmeUrl: 'https://www.hme.tw/', hmeLabel: 'Osprey 推薦' },
  { id: 'packcover', name: '背包套', category: '其他', essential: false, activities: ['overnight', 'alpine'] },
  { id: 'trekfood', name: '行動糧', category: '其他', essential: true, activities: ['daytrip', 'overnight', 'alpine'] },
  { id: 'powerbank', name: '行動電源', category: '其他', essential: false, activities: ['overnight', 'alpine', 'camping'] },
  { id: 'permit', name: '入山/入園申請確認', category: '其他', essential: true, activities: ['overnight', 'alpine'], note: '記得申請！' },
  { id: 'insurance', name: '登山保險', category: '其他', essential: true, activities: ['overnight', 'alpine'], note: '強烈建議' },
  { id: 'trash', name: '垃圾袋（LNT）', category: '其他', essential: true, activities: ['daytrip', 'overnight', 'alpine', 'camping'] },
]

export function generateChecklist(
  activity: Activity,
  days: number,
  season: Season,
  gender: Gender
): GearItem[] {
  return gearItems.filter(item => {
    if (!item.activities.includes(activity)) return false
    if (item.seasons && !item.seasons.includes(season)) return false
    if (item.gender && item.gender !== 'any' && item.gender !== gender) return false
    return true
  })
}
