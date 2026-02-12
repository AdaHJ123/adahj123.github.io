import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"

createApp(App).use(router).mount('#app')



// main.js 是入口文件，作用就是把你的 Vue 应用“启动”起来：

// 引入全局样式：import "./style.css"。
// 引入根组件：import App from "./App.vue"，这是应用的外框架（比如 Navbar + <RouterView> 占位）。
// 引入路由：import router from "./router"，这里面写了 URL 对应哪个页面（/ → Home，/contact → SendEmail）。
// 启动并挂载：createApp(App).use(router).mount("#app")
// createApp(App): 以 App 作为根组件创建应用实例。
// .use(router): 把路由插件装上去，<RouterView>/<RouterLink> 才能工作。
// .mount("#app"): 把应用挂到 index.html 里的根节点。
// 为什么要这么做？因为只有在入口里把 router 装进应用，Banner 里
// 的 <RouterLink> 和 App 里的 <RouterView> 才能正常工作。



// 在 Vite 里 index.html 是入口模板，不需要你手动 import：

// 开发/打包时，Vite 会直接把项目根的 index.html 作为入口文件提供给浏览器。
// index.html 里 <script type="module" src="/src/main.js"> 这行会加载你的 main.js，再挂载 App.vue 到 <div id="app"></div>。
// 因为 dev server 默认提供的就是这个 index.html，你打开站点看到的就是它的内容（再加上 Vue 渲染出来的部分）。
// 所以虽然你没“引用”它，它始终是页面的起点。