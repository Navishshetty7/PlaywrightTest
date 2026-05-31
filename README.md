# Playwright Test Automation Framework (ParaBank)

A modern, production-ready End-to-End (E2E) and component UI automation framework built from scratch using **Playwright** and **TypeScript**. This project serves as a technical portfolio piece demonstrating clean code architecture, robust locator strategies, and professional data-driven testing practices.

## 🎯 Project Objectives
The framework is designed to automate complex, real-world user journeys on the **ParaBank** banking simulation application. It prioritizes maintainability, eliminates test flakiness, and avoids common automation anti-patterns like hardcoded data or fragile element selectors.

---

## 🏗️ Architecture & Framework Highlights

This framework utilizes the **Page Object Model (POM)** design pattern to cleanly isolate web page structural elements from the core test execution logic.

* **Page Object Model (POM):** Every webpage component is mapped to a dedicated TypeScript service class, encapsulating locators and page interactions into reusable, business-oriented actions.
* **Decoupled Test Data (JSON):** Zero hardcoded input strings inside test blocks. Static registration details are loaded securely from external structured JSON configuration bundles.
* **Dynamic Data Scoping (Flake Reduction):** Incorporates real-time, sliced timestamp generation logic appended to text inputs. This guarantees 100% data uniqueness across subsequent local or pipeline test cycles, entirely preventing "username already exists" database constraints.
* **Semantic & Accessibility Locators:** Prioritizes resilient Playwright locator mechanics like `getByRole` and element scoping (`locator().locator()`), matching patterns exactly how an end-user or screen-reader experiences the DOM.

---

## 📁 Repository Structure

```text
├── page-objects/             # POM classes separating page elements and actions
│   ├── LoginPage.ts          # Encapsulates login authentication mechanisms
│   └── RegisterPage.ts       # Handles multi-field data entry and validation errors
├── test-data/                # Disconnected testing data configurations
│   └── user-register-data.json # Shared static user profiles
├── tests/                    # Fully isolated functional test suites
│   ├── register.page.spec.ts # Multi-scenario validation (Happy paths + Negative paths)
│   └── login.page.spec.ts    #  Multi-scenario for login
├── playwright.config.ts      # Core configuration engine (timeouts, viewports, browsers)
└── package.json              # Managed Node dependencies and runtime scripts
```

---

## 🧪 Test Scenarios Covered
1. User Registration Flow (Happy Path)
Objective: Verifies successful creation of a new banking account profile.

Mechanics: Imports a valid user payload from external JSON configuration, mutates the user profile string with a unique millisecond suffix to ensure runtime database validity, submits the form, and asserts visibility of personalized screen elements via accessibility header role locators.

2. Form Boundary Validation (Negative Path)
Objective: Ensures form validation boundaries gracefully handle submission omissions.

Mechanics: Submits a blank registration form to intentionally trigger application failure modes. Dynamically loops and matches runtime regular expressions against custom context messages (e.g., matching partial patterns of /is required/ against specific fields) ensuring error notifications trigger predictably.

---

## 🛠️ Local Installation & Setup
To clone this repository locally and examine execution diagnostics, ensure you have Node.js installed on your workstation.

Clone the repository:

```bash
git clone [https://github.com/Navishshetty7/PlaywrightTest.git](https://github.com/Navishshetty7/PlaywrightTest.git)
```
```bash
cd PlaywrightTest
```

---

## 🛠️ Install project dependencies:
```bash
  npm install
```

Install embedded Playwright browser engines:
```bash
  npx playwright install
```

---

## 🚀 Test Execution Guide
Playwright offers a highly flexible command-line interface. Use the following commands based on your targeted execution needs:

1. Run All Tests (Headless Mode)
Executes all test files across all default browsers configured in playwright.config.ts.
```bash
  npx playwright test
```

2. Run a Specific Test File
Isolate execution to a single suite file to save time during localized debugging.
```bash
  npx playwright test tests/register.spec.ts
```

3. Run on a Specific Browser Engine
Target execution exclusively against Chromium, Firefox, or WebKit (Safari).
```bash
  npx playwright test --project=chromium
```
```bash
  npx playwright test --project=firefox
```

4. Interactive UI Mode (Highly Recommended)
Launches the full interactive Playwright dashboard interface, providing detailed element inspection, real-time snapshot time-traveling, and execution logs.
```bash
  npx playwright test --ui
```

5. Debug Mode (Headed with Step-by-Step Execution)
Launches the browser in headed mode alongside the Playwright Inspector, allowing you to pause execution and step through lines of test code one by one.
```bash
  npx playwright test --debug
```

---

## 📊 Reporting & Execution Diagnostics
After headless execution runs complete, Playwright automatically compiles an inline self-contained dashboard showing detailed execution metrics.

# Method A: Allure Report Dashboard (Executive Layout)
Allure compiles beautiful, interactive graphs, pie charts, and behavioral categories out of the raw metadata.
To compile and launch the dashboard locally on your workstation, use the appropriate command based on your setup:

If Allure CLI is installed globally (Mac Homebrew/Windows Scoop):
```bash
allure serve allure-results
```
Using the project's local dependency runner:

```bash
npx allure-commandline serve allure-results
```
> To exit the live reporting network socket server, press Ctrl + C in your terminal

# Method B: Standard Playwright HTML Report
A lightweight, self-contained HTML breakdown showing step-by-step execution hooks and code tracing paths.

```bash
npx playwright show-report
```

Open the latest HTML execution report:
```bash
npx playwright show-report
```

## 🔄 Continuous Integration & Continuous Deployment (CI/CD)

This framework features an integrated automated pipeline utilizing **GitHub Actions** to implement robust Continuous Integration practices.

### Core CI/CD Pipeline Workflow

```text
  [ Code Push ] ──> [ Ubuntu Runner ] ──> [ Dependency Setup ] ──> [ Headless E2E Run ] ──> [ Isolate Dual Artifacts ]
                                                                                                 ├── playwright-html-report
                                                                                                 └── allure-results-data
```
Every code modification pushed to the main branch or targeted via a Pull Request automatically triggers an isolated pipeline execution runner. The cloud pipeline performs the following automated phases:

* Continuous Integration (CI): A clean Ubuntu Linux container initializes, provisions the specified Node.js runtime environment, and performs a strict npm ci build to install matched framework dependencies.

* Automated Testing Gate: The pipeline provisions headless browser binaries (Chromium and Firefox) and runs the complete Playwright E2E suite in the cloud. This ensures new code changes never introduce regressions or break existing critical workflows like User Registration or Authentication.

* Dual-Artifact Management: To support multiple diagnostic strategies, the pipeline handles boundary triggers to securely isolate, zip, and archive two distinct reporting streams directly to the GitHub Actions dashboard:

   - playwright-html-report: A fully compiled, self-contained interactive webpage capturing detailed execution timelines, step-by-step hooks, and code tracing blocks.

   - allure-results-data: The raw, high-fidelity JSON metadata stream. This allows engineers to pull cloud run logs locally and compile them instantly into the rich Allure executive dashboard using allure serve. tests
