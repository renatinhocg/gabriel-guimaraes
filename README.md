# monorepo (backend, frontend, admin)

Estrutura inicial criada com três pastas:

- `backend/` — Node.js + Express (porta padrão: 3001)
- `frontend/` — React (Vite) app (porta padrão: 5173)
- `admin/` — React (Vite) app (porta padrão: 5175)

Como rodar localmente (PowerShell):

1. Instalar dependências de cada app (na raiz do repositório):

```powershell
npm install --prefix backend
npm install --prefix frontend
npm install --prefix admin
```

2. Rodar cada app (em terminais separados) ou usar os scripts da raiz:

```powershell
npm run dev:backend    # roda backend (nodemon)
npm run dev:frontend   # roda frontend (vite)
npm run dev:admin      # roda admin (vite)
```

Se quiser rodar tudo junto (opcional), instale dependências da raiz e use `dev:all`:

```powershell
npm install
npm run dev:all
```

Endpoints de exemplo:

- Backend: GET /health => status
- Backend: GET /api/hello => { message: 'Hello from backend!' }
