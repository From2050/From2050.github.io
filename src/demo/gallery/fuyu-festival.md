---
layout: themes/gallery/base.njk
permalink: /demo/gallery/work/fuyu-festival/
title: 浮嶼音樂節 — 主視覺
seoTitle: 浮嶼音樂節 主視覺 · 展示架構示範
description: 個人策展服務的案例頁示範 — 視覺系架構。
kicker: KEY VISUAL · 2026
lead: 一個辦在離島、只有兩千人規模的音樂節,預算做不出大型製作,但需要在社群上看起來像大場。
facts:
  - { k: 客戶, v: 浮嶼音樂節 }
  - { k: 服務範圍, v: 主視覺 · 社群素材 · 現場指標 }
  - { k: 期程, v: 6 週 }
  - { k: 我的角色, v: 設計主導 }
tile: tile-fest
tileInner: '<span class="v-title">浮<br>嶼<br>祭</span>'
prev: { label: 山海製茶, href: /demo/gallery/work/shanhai-tea/ }
next: { label: 回到作品 →, href: /demo/gallery/ }
---
<div class="wrap">
  <section class="case-hero">
    <p class="case-kicker">{{ kicker }}</p>
    <h1>{{ title }}</h1>
    <p class="lead">{{ lead }}</p>
  </section>

  <figure class="case-figure">
    <div class="work-tile {{ tile }}">{{ tileInner | safe }}</div>
    <figcaption>主視覺 — 日落與夜色交界的漸層,直排標題</figcaption>
  </figure>

  <dl class="case-facts">
    {%- for f in facts %}<div><dt>{{ f.k }}</dt><dd>{{ f.v }}</dd></div>{% endfor %}
  </dl>

  <div class="case-body">

## 問題

主辦方拿到的預算,租船和音響就用掉八成。沒有錢做實景拍攝,也請不起藝人拍主視覺。

但音樂節賣票靠社群,主視覺要能在限動裡被認出來 —— 而且是在滑很快的情況下。

## 我做了什麼

放棄具象,改用**顏色和構圖**當記憶點。

主視覺只有兩個元素:一道從橘到紫的漸層(取自島上日落到入夜的實拍色票),和直排的三個字。沒有照片,沒有人像,沒有藝人。

好處是它可以無限延伸 —— 同一組漸層加不同的字,就是每一組演出的宣傳圖。主辦方後來自己用 Canva 產了四十幾張,風格全部是對的。

## 關鍵決策

原本規劃要做十二組藝人的個別主視覺,我建議砍掉。

理由:兩千人的音樂節,觀眾不是為了特定藝人來的,是為了「去離島玩三天」。**主視覺該賣的是那個氛圍,不是卡司。**

把省下的設計時間換成現場指標系統 —— 從碼頭到營地一路都有同一套視覺。散場後社群上出現最多的照片,是有人在指標牌前面比讚。

> 預算不夠的時候,不要做小一號的大型製作,要換一個不需要那麼多錢的做法。

  </div>

  <div class="case-pair">
    <div class="work-tile tile-photo"><span class="moon"></span></div>
    <div class="work-tile tile-app">
      <div class="ui-frame">
        <div class="bar"><i></i><i></i><i></i></div>
        <div class="body"><div class="row hero"></div><div class="row"></div><div class="row half"></div></div>
      </div>
    </div>
  </div>

  <nav class="case-nav">
    <a href="{{ prev.href }}">← {{ prev.label }}</a>
    <a href="{{ next.href }}">{{ next.label }}</a>
  </nav>
</div>
