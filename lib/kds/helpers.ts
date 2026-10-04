export interface CartItem {
  id: string
  name_km: string
  name_en: string
  price: number
  quantity: number
  notes?: string
}

export interface Order {
  id: string
  table_id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export type ActiveOrderStatus = 'pending' | 'preparing' | 'ready'

export const ACTIVE_ORDER_STATUSES: ActiveOrderStatus[] = [
  'pending',
  'preparing',
  'ready',
]

export const ORDER_STATUS_LABELS = {
  pending: { km: 'ថ្មី', en: 'New', color: 'blue' },
  preparing: { km: 'កំពុងចម្អិន', en: 'Preparing', color: 'yellow' },
  ready: { km: 'រួចរាល់', en: 'Ready', color: 'green' },
  completed: { km: 'ចប់សាច់', en: 'Completed', color: 'gray' },
  cancelled: { km: 'បានបោះបង់', en: 'Cancelled', color: 'red' },
} as const

export function nextOrderStatus(
  status: ActiveOrderStatus
): 'preparing' | 'ready' | 'completed' {
  if (status === 'pending') return 'preparing'
  if (status === 'preparing') return 'ready'
  return 'completed'
}

export function formatElapsed(since: string): string {
  const ms = Date.now() - new Date(since).getTime()
  const mins = Math.floor(ms / 60000)
  if (mins < 1) return '<1 min'
  if (mins < 60) return `${mins} min`
  const hrs = Math.floor(mins / 60)
  const rem = mins % 60
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`
}
