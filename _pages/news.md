---
layout: page
title: News
permalink: /news/
---

<ul class="updates">
  {% assign updates = site.news | sort: 'date' | reverse %}
  {% for item in updates %}
    <li>
      {% if item.date_precision == 'month' %}
        <time datetime="{{ item.date | date: '%Y-%m' }}">{{ item.date | date: '%b %Y' }}</time>
      {% else %}
        <time datetime="{{ item.date | date_to_xmlschema }}">{{ item.date | date: '%b %d, %Y' }}</time>
      {% endif %}
      <div>{{ item.content | remove: '<p>' | remove: '</p>' }}</div>
    </li>
  {% endfor %}
</ul>
