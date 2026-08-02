---
layout: themes/journal/base.njk
permalink: /demo/journal/work/retry-storm/
title: 一次 retry 造成的雪崩
seoTitle: 案例 · 一次 retry 造成的雪崩
description: 個人策展服務的內頁示範 — 誌面系架構的案例頁。
bodyClass: case
period: 2024
role: 事故處理與後續修正
tags: [事故分析, 退避演算法, SRE]
confirmed: 2026-08-02
summary: 一個為了提高可靠度而加的重試機制,在尖峰時段把服務自己打掛。這是那次事故的完整記錄,以及我們後來改了什麼。
evidence:
  - label: 事故時長 47 分鐘
    detail: 從第一個警報到服務恢復;完整時序與決策記錄在內部 postmortem。
  - label: 修正後尖峰重試量下降 94%
    detail: 導入指數退避加抖動,並在客戶端加上重試預算後的實測數字。
  - label: 該類事故未再發生
    detail: 修正後至今 18 個月,沒有再出現重試放大造成的過載。
---
<article class="case-page">
  <header class="case-header">
    <p class="case-meta"><span class="case-period">{{ period }}</span><span class="case-role">{{ role }}</span></p>
    <h1>{{ title }}</h1>
    <p class="case-summary">{{ summary }}</p>
    <ul class="case-tags">{% for t in tags %}<li>{{ t }}</li>{% endfor %}</ul>
  </header>

  <div class="case-body">

## 症狀

週五晚上八點,尖峰。下游一個服務回應變慢,大約多了 200ms。

三分鐘後,整條鏈路掛掉。

## 追查

慢 200ms 不該造成雪崩。看監控發現下游的請求量在那三分鐘裡變成平常的六倍 —— 但上游的使用者流量沒有變。

流量是我們自己製造的。

## 根因

我們的客戶端設定了「失敗重試三次」。下游變慢之後開始逾時,每個逾時的請求變成四個請求。下游因此更慢,更多逾時,更多重試。

**這是一個正回饋迴路,而我們親手裝了上去。**

更糟的是每一層都有重試:前端一層、閘道一層、服務一層。三層各三次,一個請求最壞會變成 27 個。

## 修正

- 固定間隔改成指數退避加抖動,避免所有客戶端同時重試
- 加上重試預算:整體重試量超過總請求的 10% 就停止重試
- 只有最靠近使用者的那一層重試,中間層不再重試
- 加上斷路器,下游持續失敗時直接快速失敗

## 我的角色

事故當下我在待命,負責判斷與止血(關掉重試)。後續的修正是團隊一起做的,我負責重試預算那部分並寫了 postmortem。

> 重試是為了對抗暫時性故障。但當故障來自過載,重試就是在給火加油。

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
