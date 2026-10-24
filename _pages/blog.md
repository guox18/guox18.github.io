---
layout: page
permalink: /blog/
title: Blog
description: 研究、技术实践与工作流 · Research, practice, and workflows.
nav: true
nav_order: 2
---

<div class="writing-index">
  <nav class="writing-topics" aria-label="文章分类 / Topics">
    <button type="button" data-topic-filter="all" aria-pressed="true">全部 / All</button>
    <button type="button" data-topic-filter="research" aria-pressed="false">研究与论文</button>
    <button type="button" data-topic-filter="engineering" aria-pressed="false">技术实践</button>
    <button type="button" data-topic-filter="workflow" aria-pressed="false">工作流与思考</button>
    <button type="button" data-topic-filter="preview" aria-pressed="false">样式预览</button>
  </nav>
  {% assign groups = site.posts | group_by: 'translation_key' %}
  <div class="writing-entries">
    {% for group in groups %}
    {% assign entry = group.items | where: 'lang', 'zh-CN' | first %}
    {% unless entry %}{% assign entry = group.items | first %}{% endunless %}
    <article class="writing-entry" data-topic="{{ entry.topic | escape }}">
      <p class="reading-meta"><time datetime="{{ entry.date | date_to_xmlschema }}">{{ entry.date | date: '%Y-%m-%d' }}</time>{% if entry.preview %} · 样式预览 / Preview{% endif %}</p>
      <h2><a href="{{ entry.url | relative_url }}" lang="{{ entry.lang }}">{{ entry.title | escape }}</a></h2>
      <p>{{ entry.description | escape }}</p>
      <nav class="reading-languages" aria-label="文章语言 / Article language">
        {% assign versions = group.items | sort: 'lang' | reverse %}
        {% for version in versions %}
        <a href="{{ version.url | relative_url }}" lang="{{ version.lang }}" hreflang="{{ version.lang }}">{% if version.lang == 'zh-CN' %}中文{% else %}English{% endif %}</a>
        {% endfor %}
      </nav>
    </article>
    {% endfor %}
  </div>
  <p class="writing-empty" role="status" hidden>这个分类还没有文章。 / No articles in this topic yet.</p>
</div>
<script src="{{ '/assets/js/blog-reading.js' | relative_url }}" defer></script>
