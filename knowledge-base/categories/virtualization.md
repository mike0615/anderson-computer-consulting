---
layout: page
title: Virtualization Knowledge Base
label: Knowledge Base
permalink: /knowledge-base/categories/virtualization/
breadcrumb:
  - title: Knowledge Base
    url: /knowledge-base/
  - title: Virtualization
---

Field-tested notes on KVM, XCP-ng, Xen Orchestra, platform migrations, and the operational details that matter after the hypervisor install is done.

## Topics Covered

- XCP-ng evaluation and migration planning
- KVM design on Rocky Linux
- management plane considerations
- storage and backup workflow planning
- template, rebuild, and lifecycle strategy

## Articles

<ul class="kb-article-list">
{% assign articles = site.kb | where: "category", "Virtualization" %}
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
