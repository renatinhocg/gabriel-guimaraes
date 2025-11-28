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
 - Backend: GET /api/db-ping => test connection to Postgres (returns DB time when configured)

Configuração do Postgres (dev)

1) Exemplo rápido usando Docker (cria um container PostgreSQL):

```powershell
docker run --name local-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=app_db -p 5432:5432 -d postgres:15
```

2) Variáveis de ambiente esperadas (veja `backend/.env.example`):

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/app_db
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=app_db
PGSSLMODE=disable
```

3) Para inicializar a estrutura mínima (exemplo):

```powershell
# conectar ao container usando psql (ou use um cliente GUI)
psql -h localhost -U postgres -d app_db
# depois dentro do psql, execute o SQL em backend/init-db.sql
\i backend/init-db.sql
```

OBS: o backend expõe `/api/db-ping` que retorna a hora do servidor Postgres se a conexão estiver correta.

Deploy no Railway — se continuar com erro
---------------------------------------

Se o Railway continuar a falhar na etapa "Build image" por problemas de dependências nativas (rollup/esbuild), uma solução robusta é usar o Dockerfile do serviço para garantir um ambiente idêntico ao local. Eu adicionei `frontend/Dockerfile` e `admin/Dockerfile` que usam Node 18 para build e `nginx` para servir o `dist/`.

Opções de deploy no Railway:

- Usar o Dockerfile (recomendado): vá no serviço → Settings e selecione para fazer build com Dockerfile (ou configure para usar Dockerfile na criação do serviço). Isso cria imagem consistente e evita problemas com dependências nativas.
- Ajustar install/build commands: em Settings -> Build, defina `Install Command` como `npm ci` e `Build Command` como `npm run build` (ou `npm install` caso você precise incluir devDependencies). Outra opção é setar a variável `NPM_CONFIG_PRODUCTION=false` para forçar instalar `devDependencies`.

Automação (GitHub Actions)
--------------------------------

Adicionei um workflow do GitHub Actions que builda imagens Docker para `frontend`, `admin` e `backend` e as publica no GitHub Container Registry (GHCR) em pushes para `main`.

Como usar as imagens no Railway:

1. Vá no serviço do Railway (por exemplo `frontend`) → Settings → Deploy settings (ou similar) e selecione "Deploy from image" / "Container Registry".
2. Use a URL da imagem criada pelo workflow: `ghcr.io/<YOUR_GITHUB_ORG_OR_USER>/gabriel-guimaraes-frontend:latest` (substitua `<YOUR_GITHUB_ORG_OR_USER>` pelo seu usuário ou organização GitHub).
3. Para backend use `ghcr.io/<YOUR_GITHUB_ORG_OR_USER>/gabriel-guimaraes-backend:latest`.
4. Em Variables defina `DATABASE_URL` apontando para o Postgres da Railway e `PGSSLMODE=require` se necessário.

Observações de permissões:
- O workflow usa o `GITHUB_TOKEN` para autenticar e publicar em GHCR; quando o Actions rodar, as imagens serão escritas para `ghcr.io/${{ github.repository_owner }}`. Certifique-se que sua conta/organização permita pacotes e que o token tenha permissions (o fluxo padrão funciona para a maioria dos repositórios).


Se quiser, eu posso também:
- adicionar `.nvmrc` (já adicionado) e Dockerfile para cada app (já feito) e criar um workflow do GitHub Actions que testa e constrói artefatos (opcional),
- ou criar Dockerfile também para `backend` e um workflow de CI/CD.
