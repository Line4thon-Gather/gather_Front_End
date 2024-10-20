# 1. 빌드 단계 - Node 이미지로 빌드
FROM node:18-alpine
RUN npm install -g serve
COPY dist dist
ENTRYPOINT ["serve", "-s", "dist"]

# 2. 서빙 단계 - Nginx로 빌드 결과 서빙
# FROM nginx:alpine
# COPY --from=builder /src/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]