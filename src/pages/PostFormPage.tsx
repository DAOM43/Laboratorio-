import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// ⚠️ Usa rutas relativas para evitar el problema del alias por ahora
import type { Post } from '../types'
import { createPost, getPost, updatePost } from '../services/posts'
import { readPostsCache, writePostsCache } from '../utils/storage'

export default function PostFormPage({ mode }: { mode: 'create' | 'edit' }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const editingId = mode === 'edit' ? Number(id) : null

  const [form, setForm] = useState<Pick<Post, 'title' | 'body' | 'userId'>>({
    title: '',
    body: '',
    userId: 1
  })
  const [loading, setLoading] = useState(mode === 'edit')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (editingId) {
      ;(async () => {
        try {
          const cache: Post[] = readPostsCache()
          const cached = cache.find((p: Post) => p.id === editingId)
          if (cached) setForm({ title: cached.title, body: cached.body, userId: cached.userId })

          setLoading(true)
          const data = await getPost(editingId)
          setForm({ title: data.title, body: data.body, userId: data.userId })
        } catch {
          setError('Error al cargar')
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [editingId])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.body.trim()) {
      alert('Título y contenido son requeridos')
      return
    }
    const cache: Post[] = readPostsCache()

    try {
      if (mode === 'create') {
        const optimisticId = Math.floor(Math.random() * 100000)
        writePostsCache([{ id: optimisticId, ...form } as Post, ...cache])
        navigate('/')

        const created = await createPost({ ...form })
        const updated: Post[] = [{ ...created }, ...cache]
        writePostsCache(updated)
      } else if (editingId) {
        const optimistic: Post[] = cache.map((p: Post) =>
          p.id === editingId ? { ...p, ...form } : p
        )
        writePostsCache(optimistic)
        navigate('/')

        const saved = await updatePost(editingId, form)
        const reconciled: Post[] = readPostsCache().map((p: Post) =>
          p.id === editingId ? { ...p, ...saved } : p
        )
        writePostsCache(reconciled)
      }
    } catch {
      alert('La API demo no guardó; los cambios quedan en esta app (localStorage).')
    }
  }

  if (loading) return <p>Cargando…</p>
  if (error) return <p>Error: {error}</p>

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-xl">
      <div>
        <label className="block mb-1">Título *</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Contenido *</label>
        <textarea
          className="border rounded px-2 py-1 w-full"
          rows={6}
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block mb-1">User ID</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-28"
          value={form.userId}
          onChange={(e) => setForm((f) => ({ ...f, userId: Number(e.target.value || 1) }))}
          min={1}
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="font-semibold">
          {mode === 'create' ? 'Crear' : 'Guardar'}
        </button>
        <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
      </div>
    </form>
  )
}
