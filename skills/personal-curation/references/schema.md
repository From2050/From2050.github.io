# 內容檔案格式

所有使用者內容集中在 `src/content/`,分兩種:

```
src/content/
├── fields/       結構化欄位(YAML)
│   ├── profile.yaml
│   ├── socials.yaml
│   ├── projects.yaml
│   ├── articles.yaml
│   ├── instagram.yaml
│   └── site.yaml
└── cases/        完整案例頁(Markdown)
    └── *.md
```

展示系統在 `src/_includes/`。**策展過程不要動它。**

---

## profile.yaml

```yaml
name: Jay Wu
altName: 巫傑能 · Chieh-Neng Wu     # 選填
tagline: Hardware & embedded systems engineer
bio: >-
  兩到三句。這裡放主線,不是職稱清單。
avatar: https://github.com/USERNAME.png
location: Ottawa, Canada
```

`bio` 是主線落地的地方。若寫出來只是職稱堆疊,代表定位訪談沒做完。

---

## socials.yaml

```yaml
- platform: youtube        # youtube / instagram / threads / github / linkedin / email
  label: YouTube
  handle: "@handle"
  url: https://www.youtube.com/@handle
  enabled: true            # false = 保留設定但不顯示
```

`enabled: false` 讓使用者先填好、之後再開,不必刪掉再重寫。

---

## cases/*.md — 完整案例頁

```yaml
---
layout: case.njk
permalink: /work/SLUG/
title: 案例標題
summary: 一到兩句,說清楚這是什麼、你的角色到哪裡
role: 你實際擔任的位置
period: 2017 – 2026
order: 1                   # 首頁排序
featured: true
tags: [關鍵字, 關鍵字]
confirmed: 2026-08-02      # 本人確認範圍與角色的日期
evidence:
  - label: 可查核的成果
    detail: 具體到數字、規模或可驗證的事實
---

## 問題
## 我的角色
## 關鍵決策
## 成果
```

### 各欄位的判準

**`summary`** — 必須包含角色邊界。「我做了 X」和「我參與的團隊做了 X」是不同的句子,寫錯就是膨脹。

**`evidence`** — 每一條都要能回答「憑什麼相信?」。沒有證據的成果寫進內文即可,不要放進 evidence 區塊 —— 那個區塊的價值來自它的可查核性,摻進無法查核的項目會稀釋掉全部。

**`confirmed`** — 沒有經過本人確認就不要填。這個欄位是整個方法可信度的錨點。

**內文** — 用 `>` 引言拉出可轉移的教訓(不是佳句)。教訓要能讓沒做過這件事的人也拿得走。

---

## articles.yaml / instagram.yaml

```yaml
# articles.yaml — 新的在前
- title: 文章標題
  date: 2026-07-10
  url: https://...
  source: Medium

# instagram.yaml — 手動精選的公開貼文網址
- https://www.instagram.com/p/SHORTCODE/
```

Instagram 用官方 oEmbed,不需要 API token。代價是不會自動更新,而且卡片是 Instagram 固定的白底樣式。

---

## 空值行為

所有區塊在沒有內容時**自動隱藏**。不要為了填版面塞佔位內容 —— 三件有證據的作品,勝過八件沒有背景的連結。
