import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import PostsListPage from './pages/PostsListPage'
import PostFormPage from './pages/PostFormPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<PostsListPage />} />
          <Route path="nuevo" element={<PostFormPage mode="create" />} />
          <Route path="editar/:id" element={<PostFormPage mode="edit" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
