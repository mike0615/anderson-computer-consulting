---
title: Rocky Linux Security Hardening Checklist
description: Practical hardening guidance for SSH, firewalld, SELinux, sysctl, and password policy on Rocky Linux systems.
category: Security
tags: [rocky-linux, security, ssh, firewalld, selinux, hardening]
updated: 2026-04-19
---

## Overview

Security hardening works best when it is repeatable and operationally supportable. The goal is not to make a system theoretically perfect; the goal is to reduce risk without making the platform unmanageable.

## SSH Hardening

```ssh_config
PermitRootLogin no
PasswordAuthentication no
ChallengeResponseAuthentication no
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
AllowGroups sshusers
LogLevel VERBOSE
```

Validate before restart:

```bash
sshd -t
systemctl restart sshd
```

## Firewall Baseline

```bash
firewall-cmd --set-default-zone=drop
firewall-cmd --permanent --zone=trusted --add-source=192.168.10.0/24
firewall-cmd --permanent --zone=trusted --add-service=ssh
firewall-cmd --reload
firewall-cmd --list-all --zone=trusted
```

## SELinux

```bash
getenforce
sestatus
ausearch -m avc -ts recent
restorecon -Rv /var/www/html
setsebool -P httpd_can_network_connect 1
```

Common fixes:

| Problem | Fix |
|---|---|
| service cannot bind non-standard web port | `semanage port -a -t http_port_t -p tcp 8080` |
| web service cannot read app files in `/opt` | set file context with `semanage fcontext` then `restorecon` |
| AVC denials after new app deploy | review with `ausearch` before forcing permissive mode |

## sysctl Hardening

```bash
cat >/etc/sysctl.d/99-hardening.conf <<'EOF'
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.tcp_syncookies = 1
net.ipv4.icmp_echo_ignore_broadcasts = 1
kernel.yama.ptrace_scope = 1
kernel.kptr_restrict = 2
EOF
sysctl -p /etc/sysctl.d/99-hardening.conf
```

## Password and Lockout Policy

```ini
# /etc/security/pwquality.conf
minlen = 12
dcredit = -1
ucredit = -1
lcredit = -1
ocredit = -1
maxrepeat = 3
```

```ini
# /etc/security/faillock.conf
deny = 5
unlock_time = 300
fail_interval = 900
```

## Operational Guidance

- harden with automation, not one-off manual edits
- keep a break-glass path documented before disabling password auth
- test SELinux and firewall changes against the actual application workflow
- log what changed, why, and how to reverse it
