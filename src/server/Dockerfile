FROM node
MAINTAINER Francesco Ferraro <francescoaferraro@gmail.com>
WORKDIR /app
ADD . .
RUN npm i --ci --legacy-peer-deps
ENV PORT 4000
EXPOSE 4000
ENTRYPOINT ["node", "main.js"]
