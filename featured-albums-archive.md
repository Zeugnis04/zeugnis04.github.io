---
layout: page
title: Featured Albums Archive
nav_exclude: true
---

<p class="subtitle"> from featured albums till now</p>

<div class="album-flex inside-text-width">

  {% for post in site.categories.album-review %}
    <div class="album">
      <a href="{{ post.url | relative_url }}" class="album-link">
        {% if post.cover %}
          <img src="{{ post.cover }}" alt="{{ post.title }} cover">
        {% endif %}
      </a>
      <div class="album-info">
        <h4>{{ post.title }}</h4>
        <body><em>{{ post.excerpt | strip_html}}</em></body>
      </div>
    </div>
  {% endfor %}

</div>
<p class="backarrow" style="text-align: right;">
    <a href="/">← Back to home</a>
  </p>