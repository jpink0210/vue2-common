# frame

### 專案基本建置

有路由、有 store by module、有 alias
可以開始工作了各位。

pages, modules(vuex, store)
route/router
utility/http, http interceptors
config alias
vue-router, vue-types, vuex
sass-loader, node-sass

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# 說明

### Step1.
下載 repo

### Step2.

- 共用元件專案
釋出 css框架，1到數支不等的scss。
重中之重，本地可執行，打包出既為框架。

### Step3.

- 專案套用框架
1. 先設定相對路徑 vue.config.js
`
  .set(
    "common.scss",
    "@/../node_modules/共用元件專案名稱/src/scss"
  )
`
2. 在專案核心程式套入
app.ts
`
import "common.scss/a.variables.scss";
import "common.scss/b.scss";
import "common.scss/c.scss";
`

- 亦可以用 webpack 的設定檔套入
`
module.exports = {
  css: {
    loaderOptions: ....
`


3. 套用專案其他變數引入
- 為了方便 component 開發。
把 共用元件Repo 套上 @ 當作一個正式的外來引入對象，針對其 src。
`
  .set('common.styles', '@/../node_modules/CommonRepo/src/styles')
  .set('@CommonRepo', '@/../node_modules/CommonRepo/src')
`

### Step4.

共用元件Repo 隨著版本發佈，要每次更新
ex: yarn upgrade xxxRepo

## 比較

- [CSS框架設計] mutli-repo vs 共用元件

SCSS 框架釋出的技術上大同小異，只不過在排列次序上，
Mutli-Repo 注重的是變數的輸出，針對不同適用範圍。
然後共用元件專案注重是通用性、穩定性、版本控制，檔案引入數量不等無所謂。

