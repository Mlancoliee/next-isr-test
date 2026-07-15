# next-isr-demo

ISR 功能验证 demo，覆盖三种再生方式。

## 路由

| Route | Type | 验证点 |
|-------|------|--------|
| `/isr` | ISR (10s) | 定时再生 — 时间戳 10 秒内不变 |
| `/blog/1` | ISR (30s) + tag | 按 tag 再生 — 调 API 后刷新 |
| `/blog/2` | ISR (30s) + tag | 同上 |
| `/ssg` | SSG | 对照组 — 永不变化 |
| `/ssr` | SSR | 对照组 — 每次都变 |

## 测试步骤

### 1. 定时再生

```bash
# 多次刷新 /isr，时间戳 10 秒内相同
curl -s https://<domain>/isr | grep "Rendered at"

# 等 10 秒后再刷新，时间戳更新
sleep 12 && curl -s https://<domain>/isr | grep "Rendered at"
```

### 2. 按 Tag 再生

```bash
# 记录当前时间戳
curl -s https://<domain>/blog/1 | grep "Rendered at"

# 触发 tag purge（清除所有 "posts" tag 的页面）
curl https://<domain>/api/revalidate?tag=posts

# 刷新 — 时间戳应该更新
curl -s https://<domain>/blog/1 | grep "Rendered at"
curl -s https://<domain>/blog/2 | grep "Rendered at"  # 这个也更新了
```

### 3. 按 Path 再生

```bash
# 只清除 /isr
curl https://<domain>/api/revalidate?path=/isr

# /isr 更新了，/blog/1 没变
curl -s https://<domain>/isr | grep "Rendered at"
```

### 4. 检查响应头

```bash
curl -I https://<domain>/isr
# 应该有:
# eo-cdn-cache-control: s-maxage=10, stale-while-revalidate=31536000, durable
# cache-tag: /layout,/isr/layout,/isr/page,/isr
# cache-control: public, max-age=0, must-revalidate
```

## 本地开发

```bash
npm install
npm run dev
# 访问 http://localhost:3000
```

## 部署

```bash
npm run build
edgeone pages deploy
```
