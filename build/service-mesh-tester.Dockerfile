FROM node:10.14.2-alpine

RUN mkdir /applications
WORKDIR /applications/

COPY . /applications
RUN npm i --production

EXPOSE 3000

CMD ["node", "bin/www"]
