# Используйте Node.js в качестве базового образа
FROM node:latest

# Установите рабочую директорию внутри контейнера
WORKDIR /app

# Скопируйте зависимости package.json и package-lock.json (или yarn.lock, если используется Yarn)
COPY cosmetic_meow_frontend/package*.json /app/
COPY ../.env.local /app/

# Установите зависимости
RUN npm install

# Скопируйте все файлы из текущего каталога хоста в рабочую директорию внутри контейнера
COPY cosmetic_meow_frontend/ /app/

# Запустите приложение React
CMD ["npm", "start"]
