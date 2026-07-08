---
title: NetBox Device Import Skeleton
description: Python example for creating devices in NetBox from structured inventory data.
language: Python
tags: [netbox, python, automation, inventory]
---

## Description

Starter pattern for importing device data into NetBox from a structured source such as CSV, YAML, or parsed network inventory output.

## Example

```python
import pynetbox

NETBOX_URL = "https://netbox.example.local"
NETBOX_TOKEN = "replace-with-token"

nb = pynetbox.api(NETBOX_URL, token=NETBOX_TOKEN)

device_data = {
    "name": "acc-core-01",
    "device_type": 1,
    "role": 2,
    "site": 1,
    "status": "active",
}

device = nb.dcim.devices.create(device_data)
print(f"Created device {device.name} with id {device.id}")
```

## Notes

- Resolve `device_type`, `role`, and `site` IDs ahead of time.
- Prefer idempotent logic when turning this into a real importer.
