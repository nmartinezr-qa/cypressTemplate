# Inpulsify – Cypress Automation Framework

**Inpulsify** is a scalable and modular Cypress-based test automation framework designed for web application testing. It supports local and cloud execution, CI/CD integration with GitHub Actions, and follows best practices for test architecture and team collaboration.

---

## 🚀 Project Info

- **Authors**: Pablo Meza, Norvin Martinez
- **Repository**: [Inpulsify GitHub](https://github.com/BersekersTeam/Inpulsify)
- **Issues**: [Submit bugs or requests](https://github.com/BersekersTeam/Inpulsify/issues)
- **Homepage**: [Readme Home](https://github.com/BersekersTeam/Inpulsify#readme)

---

## 🧰 Tech Stack

- [Cypress v14+](https://www.cypress.io/)
- [Cypress Cloud](https://docs.cypress.io/guides/cloud)
- [Mochawesome Reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)
- [GitHub Actions](https://docs.github.com/en/actions)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js ≥ 14
- npm ≥ 6
- Git CLI
- Cypress Cloud account (optional)

### Installation

```bash
git clone https://github.com/BersekersTeam/Inpulsify.git
cd Inpulsify
npm install
```

---

## 🧪 Test Execution

**Open Cypress Test Runner**

```bash
npm run cy:open
```

**Run Tests via CLI**

```bash
npm run cy:run
```

**Run on Cypress Cloud**

```bash
npx cypress run --record --key <YOUR_CYPRESS_RECORD_KEY>
```

**Run Tests in Parallel**

```bash
npx cypress run --record --key <key> --parallel --ci-build-id "<type an id>"
```

---

## 📄 Reports and Logs

- **Test Reports (Mochawesome)**: `cypress/reports`
- **Test Logs (Winston)**: `cypress/logs`

Reports and logs are automatically generated on test runs and archived by CI/CD.

---

## 🌍 Environment Configuration

Environment variables are managed using `dotenv` via `.env` or Cypress' built-in support. These `.env` files are added to `.gitignore` to prevent uploading to the repo.  
To execute tests with env variables in CI/CD, secrets and variables are configured in the GitHub Actions settings.

---

## 🧱 Project Structure & Modularity

This framework uses the **Page Object Model (POM)** pattern.

```
cypress/
├── config/               # Optional env configs
├── e2e/                  # Test specs
├── fixtures/             # Static test data
├── logs/                 # Execution logs
├── pages/                # POM classes
├── reports/              # HTML reports
├── support/              # Global hooks and commands
│   ├── commands.js
│   └── e2e.js
.github/
├── workflows/
│   └── cypress.yml       # CI pipeline
.env.test                 # Env vars
```

---

## 🤝 Collaboration Guidelines

### Git Workflow

- Base branch: `develop`
- Create feature branches from `develop`:

```bash
git checkout -b feature/your-feature
```

- Submit a pull request to `develop`
- Link related issues and document work inside the issue thread
- Get at least one approval before merging

---

## 💎 Code Quality Guidelines

- Keep test logic clean and DRY.
- Use `cypress/pages` for all UI abstractions.
- Use one `it()` block per test scenario.
- Avoid `cy.wait()` unless absolutely necessary.
- Use fixtures instead of hardcoded data.
- Keep assertions clear and explicit.
- Make tests independent and idempotent.
- Reuse common logic through POM or custom commands.
- Document your changes through GitHub issues when possible.

---

## 🧼 Code Quality & Naming Standards

To ensure maintainability and consistency:

### 🧱 Naming Conventions

| Item            | Convention | Example                      |
| --------------- | ---------- | ---------------------------- |
| Classes (POM)   | PascalCase | `LoginPage`, `DashboardPage` |
| Methods         | camelCase  | `clickLoginButton()`         |
| Variables       | camelCase  | `username`, `loginData`      |
| Test files      | kebab-case | `user-login.cy.js`           |
| Fixtures        | snake_case | `user_data.json`             |
| Custom commands | camelCase  | `loginWithCredentials()`     |

---

## 💻 Available npm Scripts

| Script    | Description                 |
| --------- | --------------------------- |
| `cy:open` | Opens Cypress GUI runner    |
| `cy:run`  | Runs tests in headless mode |

---

## 🧠 Common Git Commands

### 🔁 Clone

```bash
git clone https://github.com/BersekersTeam/Inpulsify.git
```

### 🌿 Create Feature Branch

```bash
git checkout -b feature/my-new-feature
```

### ✅ Stage and Commit

```bash
git add .
git commit -m "feat: implemented login tests"
```

### ⬆️ Push

```bash
git push origin feature/my-new-feature
```

### 🔃 Pull & Merge

```bash
git checkout develop
git pull origin develop
git merge feature/my-new-feature
```

### ❌ Undo / Reset

```bash
git reset --hard HEAD
git clean -fd
git checkout -- path/to/file.js
```

### ❌ Remove a Tracked File Locally

```bash
git rm --cached path/to/file
```

---

## 📎 Links

- [Inpulsify Repository](https://github.com/BersekersTeam/Inpulsify)
- [Submit Issues](https://github.com/BersekersTeam/Inpulsify/issues)

---

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Best Practices by Cypress](https://docs.cypress.io/guides/references/best-practices)
- [Git Handbook](https://git-scm.com/book/en/v2)
