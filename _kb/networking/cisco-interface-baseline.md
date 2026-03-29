---
title: Cisco Interface Baseline Configuration
description: Standard interface hardening and configuration template for Cisco Catalyst switches and routers.
category: Networking
tags: [cisco, ios, hardening, baseline]
updated: 2026-03-28
---

## Overview

This guide covers the baseline interface configuration for Cisco Catalyst switches (9300 series) and ISR routers (8300 series) used in enterprise environments. These settings align with security hardening best practices and ICD 503 requirements.

## Access Port Template

```ios
interface GigabitEthernet1/0/1
 description WORKSTATION-01
 switchport mode access
 switchport access vlan 10
 switchport nonegotiate
 spanning-tree portfast
 spanning-tree bpduguard enable
 ip dhcp snooping limit rate 15
 storm-control broadcast level 20.00
 storm-control action shutdown
 no cdp enable
 no lldp transmit
 no lldp receive
 shutdown
```

## Trunk Port Template

```ios
interface GigabitEthernet1/0/48
 description UPLINK-TO-CORE
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,99
 switchport trunk native vlan 999
 switchport nonegotiate
 no shutdown
```

## Loopback Interface

```ios
interface Loopback0
 description ROUTER-ID
 ip address 10.255.0.1 255.255.255.255
```

## Key Security Settings

| Setting | Purpose |
|---|---|
| `switchport nonegotiate` | Disables DTP — prevents VLAN hopping |
| `bpduguard enable` | Protects STP topology from rogue switches |
| `storm-control` | Limits broadcast/multicast flooding |
| `no cdp enable` | Disables CDP on access ports |
| Native VLAN 999 | Unused VLAN for trunk native — prevents attacks |

## Verification Commands

```ios
show interfaces status
show spanning-tree portfast
show storm-control
show cdp neighbors
```
