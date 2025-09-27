# 🧪 Laboratorio - SPA con React + Vite + TypeScript

Este es un proyecto de **Single Page Application (SPA)** construido con **React + Vite + TypeScript**, que consume la API de [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts).  
Permite **listar, crear, editar y eliminar posts** con UI optimista y persistencia en `localStorage`.

---

## 🚀 Tecnologías utilizadas
- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- Fetch API (consumo de JSONPlaceholder)
- LocalStorage (persistencia en el cliente)

--

## 📌 Funcionalidades
✅ Listar posts desde la API  
✅ Buscar posts por título o contenido  
✅ Crear nuevo post (UI optimista, persistencia en localStorage)  
✅ Editar post existente  
✅ Eliminar post con confirmación (modal)  
✅ Persistencia local aunque se recargue la página  

> ⚠️ Nota: **JSONPlaceholder no guarda cambios reales**. Los métodos `POST`, `PATCH`, `DELETE` son simulados.  
Por eso el proyecto usa **localStorage** para mantener los cambios visibles en el frontend.

---

## ⚙️ Instalación y ejecución

Clona este repositorio:

git clone https://github.com/DAOM43/Laboratorio-.git
cd Laboratorio-

Instala dependencias:

npm install

Ejecuta en modo desarrollo:

npm run dev
