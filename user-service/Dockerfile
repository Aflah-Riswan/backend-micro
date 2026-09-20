FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN mkdir -p dist/infrastructure/grpc/proto
RUN cp src/infrastructure/grpc/proto/user.proto dist/infrastructure/grpc/proto/user.proto

EXPOSE 4000
EXPOSE 5001

CMD ["npm", "start"]