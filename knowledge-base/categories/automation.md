---
layout: page
title: Automation Knowledge Base
label: Knowledge Base
permalink: /knowledge-base/categories/automation/
breadcrumb:
  - title: Knowledge Base
    url: /knowledge-base/
  - title: Automation
---

Automation content for teams that need repeatable deployment, reliable handoff, and fewer manual rebuild steps.

## Topics Covered

- Ansible design patterns
- CI/CD for infrastructure
- offline content distribution
- config collection and parsing
- repeatable build and validation workflows

## Articles

<ul class="kb-article-list">
{% assign articles = site.kb | where: "category", "Automation" %}
{% for article in articles %}
  <li>
    <a href="{{ article.url | relative_url }}">{{ article.title }}</a>
    <div class="kb-meta">
      {% if article.tags %}{% for tag in article.tags %}<span class="kb-tag">{{ tag }}</span>{% endfor %}{% endif %}
      {% if article.updated %}&nbsp;·&nbsp; Updated: {{ article.updated }}{% endif %}
    </div>
  </li>
{% endfor %}
</ul>
