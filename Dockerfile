FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npx playwright install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
