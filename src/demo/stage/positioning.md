---
layout: themes/stage/base.njk
permalink: /demo/stage/service/positioning/
title: 轉職定位工作坊
seoTitle: 服務 · 轉職定位工作坊
description: 個人策展服務的內頁示範 — 舞台系架構的服務頁。
lead: 一對一,兩次各 90 分鐘。用四個問題找出你下一步真正能贏的位置,然後把它寫成別人聽得懂的一句話。
facts:
  - { k: 形式, v: 一對一線上 }
  - { k: 時數, v: 兩次 × 90 分鐘 }
  - { k: 產出, v: 定位陳述 + 履歷修改建議 }
  - { k: 適合, v: 有 5 年以上經歷的轉職者 }
---
<div class="wrap">
  <section class="talk-hero">
    <p class="label">Service</p>
    <h1>{{ title }}</h1>
    <p class="lead">{{ lead }}</p>
  </section>

  <dl class="talk-facts">
    {%- for f in facts %}<div><dt>{{ f.k }}</dt><dd>{{ f.v }}</dd></div>{% endfor %}
  </dl>

  <div class="talk-body">

## 這不是履歷健檢

改字句沒有用。如果定位本身是模糊的,再漂亮的句子也撐不住第二個追問。

我們會先花整整一次,只做一件事:**找出你的位置**。你能贏的地方在哪、市場上跟你相似的人在做什麼、你有什麼是他們沒有的。

## 第一次:挖

四個問題,一次問一個,問到具體為止:

- 你解決過最難的問題是什麼?當時別人做不到的原因是什麼?
- 別人來找你,通常是因為什麼事?
- 你做過最不甘願、但事後證明正確的決定是什麼?
- 如果只能留一項專長,你留哪一個?

大部分人在第二題就會發現,自己被找的原因跟履歷上寫的重點不一樣。

## 第二次:收

把第一次挖出來的東西收斂成:

- 一句定位陳述
- 三個支撐它的經歷,附上可驗證的成果
- 一份履歷修改建議(具體到哪一段改成什麼)

## 我不做的事

我不代寫履歷,不保證面試邀約,也不提供無限次修改。**這是一次把定位想清楚的過程,不是外包。**

> 定位不是想出來的,是從你已經做過的事裡挖出來的。

  </div>

  <div class="book-cta">
    <h2>想聊聊你的下一步?</h2>
    <p>先來信描述目前的狀況,我會回覆是否適合。</p>
    <a class="btn btn-brass" href="mailto:{{ p.contact.email }}">來信預約</a>
  </div>

  <nav class="case-nav" style="display:flex;justify-content:space-between;padding:40px 0 60px;font-size:.9rem;">
    <a href="/demo/stage/talk/resume-as-argument/">← 職涯敘事力</a>
    <a href="{{ home }}">回到首頁 →</a>
  </nav>
</div>
