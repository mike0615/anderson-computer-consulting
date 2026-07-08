---
title: DNS Operations and Validation Reference
description: Practical DNS query patterns, BIND zone examples, and forward/reverse validation checks for infrastructure teams.
category: Infrastructure
tags: [dns, bind, dig, zones, validation]
updated: 2026-04-19
---

## Overview

DNS failures often look like application failures until you isolate them. A solid operations reference should cover both the query tools and the zone structure behind them.

## Query Tools

### `dig`

```bash
dig example.com
dig +short example.com
dig -x 192.168.10.10
dig MX example.com
dig SRV _ldap._tcp.example.lab
dig +trace example.com
```

### `nslookup` and `host`

```bash
nslookup example.com 192.168.10.10
host example.com
host -t MX example.com
```

## Forward Zone Example

```dns
$TTL 86400
@   IN  SOA ipa.example.lab. hostmaster.example.lab. (
            2026041901
            3600
            900
            604800
            300 )

@       IN  NS  ipa.example.lab.
ipa     IN  A   192.168.10.10
web01   IN  A   192.168.10.21
www     IN  CNAME web01.example.lab.
```

## Reverse Zone Example

```dns
$TTL 86400
@       IN  NS  ipa.example.lab.
10      IN  PTR ipa.example.lab.
21      IN  PTR web01.example.lab.
```

## Operational Checks

- confirm forward lookup
- confirm reverse lookup
- confirm SRV records for identity-driven services
- check for forward records without PTR and vice versa

## Practical Guidance

- keep serial number handling consistent
- do not ignore reverse DNS in identity-heavy environments
- validate records from the resolver path clients actually use
