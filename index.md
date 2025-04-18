---
layout: page-hero
title: Random Access Memories
nav_title: Home
head_title: Welcome to RAM
subtitle: Blogspace for anything
weight: 1
---
---
<div class="index-title"><span class="ornament">❧</span> Recent Posts</div>
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
          <strong><span class="tag-ornament">❦</span> Tags</strong>:
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
<div class="index-title"><span class="ornament">❧</span> Featured Albums</div>
<div class="album-flex inside-text-width">
  <div class="album">
  <a href="blog/album-review/luminescent-creatures">
    <img src="assets/img/featured_albums/luminiscentcreatures.png"></a>
    <div class="album-info">
      <h4>Luminescent Creatures - 青葉市子  </h4>
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

