import React from 'react'

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Admin</h1>
        <p>Aplicação administrativa — use este painel para gerenciar o sistema.</p>
      </header>
      <main>
        <p>
          Backend: <a href="/api/hello">/api/hello</a>
        </p>
      </main>
    </div>
  )
}
