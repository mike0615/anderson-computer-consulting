---
title: FreeIPA Replication Health Check
description: Shell snippet for checking replication agreements, recent dirsrv errors, and SSH key lookup visibility.
language: Bash
tags: [freeipa, replication, sssd, bash]
---

## Description

Quick health check to run on a FreeIPA server when investigating stale replication or SSH key propagation problems.

## Script

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "== topology =="
ipa topologysegment-find domain || true

echo
echo "== replica agreements =="
ipa-replica-manage list -v || true

echo
echo "== recent directory service messages =="
journalctl -u dirsrv@* -n 80 --no-pager || true

echo
echo "== sssd key visibility =="
sss_ssh_authorizedkeys mike || true
sss_ssh_authorizedkeys robot || true
```

## Notes

- Run as root or on a host with working IPA admin context.
- Use this as a first-pass signal, not a full recovery workflow.
