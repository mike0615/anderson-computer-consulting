---
title: FreeIPA Deployment and Client Enrollment Basics
description: Generic FreeIPA server installation, Linux client enrollment, and common administrative tasks for identity-centric infrastructure.
category: Identity
tags: [freeipa, ldap, kerberos, sssd, identity]
updated: 2026-04-19
---

## Overview

FreeIPA combines LDAP, Kerberos, DNS, and certificate management into one platform. It is a strong fit for Linux-centric environments that need centralized identity without relying on external cloud services.

## Server Prerequisites

- static IP address
- working forward and reverse DNS
- firewall allowances for LDAP, Kerberos, DNS, HTTP, and HTTPS
- a hostname that resolves correctly before installation starts

## Install the Server

```bash
hostnamectl set-hostname ipa.example.lab
dnf install -y ipa-server ipa-server-dns

firewall-cmd --permanent --add-service={freeipa-ldap,freeipa-ldaps,freeipa-replication,dns,kerberos,kpasswd,http,https,ntp}
firewall-cmd --reload
```

```bash
ipa-server-install \
  --setup-dns \
  --forwarder=8.8.8.8 \
  --domain=example.lab \
  --realm=EXAMPLE.LAB \
  --ds-password='<replace-with-strong-directory-manager-password>' \
  --admin-password='<replace-with-strong-admin-password>' \
  --hostname=ipa.example.lab \
  --ip-address=192.168.10.10 \
  --auto-reverse \
  --unattended
```

## Enroll a Linux Client

```bash
dnf install -y ipa-client

ipa-client-install \
  --domain=example.lab \
  --server=ipa.example.lab \
  --realm=EXAMPLE.LAB \
  --principal=admin \
  --password='<replace-with-admin-password>' \
  --hostname=$(hostname -f) \
  --unattended
```

## Verify

```bash
kinit admin
ipa ping
systemctl status sssd
sssctl domain-status example.lab
id admin@example.lab
```

## Common Admin Tasks

```bash
ipa user-add jdoe --first=John --last=Doe --email=jdoe@example.lab
ipa group-add sysadmins
ipa group-add-member sysadmins --users=jdoe
ipa host-find
ipa user-find
```

## Good Practice

- use strong passwords or keytabs during bootstrap, then move to safer long-term workflows
- document HBAC, sudo rules, and SSH key strategy early
- do not treat DNS as optional in FreeIPA environments
