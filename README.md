# electron-repo

electron 学习汇总

版本：

## 资源汇总

- Electron Fiddle

## 性能

- [Chrome Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool/)

- [从分析运行时性能开始](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
- [谈:Visual Studio Code-第一个一秒](https://www.youtube.com/watch?v=r0OeHRUCCb4)

### Checklist: Performance recommendations

1. 谨慎地加载模块
2. 过早的加载和执行代码
3. 阻塞主进程
4. 阻塞渲染进程
5. 不必要的 polyfills
6. 不必要的或者阻塞的网络请求
7. 打包你的代码

## 安全

### Checklist: Security recommendations

1. 只加载安全的内容
2. 禁止在所有渲染器中使用 Node.js 集成显示远程内容
3. 在所有显示远程内容的渲染器中启用上下文隔离。
4. 启用进程沙盒化
5. 在所有加载远程内容的会话中使用 ses.setPermissionRequestHandler().
6. 不要禁用 webSecurity
7. 定义一个 Content-Security-Policy 并设置限制规则(如：script-src 'self')
8. 不要设置 allowRunningInsecureContent 为 true
9. 不要开启实验性功能
10. 不要使用 enableBlinkFeatures
11. <webview>：不要使用 allowpopups
12. <webview>：验证选项与参数
13. 禁用或限制网页跳转

```main.js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

14. 禁用或限制新窗口创建
15. 不要对不可信的内容使用 shell.openExternal
16. 使用当前版本的 Electron
