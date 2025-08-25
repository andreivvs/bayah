# Bayhan Mini-App (Telegram WebApp)

## Запуск

1. Настройте `.env` в папке `backend/` (см. пример ниже)
2. Установите зависимости:
   - `cd backend && yarn install`
   - `cd frontend && yarn install`
3. Запустите через Docker
   - `docker-compose up`
4. Примените миграции Prisma:
   - `cd backend`
   - `npx prisma migrate dev`
5. Откройте [http://localhost:3000](http://localhost:3000)

## Пример .env (backend/.env)
```
DATABASE_URL=postgres://bayhan:bayhanpass@db:5432/bayhan_db
TELEGRAM_BOT_TOKEN=ваш_токен_бота
```