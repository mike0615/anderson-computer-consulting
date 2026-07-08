---
title: FreeIPA Replication Troubleshooting Checklist
description: Practical checklist for diagnosing FreeIPA replication backlog, divergence, and SSH key propagation issues.
category: Identity
tags: [freeipa, ldap, kerberos, replication, sssd]
updated: 2026-04-19
---

## Overview

When FreeIPA replication drifts, the symptoms usually show up somewhere else first: stale SSH keys, missing user attributes, certificate failures, or inconsistent login behavior between hosts.

## Quick Triage

1. Confirm which IPA node accepted the last known-good change.
2. Check replication agreements and recent failures.
3. Verify that SSSD-backed consumers can actually see the expected attributes.
4. Distinguish directory replication issues from client cache issues.

## Commands

```bash
ipa topologysegment-find domain
ipa-replica-manage list -v
sudo journalctl -u dirsrv@* -n 200 --no-pager
sudo ldapsearch -Y EXTERNAL -H ldapi:/// -b "cn=mapping tree,cn=config" -LLL
sss_cache -E
sss_ssh_authorizedkeys mike
sss_ssh_authorizedkeys robot
```

## What to Look For

| Signal | Meaning |
|---|---|
| Missing CSN / changelog errors | Replica likely needs reinitialization |
| Attribute exists on one IPA node only | Replication issue, not client issue |
| `sss_ssh_authorizedkeys` returns correct key but SSH fails | Check sshd config and permissions |
| Restarting `sssd` fixes one host only | Client cache or trust path issue |

## Good Operating Practice

- Keep one known-good authoritative path for user and host changes.
- Publish SSH keys through FreeIPA for IPA-managed systems.
- Use local `authorized_keys` only for break-glass or non-IPA hosts.
- Document replica rebuild and reinitialization steps before you need them.
