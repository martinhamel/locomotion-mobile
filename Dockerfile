FROM node:16
WORKDIR /workspace

RUN npm i -g expo-cli

CMD bash -c "npm i && expo start --port=19000"