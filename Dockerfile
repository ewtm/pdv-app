FROM node:18.15.0
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli
COPY . .
EXPOSE 4200

ENTRYPOINT [ "ng", "serve" ]
CMD [ "--host=0.0.0.0" ]
