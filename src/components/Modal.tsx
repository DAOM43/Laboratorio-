import type { ReactNode } from 'react'

type Props = {
  open: boolean
  title?: string
  children: ReactNode
  onClose: () => void
}
export default function Modal({ open, title, children, onClose }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center p-4">
      <div className="bg-white text-black rounded-lg w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
