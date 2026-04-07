# Security policy

## Reporting a vulnerability

**Please do not** open a public GitHub Issue, Discussion, or pull request to disclose security vulnerabilities. Public disclosure can put users at risk before a fix is available.

**Preferred channel**

1. **GitHub private vulnerability reporting** — Open the **[Security tab for this repository](https://github.com/tengbot/nene/security)** and use **Report a vulnerability** when private reporting is available for your account.

Please include:

- A clear description of the issue and its potential impact  
- Affected component (e.g. desktop app, controller API, docs site) and version or commit SHA if known  
- Steps to reproduce, or a minimal proof of concept if you can share one safely  
- Whether the issue has been observed in the wild or only in a test environment  

You may encrypt your message with PGP if we publish a key later; until then, avoid pasting long-lived secrets into email—describe handling and redact samples.

We aim to acknowledge receipt within a few business days and work with you on a coordinated disclosure timeline after we understand and can patch the issue.

## Supported versions

Security fixes are applied to the **latest stable release** and typically to the **`main` branch** ahead of the next release. Very old releases may not receive backports—ask when you report if you need a specific line.

## Scope (in brief)

**Generally in scope**

- This repository’s code: desktop client, controller, web UI, and related tooling shipped as part of `nene`  
- Security of how `nene` handles credentials, sessions, IPC, and channel integrations **as implemented in this codebase**  

**Generally out of scope**

- Vulnerabilities in third-party services or apps (e.g. IM clients, model providers) unless `nene` clearly increases exposure (e.g. leaking secrets that should stay local)  
- Physical access to an unlocked device, or social engineering of users  
- Denial-of-service that only exhausts a single user’s local resources without privilege escalation  

When in doubt, report anyway—we can triage quickly.

## Safe harbor

We support **good-faith** security research that follows this policy and does not degrade user safety or service availability (e.g. no mass scraping of user data, no destructive testing on others’ systems without permission).

## Implementation & architecture notes

For engineers and auditors: cryptographic design, token models, and related implementation notes are documented in **[`specs/SECURITY.md`](specs/SECURITY.md)**. That file is **not** the channel for submitting new vulnerability reports.
