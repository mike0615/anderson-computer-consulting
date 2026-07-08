---
title: Nmap Practical Reference for Infrastructure Teams
description: Common Nmap scan types, port selection, service detection, timing, and output patterns for safe troubleshooting and discovery.
category: Networking
tags: [nmap, scanning, ports, discovery, troubleshooting]
updated: 2026-04-19
---

## Overview

Nmap remains one of the best tools for answering a basic operational question: **what is reachable, on which ports, and what is actually listening there?**

## Basic Targeting

```bash
nmap 192.168.10.10
nmap 192.168.10.1-50
nmap 192.168.10.0/24
nmap -iL hosts.txt
```

## High-Value Scan Types

```bash
nmap -sn 192.168.10.0/24           # host discovery only
nmap -sT 192.168.10.10             # TCP connect scan
sudo nmap -sS 192.168.10.10        # SYN scan
sudo nmap -sU -p 53,67,68,161 192.168.10.10
nmap -sV 192.168.10.10             # service version detection
sudo nmap -O 192.168.10.10         # OS detection
nmap -A 192.168.10.10              # service, OS, scripts, traceroute
```

## Port Selection

```bash
nmap -p 22,80,443 192.168.10.10
nmap -p 1-1024 192.168.10.10
nmap -p- 192.168.10.10
nmap --top-ports 100 192.168.10.10
nmap -p T:80,443,U:53,161 192.168.10.10
```

## Timing

```bash
nmap -T3 192.168.10.10
nmap -T4 192.168.10.10
nmap --min-rate 100 192.168.10.10
```

Use higher speed settings only when you understand the network and the operational impact.

## Output You Can Reuse

```bash
nmap -oN scan.txt 192.168.10.10
nmap -oX scan.xml 192.168.10.10
nmap -oG scan.gnmap 192.168.10.10
nmap -oA fullscan 192.168.10.10
```

## Useful NSE Examples

```bash
nmap -sC 192.168.10.10
nmap --script=http-title,http-headers 192.168.10.10
nmap --script=safe 192.168.10.10
```

## Practical Guidance

- start with `-sn` or a narrow port list when scoping a system
- save results in grepable or XML form if you will parse them later
- use UDP scans selectively; they are slower and often noisier
- do not treat `-A` as the default for every target
