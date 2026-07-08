---
title: Ansible Inventory and Playbook Patterns
description: Inventory structure, ad-hoc usage, variable organization, and playbook patterns for repeatable infrastructure automation.
category: Automation
tags: [ansible, inventory, playbooks, yaml, automation]
updated: 2026-04-19
---

## Overview

Ansible works best when inventory, variables, and playbook structure are boring, predictable, and easy for another engineer to follow.

## Inventory Examples

### INI

```ini
[webservers]
web01.example.lab
web02.example.lab ansible_port=2222

[dbservers]
db01.example.lab ansible_user=dbadmin

[lab:children]
webservers
dbservers

[lab:vars]
ansible_user=ansible
ansible_become=true
ansible_python_interpreter=/usr/bin/python3
```

### YAML

```yaml
all:
  vars:
    ansible_user: ansible
    ansible_become: true
  children:
    webservers:
      hosts:
        web01.example.lab:
          ansible_host: 192.168.10.21
```

## Useful Ad-Hoc Commands

```bash
ansible all -i inventory/ -m ping
ansible all -i inventory/ -m command -a "uptime"
ansible webservers -i inventory/ -m dnf -a "name=nginx state=present"
ansible webservers -i inventory/ -m service -a "name=nginx state=restarted"
```

## Playbook Skeleton

```yaml
---
- name: Configure web servers
  hosts: webservers
  become: true
  gather_facts: true

  tasks:
    - name: Install nginx
      dnf:
        name: nginx
        state: present

    - name: Ensure nginx is enabled
      service:
        name: nginx
        state: started
        enabled: true
```

## Variable Layout

```text
inventory/
├── hosts.yml
├── group_vars/
│   ├── all.yml
│   └── webservers.yml
└── host_vars/
    └── web01.example.lab.yml
```

## Execution Patterns

```bash
ansible-playbook -i inventory/ site.yml
ansible-playbook -i inventory/ site.yml --check --diff
ansible-playbook -i inventory/ site.yml --limit web01
ansible-playbook -i inventory/ site.yml -e "http_port=8080"
```

## Practical Guidance

- keep inventories human-readable
- push secrets into Ansible Vault or another encrypted workflow
- prefer idempotent modules over shell commands
- use `--check` and `--diff` during review cycles when possible
