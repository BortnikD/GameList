@echo off
call pip install -r requirements.txt
if %errorlevel% neq 0 exit /b %errorlevel%
cd main
call python manage.py migrate
if %errorlevel% neq 0 exit /b %errorlevel%
call python manage.py loaddata games/fixtures/gameType.json games/fixtures/game.json
if %errorlevel% neq 0 exit /b %errorlevel%
call python manage.py runserver