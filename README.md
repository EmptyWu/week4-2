## 使用docker 設定一個空白的node 進行vite 操作
```docker
    # 建立 image
    docker build -t node20-dev .
    # 建立 container 並且進入終端模式
    docker run -it -v E:\docker\ViteVue2024_Week4:/app/week4 --name node20-container node20-dev
```

## Vite 建立 Vue
```js
    //使用 vite 建立vue
    npm create vite@latest
    /*
    ✔ Add TypeScript? … No / Yes
    ✔ Add JSX Support? … No / Yes
    ✔ Add Vue Router for Single Page Application development? … No / Yes
    ✔ Add Pinia for state management? … No / Yes
    ✔ Add Vitest for Unit Testing? … No / Yes
    ✔ Add an End-to-End Testing Solution? › No
    ✔ Add ESLint for code quality? … No / Yes
    ✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes
    */
```
See [Vite Configuration Reference](https://vitejs.dev/config/).

## 運行
```
    # 運行並編譯
    docker compose up --build -d 
    #進入終端
    docker exec -it vitevue-week4 /bin/bash
```

## 安裝fortawesome
```
npm i --save @fortawesome/fontawesome-svg-core
# Free icons styles
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons

npm i --save @fortawesome/vue-fontawesome@latest-3
```
main.ts 引入
```js
/* Set up using Vue 3 */
import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
/*引入需要的icon */
import { faHouse, faPlus,faXmark } from '@fortawesome/free-solid-svg-icons'

/*讀取 icon */
library.add(faHouse,faPlus,faXmark);

/* 在app 後面加入component */
createApp(App)
 .component('font-awesome-icon', FontAwesomeIcon)
 .mount('#app')
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
vue
```js
```