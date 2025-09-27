import type { Post } from '../types'

const BASE = 'https://jsonplaceholder.typicode.com'

export async function listPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE}/posts`)
  if (!res.ok) throw new Error('Error al listar')
  return res.json()
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(`${BASE}/posts/${id}`)
  if (!res.ok) throw new Error('No encontrado')
  return res.json()
}

export async function createPost(data: Omit<Post, 'id'>): Promise<Post> {
  const res = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al crear')
  const server = await res.json()
  return { ...data, id: server.id ?? Math.floor(Math.random() * 100000) }
}

export async function updatePost(id: number, data: Partial<Post>): Promise<Post> {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al actualizar')
  return res.json()
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${BASE}/posts/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar')
}
