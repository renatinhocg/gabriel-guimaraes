# Backend notes

O backend suporta CORS (configurado via variável CORS_ORIGIN) e possui integração com PostgreSQL.

Arquivos importantes:
- `.env.example` — exemplo das variáveis de ambiente
- `db.js` — cria pool Pg usando env
- `init-db.sql` — script de inicialização de tabela `users`

Endpoints úteis:
- `GET /health` — verificação de saúde
- `GET /api/hello` — resposta de teste
- `GET /api/db-ping` — testa a conexão com o banco e retorna o horário do banco

Dica: em produção configure `DATABASE_URL` (ex: `postgres://USER:PASS@HOST:PORT/DBNAME`).
