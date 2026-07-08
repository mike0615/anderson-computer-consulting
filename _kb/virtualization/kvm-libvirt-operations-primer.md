---
title: KVM and libvirt Operations Primer
description: Installation, storage pools, networks, VM lifecycle, and useful virsh commands for Rocky Linux virtualization hosts.
category: Virtualization
tags: [kvm, libvirt, virsh, qemu, rocky-linux]
updated: 2026-04-19
---

## Overview

KVM with libvirt is a strong foundation for Linux-based virtualization. It gives you a stable management layer, clean CLI tooling, and flexible storage/network definitions.

## Install the Stack

```bash
dnf install -y qemu-kvm libvirt virt-install virt-manager bridge-utils libguestfs-tools
systemctl enable --now libvirtd
virt-host-validate
virsh list --all
```

## Storage Pool Basics

```bash
virsh pool-list --all
virsh pool-define-as --name vm-images --type dir --target /var/lib/libvirt/images
virsh pool-build vm-images
virsh pool-start vm-images
virsh pool-autostart vm-images
```

## Network Basics

```bash
virsh net-list --all
virsh net-start default
virsh net-autostart default
```

For bridged designs, create the bridge in NetworkManager first, then point libvirt at it.

## Create a VM

```bash
virt-install \
  --name rocky9-base \
  --ram 2048 \
  --vcpus 2 \
  --disk path=/var/lib/libvirt/images/rocky9-base.qcow2,size=20,format=qcow2 \
  --cdrom /opt/isos/Rocky-9.x-x86_64-dvd.iso \
  --os-variant rocky9.0 \
  --network network=default \
  --graphics vnc,listen=0.0.0.0 \
  --noautoconsole
```

## Lifecycle Commands

```bash
virsh list --all
virsh start rocky9-base
virsh shutdown rocky9-base
virsh reboot rocky9-base
virsh destroy rocky9-base
virsh autostart rocky9-base
virsh console rocky9-base
virsh dumpxml rocky9-base
```

## Disk and Interface Operations

```bash
virsh domblklist rocky9-base
virsh domiflist rocky9-base
virsh attach-interface rocky9-base --type network --source default --model virtio --persistent
```

## Practical Guidance

- export domain XML along with backups
- treat autostart policy as an intentional design decision
- document storage pools, bridges, and VM roles so rebuilds are not guesswork
