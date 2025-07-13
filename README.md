# Functional Test Framework 

## Overview

This repository demonstrates a **hybrid test automation approach** using [Playwright](https://playwright.dev/) for both **FrontEnd (UI)** and **BackEnd (API)** testing. The project is structured to allow easy extension for both types of tests, with a focus on modularity and maintainability.

- **FrontEnd Tests:** Automated browser-based tests using Playwright, leveraging the Page Object Model (POM) for maintainability.
- **BackEnd Tests:** API-level tests using Playwright's API testing capabilities. Backend tests are now implemented in `tests/backend.spec.ts`.

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

Backend/API tests are implemented in `tests/backend.spec.ts` using Playwright's [APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext). Example:

```ts
import { test, expect, request } from '@playwright/test';
import { User } from '../src/dataModels/user';

test('Verify GET Request on /api/users Response @backend', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users?page=2');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(Array.isArray(body.data)).toBe(true);
  for (const user of body.data as User[]) {
    expect(typeof user.id).toBe('number');
    expect(typeof user.email).toBe('string');
  }
});
```

---

## Project Structure

```
SA-QA-Ankur/
├── src/
│   ├── fixtures/           # Custom Playwright fixtures (browser, page, helpers)
│   ├── pageObjects/        # Page Object Model classes for UI screens
│   └── dataModels/         # TypeScript interfaces for API data models
├── tests/
│   ├── frontend.spec.ts    # Frontend (UI) tests
│   └── backend.spec.ts     # Backend (API) tests
├── playwright.config.ts    # Playwright configuration
├── package.json            # Project metadata and dependencies
├── .gitignore
```

### Key Files
- `src/fixtures/base.ts`: Custom Playwright fixtures (browser, page, navigation helper, screenshot on failure)
- `src/pageObjects/`: Page Object Model classes for Login, Inventory, and Checkout screens
- `src/dataModels/`: TypeScript interfaces for API data models (e.g., `user.ts` for user objects)
- `tests/frontend.spec.ts`: Example UI tests (login, add to cart, checkout)
- `tests/backend.spec.ts`: Example API/backend tests (GET/POST, data validation)

---

## Hybrid Test Approach

- **FrontEnd:**
  - Uses Playwright's browser automation and POM for robust UI testing.
  - Fixtures provide browser/page management and navigation helpers.
  - Screenshots are captured after each test for debugging.
- **BackEnd:**
  - Uses Playwright's API testing features for direct HTTP requests and assertions.
  - Backend tests are implemented and validate API responses and data models.
  - Extend `backend.spec.ts` with additional API tests as needed.

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