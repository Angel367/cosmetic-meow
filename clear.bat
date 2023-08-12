@echo off

rem Активация виртуального окружения (замените "venv" на путь к вашему venv)
call venv\Scripts\activate
cd cosmeticmeow


rem Удаляем db.sqlite3
if exist db.sqlite3 (
    del db.sqlite3
    echo db.sqlite3 deleted
) else (
    echo db.sqlite3 not found
)

rem Удаляем файлы миграций (кроме __init__.py)
for /r %%i in (migrations\*.py) do (
    if not "%%~nxi" == "__init__.py" (
        del "%%i"
        echo "%%i" удален
    )
)

rem Запускаем makemigrations и migrate
python manage.py makemigrations
python manage.py migrate
python test_data_fill.py
cd ..

rem Деактивация виртуального окружения
deactivate

echo Готово!
pause
