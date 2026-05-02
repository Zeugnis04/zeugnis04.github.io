---
layout: ../layouts/PostLayout.astro
title: "Plugin Compatibility Test"
date: 2026-05-02
tags: [meta]
comments: false
---

{% newthought 'This paragraph starts like Tufte.' %} Here is a sidenote{% sidenote 'note-one' 'This is a sidenote rendered from the old Jekyll tag.' %} and a margin note{% marginnote 'margin-one' 'This is a margin note rendered from the old Jekyll tag.' %}.

{% maincolumn '/assets/img/beginning-coffee/aeroopress.webp' 'Aeropress' %}

{% fullwidth '/assets/img/featured_albums/magic-alive.webp' 'Magic, Alive!' %}

{% marginfigure 'margin-figure-one' '/assets/img/beginning-coffee/newcup.webp' 'New cup in the margin' %}

{% epigraph %}
It was the best of times, it was the worst of times.

<footer>Charles Dickens, <cite>A Tale of Two Cities</cite></footer>
{% endepigraph %}

Inline math: {% m %}a^2 + b^2 = c^2{% em %}.

{% math %}
\int_0^1 x^2\,dx = \frac{1}{3}
{% endmath %}

{% gloss 1 "Indonesian (Sneddon 1996:237)" %}
Mereka | di | Jakarta | sekarang.
gloss: they | in | Jakarta | now
'They are in Jakarta now.'
{% endgloss %}

Raw Liquid should remain visible: {% raw %}{% sidenote 'raw' 'not transformed' %}{% endraw %}
