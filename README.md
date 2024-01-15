Локальный запуск проекта.
- перейти в корневую папку проекта
- переименовать файл .env.example в .env
- в консоли выполнить команду docker compose build
- в консоли выполнить команду docker compose up

Запущенный проект локально будет доступен по адресу http://localhost:3000/api
При первом запуске системы будет создан пользователь admin c параметрами email (admin@admin.com) & password (admin).
Для получения jwt-токена - POST /api/auth/login
Основной роут для роутеризации евентов - POST /api/events/process-event (защищен jwt токеном).
Для получения логов из БД - GET /api/events/logs