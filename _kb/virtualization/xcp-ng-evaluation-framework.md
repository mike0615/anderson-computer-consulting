---
title: XCP-ng Evaluation Framework for VMware Migrations
description: A practical framework for evaluating XCP-ng and Xen Orchestra in enterprise environments moving away from VMware.
category: Virtualization
tags: [xcp-ng, xen-orchestra, vmware, migration, virtualization]
updated: 2026-04-19
---

## Overview

XCP-ng evaluation should be more than a feature comparison. The real question is whether the platform fits your operational model.

## Evaluation Areas

### 1. Hypervisor Operations

- host lifecycle and patching
- cluster behavior during maintenance
- storage attachment and recovery workflows

### 2. Management Plane

- day-to-day usability in Xen Orchestra
- RBAC and admin separation
- backup orchestration and restore testing

### 3. Networking

- VLAN and trunk behavior
- multi-subnet guest connectivity
- integration with existing routing, firewall, and monitoring models

### 4. Migration Readiness

- supported conversion paths
- guest OS compatibility
- operational documentation for your team

## Recommended Lab Outputs

- validated guest templates
- restore test results
- performance notes by workload type
- operational runbooks for patching, backup, and failure response

If the platform wins technically but your team cannot operate it confidently, the evaluation is incomplete.
