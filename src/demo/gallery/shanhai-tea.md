---
layout: themes/gallery/base.njk
permalink: /demo/gallery/work/shanhai-tea/
title: 山海製茶 — 品牌識別
seoTitle: 山海製茶 品牌識別 · 展示架構示範
description: 個人策展服務的案例頁示範 — 視覺系架構。
kicker: BRANDING · 2025
lead: 一間開了三十年的老茶行,兒子接手後想賣給年輕人,但又不想丟掉爸爸那套。
facts:
  - { k: 客戶, v: 山海製茶 }
  - { k: 服務範圍, v: 識別系統 · 包裝 · 通路物 }
  - { k: 期程, v: 14 週 }
  - { k: 我的角色, v: 設計主導 }
tile: tile-tea
tileInner: '<span class="glyph">茶</span><span class="stamp">山海</span>'
prev: { label: 回到作品, href: /demo/gallery/ }
next: { label: 浮嶼音樂節 →, href: /demo/gallery/work/fuyu-festival/ }
---
<div class="wrap">
  <section class="case-hero">
    <p class="case-kicker">{{ kicker }}</p>
    <h1>{{ title }}</h1>
    <p class="lead">{{ lead }}</p>
  </section>

  <figure class="case-figure">
    <div class="work-tile {{ tile }}">{{ tileInner | safe }}</div>
    <figcaption>主識別 — 以「茶」字為中心的印章式標誌</figcaption>
  </figure>

  <dl class="case-facts">
    {%- for f in facts %}<div><dt>{{ f.k }}</dt><dd>{{ f.v }}</dd></div>{% endfor %}
  </dl>

  <div class="case-body">

## 問題

老茶行的包裝是三十年前的樣子:紅底金字、燙金龍紋、字很擠。老客人認得,但年輕人走過去不會停下來。

第二代接手後想開拓新客群,第一個念頭是「全部換掉,做得像日系品牌那樣」。

但我看了他們的舊包裝之後,覺得不該全丟。**那套視覺其實有東西,只是被塞得太滿。**

## 我做了什麼

先做減法。把原本的元素拆開,一項一項問「這個拿掉會怎樣」:

燙金龍紋拿掉,沒有人想念。紅底改成墨綠 —— 那是他們烘焙室牆上的顏色,老闆說用了三十年。金色留下來,但只用在一個地方:那顆印章。

字體從擠壓的黑體改成襯線,字距放開。原本一個包裝上有十四個資訊,砍到四個。

## 關鍵決策

中間有一次爭執:業務希望包裝正面印「30 年老店」。

我提議拿掉,理由是年輕客群不會因為「老」而買,他們會因為「講究」而買。老可以出現在故事頁,不該出現在第一眼。

最後我們把它放到背面,變成一行小字。**上架三個月後,便利通路的回購率是原本包裝的兩倍多。**

> 重做品牌不等於丟掉過去。多數老品牌需要的不是換掉,是把已經有的東西整理乾淨。

  </div>

  <div class="case-pair">
    <div class="work-tile tile-soup"><div class="label-mock"><b>山海</b><span>PACKAGING</span></div></div>
    <div class="work-tile tile-illu"><i></i><i></i><i></i><i></i></div>
  </div>

  <nav class="case-nav">
    <a href="{{ prev.href }}">← {{ prev.label }}</a>
    <a href="{{ next.href }}">{{ next.label }}</a>
  </nav>
</div>
