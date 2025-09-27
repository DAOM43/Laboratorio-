import type { Post } from '../types'
import { Link } from 'react-router-dom'

type Props = {
  items: Post[]
  onDelete: (id: number) => void
}
export default function PostsTable({ items, onDelete }: Props) {
  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Title</th>
          <th className="p-2 border">Body</th>
          <th className="p-2 border"></th>
        </tr>
      </thead>
      <tbody>
        {items.map(p => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td className="p-2 border">{p.id}</td>
            <td className="p-2 border">{p.title}</td>
            <td className="p-2 border">{p.body}</td>
            <td className="p-2 border text-right">
              <Link className="mr-2 underline" to={`/editar/${p.id}`}>
                Editar
              </Link>
              <button className="underline" onClick={() => onDelete(p.id)}>
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
