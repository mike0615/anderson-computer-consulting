---
title: Systematic Linux Troubleshooting Workflow
description: Repeatable troubleshooting method for services, networking, DNS, storage, CPU, and memory issues on Linux systems.
category: Infrastructure
tags: [troubleshooting, linux, debugging, diagnostics, methodology]
updated: 2026-04-19
---

## Overview

Good troubleshooting is less about memorizing commands and more about using a repeatable process under pressure.

## The Method

1. **Observe** the actual failure and exact error.
2. **Isolate** where the break occurs.
3. **Form a hypothesis** you can test.
4. **Change one thing at a time.**
5. **Document** what you learned.

## Service Fails to Start

```bash
systemctl status myservice
journalctl -u myservice -n 50 --no-pager
ss -tulnp | grep :80
nginx -t
sshd -t
```

## Connectivity Problems

```bash
ip link show
ip addr show
ip route show
ping -c 3 $(ip route | awk '/default/ {print $3; exit}')
nc -zv target-host 443
traceroute -n target-host
mtr -n --report target-host
```

## DNS Problems

```bash
cat /etc/resolv.conf
dig @192.168.10.10 example.com
nslookup example.com
getent hosts example.com
grep hosts /etc/nsswitch.conf
```

## Disk Full

```bash
df -hT
du -sh /var/* 2>/dev/null | sort -rh | head
find /var/log -size +100M -type f
lsof +L1 | grep deleted
journalctl --vacuum-size=500M
dnf clean all
```

## CPU or Memory Pressure

```bash
top
ps aux --sort=-%cpu | head
ps aux --sort=-%mem | head
free -h
journalctl -k | grep -i oom
strace -p <PID> -c
```

## Practical Advice

- test configs before restarting services
- verify whether the problem is local, network, DNS, auth, or application level
- do not restart multiple components at once unless you already know the blast radius
- write down findings while you work, not after the outage
