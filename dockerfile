FROM node:20

RUN apt-get update && \
    apt-get install -y git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN git config --global user.email "chunhsing0921@gmail.com" && \
    git config --global user.name "Emptywu"

RUN npm cache clean --force    
RUN npm config set cache /app/.npm-cache --global    

WORKDIR /app

COPY package*.json ./

RUN npm i && \
    npm i typescript@latest --save-dev && \
    npm i gh-pages lucide-vue-next && \
    npm i --save axios && \
    npm i --save-dev sass

COPY . .

# 設置環境變量，啟用輪詢模式
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 5170-5179

#CMD [ "bash" ]
CMD ["npm", "run", "dev", "--", "--host"]