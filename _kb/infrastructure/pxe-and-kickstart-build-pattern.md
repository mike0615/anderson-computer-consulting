---
title: PXE and Kickstart Build Pattern for Rocky Linux
description: Generic pattern for network-based Rocky Linux installation using dnsmasq, iPXE, HTTP delivery, and kickstart automation.
category: Infrastructure
tags: [pxe, kickstart, rocky-linux, dnsmasq, ipxe, automation]
updated: 2026-04-19
---

## Overview

A PXE environment turns operating system deployment into a repeatable service instead of a manual process. The exact implementation varies, but the core pattern stays the same.

## Core Components

| Component | Role |
|---|---|
| `dnsmasq` | DHCP and TFTP |
| iPXE | chainloaded boot environment |
| HTTP server | kernel, initrd, repo, and kickstart delivery |
| kickstart files | unattended install logic |

## Example Flow

```text
PXE client -> DHCP -> dnsmasq
PXE client -> TFTP -> iPXE binary
iPXE -> HTTP -> menu, kernel, initrd, kickstart
installer -> repo -> package content
```

## Example dnsmasq Snippet

```ini
dhcp-range=192.168.10.100,192.168.10.200,12h
enable-tftp
tftp-root=/var/lib/tftpboot

dhcp-userclass=set:ipxe,iPXE
dhcp-boot=tag:ipxe,http://192.168.10.10/boot/menu.ipxe
```

## Example iPXE Menu Entry

```ipxe
#!ipxe
kernel http://192.168.10.10/images/rocky9/vmlinuz
initrd http://192.168.10.10/images/rocky9/initrd.img
imgargs vmlinuz inst.repo=http://192.168.10.10/repo/rocky9 inst.ks=http://192.168.10.10/kickstart/rocky9-server.ks ip=dhcp
boot
```

## Example kickstart Elements

```kickstart
lang en_US.UTF-8
keyboard us
network --bootproto=dhcp --device=link --activate
timezone America/New_York --utc
reboot
```

## Practical Guidance

- standardize naming and directory structure before scaling the repo
- keep kickstart secrets out of world-readable web paths
- validate the repo and boot paths every time content changes
- pair PXE with configuration management so installs do not stop at day-0
