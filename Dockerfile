FROM node:14
WORKDIR /workspace

RUN npm i -g expo-cli local-cors-proxy prettier

CMD bash -c "npm i && lcp --proxyUrl https://api.locomotion.app & expo start"
