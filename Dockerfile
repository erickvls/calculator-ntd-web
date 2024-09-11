# Step 1: Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build


FROM node:18-alpine

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]
