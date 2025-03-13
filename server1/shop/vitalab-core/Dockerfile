FROM node:18

WORKDIR /app/medusa

COPY package.json .
COPY package-lock.json .
COPY develop.sh .
COPY yarn.* .

RUN apt-get update

RUN apt-get install -y python-is-python3 iproute2 openresolv iputils-ping

RUN npm install -g npm@10.9.2

RUN npm install -g @medusajs/medusa-cli@latest

RUN npm ci

COPY . .

ENTRYPOINT ["./develop.sh"]
