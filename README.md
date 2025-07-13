# Functional Test Framework 

## Overview

This repository demonstrates a **hybrid test automation approach** using [Playwright](https://playwright.dev/) for both **FrontEnd (UI)** and **BackEnd (API)** testing. The project is structured to allow easy extension for both types of tests, with a focus on modularity and maintainability.

- **FrontEnd Tests:** Automated browser-based tests using Playwright, leveraging the Page Object Model (POM) for maintainability.
- **BackEnd Tests:** (Planned) API-level tests using Playwright's API testing capabilities. The structure is ready for backend tests, but no backend tests are implemented yet.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd SA-QA-Ankur
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Install Playwright browsers:**
   ```bash
   npx playwright install --with-deps
   ```

---

## Running Tests

### FrontEnd (UI) Tests

Run all frontend (UI) tests:
```bash
npx playwright test tests/frontend.spec.ts
```

### BackEnd (API) Tests

The structure for backend/API tests is present in `tests/backend.spec.ts`, but no backend tests are implemented yet. You can add your API tests in this file using Playwright's [APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext).

Example (to be added in `backend.spec.ts`):
```ts
import { test, expect, request } from '@playwright/test';

test('example API test', async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.get('https://api.example.com/endpoint');
  expect(response.ok()).toBeTruthy();
});
```

---

## Project Structure

```
SA-QA-Ankur/
├── src/
│   ├── fixtures/           # Custom Playwright fixtures (browser, page, helpers)
│   └── pageObjects/        # Page Object Model classes for UI screens
├── tests/
│   ├── frontend.spec.ts    # Frontend (UI) tests
│   └── backend.spec.ts     # Backend (API) tests (scaffolded)
├── playwright.config.ts    # Playwright configuration
├── package.json            # Project metadata and dependencies
├── .gitignore
```

### Key Files
- `src/fixtures/base.ts`: Custom Playwright fixtures (browser, page, navigation helper, screenshot on failure)
- `src/pageObjects/`: Page Object Model classes for Login, Inventory, and Checkout screens
- `tests/frontend.spec.ts`: Example UI tests (login, add to cart, checkout)
- `tests/backend.spec.ts`: Placeholder for API/backend tests

---

## Hybrid Test Approach

- **FrontEnd:**
  - Uses Playwright's browser automation and POM for robust UI testing.
  - Fixtures provide browser/page management and navigation helpers.
  - Screenshots are captured after each test for debugging.
- **BackEnd:**
  - (Planned) Will use Playwright's API testing features for direct HTTP requests and assertions.
  - Extend `backend.spec.ts` with API tests as needed.

This hybrid approach allows you to:
- Validate end-to-end user flows (UI)
- Test backend APIs directly (API)
- Share setup/teardown logic and reporting

---

## Viewing Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```
- Reports are generated in the `playwright-report/` directory.
- Screenshots and artifacts are saved in `test-results/`.

---

## Contribution & Notes

- PRs and issues are welcome!
- Backend/API test examples are welcome.
- `.gitignore` ensures node_modules, reports, and results are not committed.

---

## References
- [Playwright Docs](https://playwright.dev/docs/intro)
- [Playwright API Testing](https://playwright.dev/docs/api-testing) 