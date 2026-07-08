---
title: journalctl and Log Management Reference
description: Useful journalctl filters, log rotation patterns, and common shell pipelines for Linux log analysis.
category: Infrastructure
tags: [journalctl, logs, journald, logrotate, diagnostics]
updated: 2026-04-19
---

## Overview

Logs are only useful if you can reduce them quickly to the signals that matter. `journalctl` plus a few shell tools handle most Linux incident review work.

## Core journalctl Commands

```bash
journalctl
journalctl -r
journalctl -n 100
journalctl -f
journalctl -u nginx
journalctl -u nginx -f
journalctl -b
journalctl -b -1
```

## Useful Filters

```bash
journalctl -p err
journalctl --since "1 hour ago"
journalctl --since "today"
journalctl _HOSTNAME=web01
journalctl _PID=12345
journalctl /usr/sbin/sshd
```

## Output Formats

```bash
journalctl -u nginx -o short-iso
journalctl -u nginx -o cat
journalctl -u nginx -o json | jq .
```

## Journal Maintenance

```bash
journalctl --disk-usage
journalctl --rotate
journalctl --vacuum-size=500M
journalctl --vacuum-time=30d
```

## Text Pipelines for Logs

```bash
grep -n "ERROR" /var/log/myapp/app.log
grep -B 2 -A 2 "ERROR" /var/log/myapp/app.log
tail -f /var/log/myapp/app.log | grep --line-buffered "ERROR"
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn
```

## logrotate Example

```text
/var/log/myapp/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0640 myapp myapp
}
```

## Practical Guidance

- query by time range first, then unit
- preserve enough retention to support real incident review
- rotate logs intentionally; do not wait for disk pressure to force the conversation
