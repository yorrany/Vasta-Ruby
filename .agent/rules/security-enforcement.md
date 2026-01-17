# Vasta Security Enforcement Rule

All code changes MUST respect the Vasta Absolute Security Manifesto:

1. ** प्रिंसिपल Zero**: Security > Functionality.
2. **Secrets**: Use `grep_search` to verify NO hardcoded secrets are being introduced.
3. **Environment**: Ensure new variables are classified in `security/allowed-envs.yml`.
4. **Backend/Frontend**: No sensitive logic or secrets in `web/` directory.

Before finalizing any task, verify against `SECURITY.md`.
