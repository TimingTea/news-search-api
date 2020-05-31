# news-search-api
**Версия 1.0.0**
**Ссылка на сервер:** 
https://api.news-search.gq
https://www.api.news-search.gq
**Описание:**
API для приложения news-search.gq

## API может :
* GET-запрос /users/me возвращает информацию о пользователе (email и имя);
* GET-запрос /articles возвращает все сохранённые пользователем статьи;
* POST-запрос /articles создаёт статью с переданными в теле keyword, title, text, date, source, link и image;
* DELETE-запрос /articles/articleId удаляет сохранённую статью по _id;
* POST-запрос /signup создаёт пользователя с переданными в теле email, password и name;
* POST-запрос /signin проверяет переданные в теле почту и пароль и возвращает JWT;

## Установка:

* Скачать репозиторий: git clone git@github.com:TimingTea/news-search-api.git
* Установить npm-зависимости: npm i
* Запустить проект на локальном сервере: npm run start
* Команда npm run dev запускает сервер на localhost:3000 с хот релоудом;

