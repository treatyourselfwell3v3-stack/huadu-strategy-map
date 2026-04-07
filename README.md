# huadu-strategy-map

## 技能交换小程序（示例）

这是一个微信小程序原型，面向“技能交换”场景，支持：

- 首页浏览交换信息
- 发布自己的技能交换需求
- 根据关键词快速匹配
- 个人中心查看资料与标签

## 目录结构

- `app.js` / `app.json` / `app.wxss`：小程序全局配置
- `pages/home`：首页信息流
- `pages/publish`：发布页面
- `pages/match`：匹配页（前端过滤演示）
- `pages/profile`：个人中心
- `utils/mock.js`：演示数据

## 运行方式

1. 使用微信开发者工具打开仓库目录。
2. 选择“小程序”项目并导入。
3. 预览四个 Tab 页面交互。

4. 运行快速检查：`bash scripts/smoke-check.sh`。

> 当前版本为前端原型演示，尚未接入后端接口与数据库。
