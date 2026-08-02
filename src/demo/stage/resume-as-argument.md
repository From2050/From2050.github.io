---
layout: themes/stage/base.njk
permalink: /demo/stage/talk/resume-as-argument/
title: 你的履歷不是清單,是論證
seoTitle: 演講 · 你的履歷不是清單,是論證
description: 個人策展服務的內頁示範 — 舞台系架構的演講頁。
lead: 大部分人的履歷是「我做過什麼」的清單。但招募方要的不是清單,是一個能說服他的論證。這場演講講怎麼把前者換成後者。
facts:
  - { k: 形式, v: 主題演講 / 內訓 }
  - { k: 長度, v: 18 分鐘 · 可延伸為 90 分鐘工作坊 }
  - { k: 適合, v: 轉職者 · 團隊主管 · 職涯輔導單位 }
  - { k: 講過, v: 12 場 }
---
<div class="wrap">
  <section class="talk-hero">
    <p class="label">Featured Talk</p>
    <h1>{{ title }}</h1>
    <p class="lead">{{ lead }}</p>
  </section>

  <div class="video">
    <span class="play"><i></i></span>
    <span class="caption">年會主題演講 · 18 分鐘</span>
  </div>

  <dl class="talk-facts">
    {%- for f in facts %}<div><dt>{{ f.k }}</dt><dd>{{ f.v }}</dd></div>{% endfor %}
  </dl>

  <div class="talk-body">

## 為什麼清單沒有用

招募方一天看四十份履歷。清單型履歷的問題不是資訊不足,是**資訊沒有方向** —— 讀完知道你做過很多事,但不知道你是誰。

論證型履歷不一樣:它先給一個主張,再用經歷當證據支持它。讀的人不需要自己拼湊。

## 這場演講會拆解

- 一條主線怎麼找:從看似無關的經歷裡找出重複出現的模式
- 三個證據怎麼選:擁有度、可驗證性、與主線的相關性
- 一句記憶點怎麼寫:讓面試官在會議室裡能複述給別人聽
- 常見的四種膨脹寫法,以及它們為什麼會被一眼看穿

## 實際做過的調整

現場會用真實(去識別化)的履歷做示範。最常見的修改是把「參與 X 專案」改成「在 X 專案裡我負責 Y,結果是 Z」—— 同一件事,可信度差很多。

> 你不需要更多經歷,你需要把已經有的經歷排成一個論證。

  </div>

  <div class="book-cta">
    <h2>想在貴單位辦一場?</h2>
    <p>可依對象調整為 18 分鐘演講或 90 分鐘工作坊。</p>
    <a class="btn btn-brass" href="mailto:{{ p.contact.email }}">來信洽談</a>
  </div>

  <nav class="case-nav" style="display:flex;justify-content:space-between;padding:40px 0 60px;font-size:.9rem;">
    <a href="{{ home }}">← 回到首頁</a>
    <a href="/demo/stage/service/positioning/">轉職定位工作坊 →</a>
  </nav>
</div>
