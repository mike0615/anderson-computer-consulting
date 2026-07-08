---
title: Network Testing Scripts for Operations Teams
description: Bash patterns for host sweeps, port checks, service health validation, bandwidth tests, and multi-host command execution.
category: Automation
tags: [bash, networking, scripts, operations, testing]
updated: 2026-04-19
---

## Overview

Small, readable scripts are still useful when you need quick operational checks without pulling in a larger monitoring or orchestration stack.

## Host Sweep

```bash
#!/usr/bin/env bash
SUBNET="${1:-192.168.10}"
for i in $(seq 1 254); do
  host="${SUBNET}.${i}"
  if ping -c 1 -W 1 "$host" &>/dev/null; then
    echo "$host"
  fi
done
```

## Port Check

```bash
#!/usr/bin/env bash
HOST="${1:-localhost}"
PORTS="${2:-22,80,443,8080}"
IFS=',' read -ra PORT_LIST <<< "$PORTS"
for port in "${PORT_LIST[@]}"; do
  if nc -zw 2 "$HOST" "$port" 2>/dev/null; then
    printf "%s OPEN\n" "$port"
  else
    printf "%s closed\n" "$port"
  fi
done
```

## HTTP Service Check

```bash
#!/usr/bin/env bash
for url in http://localhost:3000 https://ipa.example.lab; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -k --connect-timeout 5 --max-time 10 "$url")
  echo "$url -> $code"
done
```

## Bandwidth Test

```bash
iperf3 -c 192.168.10.10 -t 10
iperf3 -c 192.168.10.10 -R -t 10
iperf3 -c 192.168.10.10 -u -b 100M -t 10
```

## Multi-Host Command Runner

```bash
#!/usr/bin/env bash
cmd="${1:-uptime}"
shift
for host in "$@"; do
  echo "=== $host ==="
  ssh -o BatchMode=yes -o ConnectTimeout=5 "$host" "$cmd"
done
```

## Practical Guidance

- keep scripts readable enough to hand to another admin
- make hostnames, ports, and thresholds parameters rather than hardcoded values
- prefer JSON output if the script will feed another system later
