---
layout: page
title: Identity and Access Knowledge Base
label: Knowledge Base
permalink: /knowledge-base/categories/identity/
breadcrumb:
  - title: Knowledge Base
    url: /knowledge-base/
  - title: Identity and Access
---

Identity is one of the first places infrastructure drift becomes visible. These articles focus on FreeIPA, LDAP, Kerberos, SSSD, certificates, and the practical integration points that break in real environments.

## Topics Covered

- FreeIPA deployment and migration
- LDAP and Kerberos integration
- SSSD-backed SSH key handling
- DNS and certificate dependencies
- trust and replication troubleshooting

## Articles

<ul class="kb-article-list">
{% assign articles = site.kb | where: "category", "Identity" %}
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
