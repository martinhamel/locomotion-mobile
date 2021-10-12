FROM node:16
WORKDIR /workspace

RUN npm i --unsafe-perm -g expo-cli

CMD expo start