# Задание 1
## Первый сервис
Хранит информацию о пользователях.
Написан на javascript с использованием express.js и prisma.
Имеется обработка случаев когда первый сервис записал изменения в базу данных, а второй недоступен.
Запускается на 3000 порту.
### Запуск первого сервиса
1. Перейти в папку user-service
2. В файле .env указать свои данные базы данных
3. Написать команду npx prisma migrate dev
4. Написать команду npm start
## Второй сервис
Хранит историю действия с пользователями.
Написан на typescript с использованием nest.js и prisma. 
Запускается на 3001 порту. Имеет endpoint который принимает опциональные поля page, pageSize, user_id. Если поле user_id есть, то выдаст информацию только об изменениях этого пользователя, если поля нет, то выдаст информацию обо всех пользователях. Page и PageSize поля ответственные за пагинацию.
### Запуск второго сервиса 
1. Перейти в папку user-history
2. В файле .env указать свои данные базы данных
3. Написать команду npx prisma migrate dev
4. Написать команду npm start или npm start:dev