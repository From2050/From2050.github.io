---
layout: themes/journal/base.njk
permalink: /demo/journal/work/db-migration/
title: 不停機更換主資料庫
seoTitle: 案例 · 不停機更換主資料庫
description: 個人策展服務的內頁示範 — 誌面系架構的案例頁。
bodyClass: case
period: 2025 Q3 – Q4
role: 技術主導
tags: [PostgreSQL, 雙寫, 零停機]
confirmed: 2026-08-02
summary: 把一個日活三十萬的服務的主資料庫換掉,而使用者完全沒有感覺。花了四個月,其中三個月在準備回滾。
evidence:
  - label: 零停機完成切換
    detail: 全程沒有維護視窗,使用者端無感;切換當下的錯誤率變化在正常波動範圍內。
  - label: 資料一致性 100%
    detail: 切換前連續兩週比對雙寫的兩份資料,差異數為零才進入切流階段。
  - label: 可在 90 秒內回滾
    detail: 每一個階段都保留回滾路徑,並實際演練過三次。
---
<article class="case-page">
  <header class="case-header">
    <p class="case-meta"><span class="case-period">{{ period }}</span><span class="case-role">{{ role }}</span></p>
    <h1>{{ title }}</h1>
    <p class="case-summary">{{ summary }}</p>
    <ul class="case-tags">{% for t in tags %}<li>{{ t }}</li>{% endfor %}</ul>
  </header>

  <div class="case-body">

## 問題

服務跑在一套 MySQL 上,已經到了單機的極限。要換到 PostgreSQL,但這是主資料庫 —— 停機一小時,客服信箱就會爆。

管理層問「能不能找一個週日凌晨做」。可以,但風險是:如果切到一半發現問題,回滾的時間可能比切換還久。

## 我的角色

我負責遷移計畫與執行。資料庫團隊負責 PostgreSQL 的容量規劃與調校,那部分不是我做的。

## 關鍵決策

不用停機視窗,改成**雙寫加影子讀取**,分四個階段慢慢移。

第一階段只寫新庫、不讀。第二階段開始影子讀取 —— 讀舊庫回應使用者,同時讀新庫比對結果但丟掉,只記錄差異。第三階段開始切流,1%、10%、50%。第四階段停掉舊庫寫入。

**三個月裡有兩個半月在做第二階段。** 因為影子讀取一直有差異,追下去發現是兩邊對排序不穩定的處理不同 —— 沒有 ORDER BY 的查詢,兩個資料庫回傳順序不一樣,而我們有一段程式碼默默依賴了那個順序。

那段程式碼寫在四年前,原作者已經離職。

## 成果

切換當天沒有人注意到。這是最好的結果。

> 零停機的代價不是技術更難,是準備期更長。真正花時間的不是切換,是把「舊系統其實依賴了什麼」一條一條挖出來。

  </div>

  <section class="case-evidence">
    <h2>證據</h2>
    <dl>
      {%- for e in evidence %}<div><dt>{{ e.label }}</dt><dd>{{ e.detail }}</dd></div>{% endfor %}
    </dl>
  </section>

  <footer class="case-footer">
    <p class="case-confirmed">本頁內容由本人確認於 {{ confirmed | isoDate }} — 範圍與角色皆為實際擁有度,未誇大。</p>
    <a class="case-back" href="{{ home }}">← 回到所有作品</a>
  </footer>
</article>
