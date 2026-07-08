#!/usr/bin/env bash
set -euo pipefail

echo "== topology segments =="
ipa topologysegment-find domain || true

echo
echo "== replica agreements =="
ipa-replica-manage list -v || true

echo
echo "== recent dirsrv messages =="
journalctl -u dirsrv@* -n 80 --no-pager || true

echo
echo "== sssd visible keys =="
sss_ssh_authorizedkeys mike || true
sss_ssh_authorizedkeys robot || true
