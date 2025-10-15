# 🎭 Playwright TypeScript Framework - Optimized

A comprehensive, production-ready Playwright TypeScript testing framework with advanced features, best practices, and optimization techniques.

## 🚀 Features

- ✅ **Enhanced Page Object Model** with robust error handling
- ✅ **Environment-based Configuration** (dev/staging/prod)
- ✅ **Comprehensive Test Data Management** with TypeScript interfaces
- ✅ **Advanced Test Fixtures** with pre-authentication
- ✅ **Multi-browser & Mobile Testing** support
- ✅ **API Testing Integration** with dedicated helpers
- ✅ **Enhanced Reporting** (HTML, JUnit)
- ✅ **Data-driven Testing** with CSV, Excel, JSON support
- ✅ **Parallel Execution** with optimized worker configuration
- ✅ **TypeScript Path Mapping** for clean imports

## 📁 Project Structure

```
├── src/
│   ├── config/           # Environment configuration
│   ├── data/            # Test data and interfaces
│   ├── fixtures/        # Enhanced test fixtures
│   ├── pages/           # Page Object Model classes
│   └── utils/           # Utility functions and helpers
├── tests/
│   ├── api/             # API test suites
│   ├── data/            # Test data files (CSV, JSON)
│   └── *.spec.ts        # Test files
├── playwright.config.ts # Enhanced configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Install Playwright browsers:**
```bash
npm run install:browsers
```

3. **Set up environment (optional):**
```bash
cp env.example .env
# Edit .env with your configuration
```

### Running Tests

#### Basic Test Execution
```bash
# Run all tests
npm test

# Run in headed mode (see browser)
npm run test:headed

# Run with UI mode
npm run test:ui

# Debug mode
npm run test:debug
```

#### Browser-Specific Testing
```bash
# Run on specific browsers
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Mobile testing
npm run test:mobile
```

#### Test Categories
```bash
# Smoke tests only
npm run test:smoke

# Regression tests
npm run test:regression

# API tests only
npm run test:api
```

#### Advanced Options
```bash
# Run with tracing
npm run test:trace

# Run specific test file
npx playwright test tests/auth.spec.ts

# Run tests matching pattern
npx playwright test --grep "login"
```

## 📊 Reporting

### HTML Report
```bash
npm run test:report
```

### Azure DevOps Integration
See `AZURE_SETUP.md` for detailed Azure DevOps pipeline setup instructions.

### JUnit Report
Available at `test-results/junit.xml`

## 🔧 Configuration

### Environment Configuration
The framework supports multiple environments through `src/config/environment.ts`:

```typescript
// Available environments: dev, staging, prod
ENVIRONMENT=dev
BASE_URL=https://www.saucedemo.com
HEADLESS=true
```

### Playwright Configuration
Enhanced configuration in `playwright.config.ts` includes:
- Multi-browser support (Chrome, Firefox, Safari)
- Mobile device testing
- Parallel execution
- Enhanced reporting
- Environment-based settings

## 📝 Writing Tests

### Using Enhanced Fixtures
```typescript
import { test, expect } from '../src/fixtures/testFixtures';

test('example test', async ({ loginPage, productsPage }) => {
  await loginPage.goto('/');
  await loginPage.loginWithUser(testUsers.standard);
  // Test continues...
});
```

### Using Pre-authenticated Pages
```typescript
test('authenticated test', async ({ authenticatedPage, productsPage }) => {
  // Page is already logged in
  await productsPage.addToCart('Sauce Labs Backpack');
});
```

### Data-driven Testing
```typescript
import { testUsers } from '../src/data/testData';

const testCases = [
  { user: testUsers.standard, shouldSucceed: true },
  { user: testUsers.locked, shouldSucceed: false }
];

for (const testCase of testCases) {
  test(`login with ${testCase.user.username}`, async ({ loginPage }) => {
    // Test implementation
  });
}
```

## 🏗️ Page Object Model

### Enhanced Base Page
```typescript
export class BasePage {
  // Common methods with error handling
  async waitForElement(selector: string, timeout = 10000)
  async isElementVisible(selector: string): Promise<boolean>
  async takeScreenshot(name: string)
  async verifyUrl(urlPattern: string | RegExp)
}
```

### Page-Specific Classes
```typescript
export class LoginPage extends BasePage {
  async loginWithUser(user: User)
  async verifyLoginPageLoaded()
  async verifyErrorMessage(expectedMessage: string)
  async verifySuccessfulLogin()
}
```

## 🔌 API Testing

### Using API Helper
```typescript
import { ApiHelper } from '../src/utils/api';

test('API test', async ({ request }) => {
  const apiHelper = new ApiHelper(request);
  const response = await apiHelper.login('user', 'pass');
  await apiHelper.verifyResponseStatus(response, 200);
});
```

## 📊 Test Data Management

### Structured Test Data
```typescript
export const testUsers = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    firstName: 'John',
    lastName: 'Doe'
  }
} as const;
```

### Data Reading Utilities
- CSV: `readCsvSync(filePath)`
- Excel: `readExcelSheet(filePath, sheetName)`
- JSON: `readJsonSync<T>(filePath)`

## 🏷️ Test Tagging

Use tags to categorize tests:
```typescript
test('critical login flow @smoke', async ({ page }) => {
  // Smoke test
});

test('comprehensive checkout @regression', async ({ page }) => {
  // Regression test
});
```

## 🚀 Performance Optimizations

### Parallel Execution
- Tests run in parallel by default
- Configurable worker count
- Browser-specific parallelization

### Smart Waiting
- Network idle waiting
- Element visibility checks
- Custom timeout configurations

### Resource Management
- Automatic cleanup
- Screenshot on failure only
- Video recording on failure only

## 🛡️ Best Practices

### Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Implement proper setup/teardown

### Error Handling
- Comprehensive error messages
- Automatic screenshots on failure
- Retry mechanisms for flaky tests

### Maintainability
- TypeScript for type safety
- Consistent naming conventions
- Modular page objects

## 🔍 Debugging

### Debug Mode
```bash
npm run test:debug
```

### Trace Viewer
```bash
npm run test:trace
npx playwright show-trace test-results/trace.zip
```

### Screenshots & Videos
- Automatically captured on failure
- Stored in `test-results/`

## 📈 CI/CD Integration

### Azure DevOps Pipeline
```yaml
# Use azure-pipelines.yml for main pipeline
# Use azure-pipelines-pr.yml for PR validation
```

### Environment Variables
```bash
CI=true
HEADLESS=true
WORKERS=1
ENVIRONMENT=ci
```

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add tests for new features
3. Update documentation
4. Use conventional commit messages

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Azure DevOps Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/)

## 📄 License

This project is of Newvision Software.