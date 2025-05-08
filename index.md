---
layout: page-hero
title: Random Access Memories
nav_title: Home
head_title: Welcome to RAM
subtitle: Blogspace for anything
weight: 1
---
---
<div class="index-title"><span class="ornament">1</span> Recent Posts</div>
{% assign today = site.time | date: "%s" | plus: 0 %}
{% assign new_cutoff = today | minus: 518400 %}

<div class="recent-posts">
  {% assign visible_posts = site.posts | where_exp: "post", "post.hidden != true" %}
  {% for post in visible_posts limit:5 %}
    {% assign post_date = post.date | date: "%s" | plus: 0 %}
    <div class="recent-post">
      <h4>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {% if post_date > new_cutoff %}
          <span class="new-badge">NEW</span>
        {% endif %}
      </h4>
      <div class="post-meta">
        {{ post.date | date: "%Y-%m-%d" }}
        {% if post.tags %}
          <strong><span class="tag-ornament">j</span>Tags</strong>:
          {% for tag in post.tags %}
            <a href="/tags#{{ tag | slugify }}" class="tag">{{ tag }}</a>{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        {% endif %}
      </div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 35 }}</p>
    </div>
  {% endfor %}
</div>

---
<div class="index-title"><span class="ornament">1</span> Featured Albums</div>
<div class="album-flex inside-text-width">
  <div class="album">
  <a href="blog/album-review/luminescent-creatures">
    <img src="assets/img/featured_albums/luminiscentcreatures.png"></a>
    <div class="album-info">
      <h4>Luminescent Creatures - 青葉市子</h4>
      <body><em>a deep dive into Mother Earth</em></body>
    </div>
  </div>
  <div class="album">
  <a href="blog/album-review/forever-howlong  ">
    <img src="assets/img/featured_albums/foreverhowlong.png" alt="Forever Howlong"></a>
    <div class="album-info">
      <h4>Forever Howlong - Black Country, New Road</h4>
      <body><em>communal and baroque</em></body>
    </div>
  </div>
</div>
<section>
  <div style="clear: both"></div>
  <p class="backarrow" style="text-align: right;"><a href="featured-albums-archive">→ Featured albums archive</a></p>
</section>

---
<div class="index-title"><span class="ornament">1</span> Currently Reading Books</div>
<div class="currently-reading">
  <div class="book-cover">
    <img src="assets/img/currently-reading-books/sansirou.jpg" alt="Book Cover">
  </div>
  <div class="book-quote">
    <blockquote>
      <span lang="ko">“스트레이 십.” 미네코가 입속으로 말했다. 산시로는 그 숨결을 느낄 수 있었다.</span>
    </blockquote>
    <blockquote>
    <span lang="ja"><ruby>「迷える子」<rt>ストレイ・シープ</rt></ruby>と美禰子が口の内で言った。三四郎はその<ruby>呼吸<rt>いき</rt></ruby>を感ずることができた。<br>
      <cite>— 夏目漱石, <strong>三四郎</strong></cite></span>
    </blockquote>
  </div>
</div>

---