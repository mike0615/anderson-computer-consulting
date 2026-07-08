---
title: Certificate Operations with OpenSSL and IPA
description: Common certificate inspection, CSR generation, self-signed testing, and IPA-integrated certificate management patterns.
category: Security
tags: [openssl, certificates, tls, pki, freeipa]
updated: 2026-04-19
---

## Overview

Certificate work becomes much easier when you separate four common tasks: inspect, request, sign, and monitor.

## Inspect Certificates

```bash
openssl x509 -in cert.pem -noout -text
openssl x509 -in cert.pem -noout -subject -issuer -dates
openssl x509 -in cert.pem -noout -ext subjectAltName
openssl s_client -connect example.com:443 </dev/null 2>/dev/null | openssl x509 -noout -dates
```

## Generate a Key and CSR

```bash
openssl ecparam -name prime256v1 -genkey -noout -out server.key
openssl req -new \
  -key server.key \
  -out server.csr \
  -subj "/CN=web01.example.lab/O=Example/C=US"
```

## SAN Example

```ini
[req]
distinguished_name = req_distinguished_name
req_extensions = req_ext
prompt = no

[req_distinguished_name]
CN = web01.example.lab

[req_ext]
subjectAltName = @alt_names

[alt_names]
DNS.1 = web01.example.lab
DNS.2 = www.example.lab
IP.1 = 192.168.10.21
```

## Self-Signed for Testing

```bash
openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.crt \
  -days 30 -nodes -subj "/CN=localhost"
```

## IPA and certmonger Pattern

```bash
ipa-getcert request \
  -k /etc/ssl/private/web01.key \
  -f /etc/ssl/certs/web01.crt \
  -N 'CN=web01.example.lab,O=EXAMPLE.LAB' \
  -K HTTP/web01.example.lab \
  -D web01.example.lab

ipa-getcert list
ipa-getcert resubmit -f /etc/ssl/certs/web01.crt
```

## Practical Guidance

- use self-signed certificates only for testing and bootstrap cases
- document SAN requirements before generating CSRs
- monitor expiry centrally rather than waiting for outages
- if FreeIPA is the authority, keep the renewal path standardized
