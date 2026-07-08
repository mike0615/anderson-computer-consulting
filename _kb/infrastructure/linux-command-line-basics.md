---
title: Linux Command-Line Basics for Infrastructure Work
description: Practical Linux filesystem, permissions, search, text processing, and process management commands for day-to-day operations.
category: Infrastructure
tags: [linux, shell, permissions, filesystem, operations]
updated: 2026-04-19
---

## Overview

Every infrastructure stack eventually comes back to a Linux shell prompt. This guide covers the small set of commands and concepts that solve most day-to-day administration tasks without turning into a full Linux course.

## Filesystem Landmarks

| Path | Purpose |
|---|---|
| `/etc` | system configuration |
| `/var` | logs, cache, spool, and changing service data |
| `/home` | user home directories |
| `/opt` | optional or third-party software |
| `/tmp` | temporary files |
| `/proc`, `/sys` | kernel and hardware views |
| `/dev` | device nodes |

## Navigation and File Handling

```bash
pwd
ls -la
cd /path/to/dir
cd -

mkdir -p /opt/example/app
touch notes.txt
cp -r source/ dest/
mv oldname newname
rm file.txt
rm -rf olddir/
```

## Searching

```bash
find /var/log -name "*.log"
find /opt -type f -mtime -7
grep -RIn "pattern" /etc
which python3
whereis nginx
```

## Permissions and Ownership

```bash
chmod 755 script.sh
chmod 644 config.yml
chmod 600 id_ed25519
chown root:root /etc/myapp/config.yml
chown -R appuser:appgroup /opt/myapp
```

Common modes:

| Mode | Meaning |
|---|---|
| `755` | owner full, group/other read+execute |
| `644` | owner read+write, group/other read |
| `600` | owner read+write only |

## Text Processing

```bash
sort file.txt
sort -u file.txt
wc -l file.txt
cut -d',' -f1,3 data.csv
sed 's/old/new/g' file.txt
awk '{print $1, $3}' file.txt
```

## Pipes and Redirection

```bash
command > output.txt
command >> output.txt
command 2> errors.txt
command 2>&1 | tee run.log
ls -la | grep ".log" | wc -l
```

## Process Basics

```bash
ps aux
ps auxf
top
jobs
kill 12345
kill -9 12345
nohup command &
```

## Practical Advice

- learn to combine `find`, `grep`, `awk`, and `sed`
- test destructive commands on a narrow path before going recursive
- use `tee` when you want visible output and a saved log
- prefer understanding the current state before restarting services blindly
