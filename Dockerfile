
FROM node:12.16.2-stretch

# Create app directory
WORKDIR /usr/src/configs

# Install app dependencies
COPY . .

RUN ["npm","install"]
RUN ["chmod", "+x", "./start.sh"]

CMD ["./start.sh"]
