#!/bin/bash

# Переходим в каталог с приложением
cd main || exit

# Устанавливаем зависимости
pip install -r requirements.txt || exit

# Применяем миграции базы данных
python manage.py migrate || exit

# Загружаем начальные данные
python manage.py loaddata games/fixtures/gameType.json games/fixtures/game.json || exit

# Запускаем сервер разработки
python manage.py runserver