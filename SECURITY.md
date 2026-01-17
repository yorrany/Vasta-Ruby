# SECURITY MANIFESTO — VASTA

## 1. Zero Principle: Security > Functionality

No feature, hotfix, or refactor is more important than security. If it fails security, it doesn't deploy.

## 2. Secrets Policy (Immutable)

- **NO secrets in code**
- **NO secrets in frontend**
- **NO secrets in logs**
- **NO secrets in Docker layers**
- **NO secrets in PRs, Issues, or comments**

## 3. Environment Variable Classification

| Type                        | Rule                   |
| :-------------------------- | :--------------------- |
| **Public** (`NEXT_PUBLIC_`) | Allowed in frontend    |
| **Sensitive**               | Backend only           |
| **Critical**                | Never log              |
| **Internal**                | Controlled environment |

## 4. Mandatory Checks

- **Auth & Identity**: No auth logic in frontend.
- **Secrets**: Automation scan for all commits.
- **Dependency**: Mandatory scan for CVEs (High/Critical blocks).

## 5. Security as Code

All security rules are versioned in `/security` and audited via CI/CD.

---

_This manifesto is enforced by the Vasta Security Bot and Absolute Security Policy._
