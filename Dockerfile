FROM node:16
WORKDIR /workspace

RUN npm i -g expo-cli local-cors-proxy

CMD bash -c "npm i && expo start"