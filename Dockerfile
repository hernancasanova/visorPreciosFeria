FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

#RUN npm install

copy . .

EXPOSE 5000 

#CMD ["npm" , "install"]
