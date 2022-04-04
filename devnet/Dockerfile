FROM node:16-bullseye
# Set the /app directory as working directory
WORKDIR /app

RUN apt install python3.9

# Install ganache-cli globally
RUN npm install -g ganache
# Set the default command for the image

COPY entrypoint.sh entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]