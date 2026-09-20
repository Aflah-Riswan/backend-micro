FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN mkdir -p dist/infrastructure/grpc/proto
RUN cp src/infrastructure/grpc/proto/user.proto dist/infrastructure/grpc/proto/user.proto

EXPOSE 5000

CMD ["npm", "start"]