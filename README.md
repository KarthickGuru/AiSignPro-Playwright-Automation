# AiSign Pro – Playwright Automation

## Project Description

This project automates the customer creation and agreement assignment process in the AiSign Pro application using Playwright with TypeScript.

## Technologies Used

- Playwright with TypeScript
- Page Object Model (POM)
- JSON for test data
- Playwright HTML Report

## Automated Test Scenarios

1. Login using phone number and OTP.
2. Navigate to the Customers section.
3. Create a new customer using test data.
4. Assign an agreement to the customer.
5. Select a document and add a Signature field.
6. Send the agreement email.
7. Verify the success message.
8. Logout from the application.

## How to Run the Tests

**Install dependencies:**
```bash
npm install
```

**Run the automation:**
```bash
npx playwright test --headed --workers=1
```

**View the HTML report:**
```bash
npx playwright show-report
```

## Note

CAPTCHA verification is completed manually during login. The remaining workflow is automated using Playwright.
