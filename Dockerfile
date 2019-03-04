
FROM node:10-alpine as builder

WORKDIR /app

COPY package.json ./package.json
RUN npm install --silent

COPY . ./
RUN npm run build
RUN ls /app/build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder ./app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]