FROM node:16
WORKDIR /workspace

# RUN groupadd -r app && useradd --no-log-init -r -g app app
# RUN mkdir /home/app
# RUN chmod -R a+rw /home/app
# USER app

#CMD CMD bash -c "npm ci && npm start"