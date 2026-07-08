---
layout: page
title: Networking Knowledge Base
label: Knowledge Base
permalink: /knowledge-base/categories/networking/
breadcrumb:
  - title: Knowledge Base
    url: /knowledge-base/
  - title: Networking
---

Practical networking guidance from real enterprise and government environments, with a focus on secure, supportable designs that can be operated by an actual team.

## Topics Covered

- Cisco switching and routing baselines
- Juniper SRX policy and segmentation
- VLAN and subnet planning
- ARP, routing, and NAT troubleshooting
- Multi-site connectivity and operational documentation

## Articles

<ul class="kb-article-list">
{% assign articles = site.kb | where: "category", "Networking" %}
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
