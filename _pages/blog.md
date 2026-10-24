---
layout: page
permalink: /blog/
title: Blog
description: Research notes, technical practice, and reflections.
nav: true
nav_order: 2
---

{% if site.posts.size > 0 %}
<ul class="post-list">
  {% for post in site.posts %}
  <li>
    <h2><a class="post-title" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h2>
    <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
    {% if post.description %}
    <p>{{ post.description | escape }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>
{% else %}
<p>Articles are on the way.</p>
{% endif %}
