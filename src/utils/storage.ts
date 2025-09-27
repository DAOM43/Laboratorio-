import type { Post } from '@/types'
const KEY = 'posts_cache_v1'

export function readPostsCache(): Post[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Post[]) : []
  } catch {
    return []
  }
}
export function writePostsCache(data: Post[]): void {
  localStorage.setItem(KEY, JSON.stringify(data))
}
export function clearPostsCache(): void {
  localStorage.removeItem(KEY)
}
