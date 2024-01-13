import App from './App'

// 引入公用样式
import "./Common-style/style.css";
import "./Common-style/popup.css";


import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}