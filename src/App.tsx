import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const loc = useLocation()
  return (
    <div className="min-h-screen p-4 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">SPA Posts</h1>
        <nav className="flex gap-3">
          <Link className={`underline-offset-4 ${loc.pathname==='/'?'underline':''}`} to="/">Lista</Link>
          <Link className={`underline-offset-4 ${loc.pathname.startsWith('/nuevo')?'underline':''}`} to="/nuevo">Nuevo</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
