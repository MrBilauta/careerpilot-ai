# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Reporting a Vulnerability

If you discover a security vulnerability in CareerPilot AI, please report it responsibly.

**DO NOT** create a public GitHub issue for security vulnerabilities.

### How to Report

1. **Email**: Send details to **security@careerpilot.ai**
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

| Action | Timeline |
|--------|----------|
| Acknowledgment | Within 48 hours |
| Initial Assessment | Within 1 week |
| Fix & Disclosure | Within 30 days |

### What to Expect

- We will acknowledge your report within 48 hours
- We will provide a detailed response within 1 week
- We will keep you informed about the progress
- We will credit you in the security advisory (unless you prefer anonymity)

## Security Best Practices

When contributing to CareerPilot AI:

- Never commit API keys, secrets, or credentials
- Use environment variables for all sensitive configuration
- Validate and sanitize all user input
- Use parameterized queries for database operations
- Keep dependencies up to date
- Follow the principle of least privilege

## Scope

The following are in scope:
- Authentication/authorization bypasses
- Data exposure vulnerabilities
- SQL injection
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Remote code execution
- API security issues

Thank you for helping keep CareerPilot AI secure! 🔒
