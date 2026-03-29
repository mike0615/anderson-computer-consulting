---
title: FreeIPA — Create User via Ansible
description: Ansible task to create a FreeIPA user with standard attributes and group membership.
language: Ansible
tags: [freeipa, ansible, identity, ldap]
---

## Description

Creates a user in FreeIPA with standard attributes, sets a temporary password, and adds to specified groups. Requires the `freeipa.ansible_freeipa` collection.

## Prerequisites

```bash
ansible-galaxy collection install freeipa.ansible_freeipa
```

## Playbook

```yaml
---
- name: Create FreeIPA User
  hosts: ipaserver
  become: false
  vars:
    ipaadmin_password: "{{ vault_ipa_admin_password }}"
    ipaadmin_principal: admin
    user:
      login: jdoe
      first: John
      last: Doe
      email: jdoe@example.com
      groups:
        - sysadmins
        - vpn-users

  tasks:
    - name: Ensure user exists
      freeipa.ansible_freeipa.ipauser:
        ipaadmin_password: "{{ ipaadmin_password }}"
        ipaadmin_principal: "{{ ipaadmin_principal }}"
        name: "{{ user.login }}"
        first: "{{ user.first }}"
        last: "{{ user.last }}"
        email: "{{ user.email }}"
        password: "ChangeMe123!"
        update_password: on_create
        state: present

    - name: Add user to groups
      freeipa.ansible_freeipa.ipagroup:
        ipaadmin_password: "{{ ipaadmin_password }}"
        ipaadmin_principal: "{{ ipaadmin_principal }}"
        name: "{{ item }}"
        action: member
        user:
          - "{{ user.login }}"
        state: present
      loop: "{{ user.groups }}"
```

## Notes

- Store `vault_ipa_admin_password` in Ansible Vault
- User will be forced to change password on first login
- Requires SSH/API access to the IPA server host
