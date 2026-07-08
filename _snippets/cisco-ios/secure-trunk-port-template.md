---
title: Secure Cisco Trunk Port Template
description: Example trunk port baseline for enterprise switch uplinks with explicit VLAN controls.
language: Cisco IOS
tags: [cisco, ios, trunk, hardening]
---

## Description

Starter trunk template for switch uplinks where explicit VLAN control and predictable operational behavior matter more than convenience defaults.

## Configuration

```ios
interface GigabitEthernet1/0/48
 description UPLINK-TO-DISTRIBUTION
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,99
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root
 logging event trunk-status
 no shutdown
```

## Notes

- Keep the native VLAN unused for user traffic.
- Pair with documented VLAN ownership and pruning standards.
