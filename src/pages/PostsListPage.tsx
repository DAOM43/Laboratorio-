import { useEffect, useState } from 'react'
import type { Post } from '@/types'
import { listPosts, deletePost } from '@/services/posts'
import PostsTable from '@/components/PostsTable'
import Modal from '@/components/Modal'
import { readPostsCache, writePostsCache } from '@/utils/storage'

export default function PostsListPage() {
  const [rows, setRows] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<number | null>(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    const cache = readPostsCache()
    if (cache.length) {
      setRows(cache)
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const data = await listPosts()
        setRows(data)
        writePostsCache(data)
      } catch {
        setError('Error al listar')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function handleDelete(id: number) {
    const prev = rows
    const next = prev.filter(p => p.id !== id)
    setRows(next)
    writePostsCache(next)
    try {
      await deletePost(id)
    } catch {
      setRows(prev)
      writePostsCache(prev)
      alert('No se pudo borrar (API demo)')
    }
  }

  const filtered = rows.filter(
    p =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.body.toLowerCase().includes(q.toLowerCase())
  )

  if (loading) return <p>Cargando…</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Buscar…"
          className="border rounded px-2 py-1 w-full max-w-md"
        />
      </div>

      <PostsTable items={filtered} onDelete={(id: number) => setConfirmId(id)} />

      <Modal open={confirmId != null} title="Confirmar borrado" onClose={() => setConfirmId(null)}>
        <p className="mb-4">¿Seguro que deseas borrar el post {confirmId}?</p>
        <div className="flex justify-end gap-2">
          <button onClick={() => setConfirmId(null)}>Cancelar</button>
          <button
            className="font-semibold"
            onClick={() => {
              const id = confirmId as number
              setConfirmId(null)
              handleDelete(id)
            }}
          >
            Borrar
          </button>
        </div>
      </Modal>
    </>
  )
}
