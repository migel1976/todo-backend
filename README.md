# Express + ORM Prisma + TypeScript + Postgres
## учебный проект TODO

### запуск приложения:
изменить строку подключения к бд в файле .env в корне приложения
в соответствии с Ваши логином и паролем для подключения к БД
DATABASE_URL="postgresql://login:password@localhost:5432/todo?schema=public"

npx prisma migrate dev
npm run start
