# Azure DevOps Pipeline Setup Guide

This guide will help you set up Azure DevOps pipelines for your Playwright TypeScript framework.

## 🚀 Quick Setup

### 1. **Create Pipeline in Azure DevOps**

1. Go to your Azure DevOps project
2. Navigate to **Pipelines** → **Pipelines**
3. Click **New pipeline**
4. Select **Azure Repos Git** (or your repository type)
5. Choose your repository
6. Select **Existing Azure Pipelines YAML file**
7. Choose `azure-pipelines.yml` from the root directory

### 2. **Pipeline Configuration**

The framework includes two pipeline files:

- **`azure-pipelines.yml`** - Main pipeline for branches (main, develop)
- **`azure-pipelines-pr.yml`** - PR validation pipeline

### 3. **Environment Variables (Optional)**

In Azure DevOps, you can set these variables in **Pipelines** → **Library** → **Variable groups**:

```
CI=true
HEADLESS=true
WORKERS=1
ENVIRONMENT=ci
```

## 📋 Pipeline Features

### **Main Pipeline (`azure-pipelines.yml`)**

✅ **Triggers**: Main and develop branches  
✅ **TypeScript Type Checking**  
✅ **ESLint Code Quality**  
✅ **Full Test Suite Execution**  
✅ **JUnit Test Results Publishing**  
✅ **HTML Report Artifacts**  
✅ **Smoke Tests on Main Branch**  

### **PR Pipeline (`azure-pipelines-pr.yml`)**

✅ **PR Validation Only**  
✅ **Code Quality Checks**  
✅ **Smoke Tests**  
✅ **Fast Feedback**  

## 🔧 Pipeline Jobs

### **PlaywrightTests Job**
- Installs Node.js 18.x
- Installs dependencies with `npm ci`
- Installs Playwright browsers with system dependencies
- Runs TypeScript type checking
- Runs ESLint (non-blocking)
- Executes full test suite
- Publishes JUnit test results
- Publishes HTML report and test artifacts

### **SmokeTests Job** (Main branch only)
- Runs only smoke tests (`@smoke` tagged tests)
- Provides quick feedback for critical functionality

## 📊 Reports and Artifacts

### **Test Results**
- **JUnit XML**: Published to Azure DevOps Test Results
- **HTML Report**: Available as downloadable artifact
- **Screenshots/Videos**: Available in test-results artifact

### **Accessing Reports**
1. Go to your pipeline run
2. Click on **Tests** tab for JUnit results
3. Download **playwright-report** artifact for HTML report
4. Download **test-results** artifact for screenshots/videos

## 🎯 Test Execution Strategy

### **Local Development**
```bash
# Run all tests
npm test

# Run smoke tests
npm run test:smoke

# Run with UI
npm run test:ui
```

### **Azure DevOps**
- **Full Suite**: Runs on main/develop branches
- **Smoke Tests**: Runs on main branch and PRs
- **Workers**: Limited to 1 for Azure DevOps agents
- **Retries**: 2 retries for flaky tests
- **Timeout**: 60 seconds for CI environment

## 🏷️ Test Tagging

Use these tags to control test execution:

```typescript
// Critical tests that run in PR validation
test('login functionality @smoke', async ({ page }) => {
  // Test implementation
});

// Comprehensive tests for full pipeline
test('complete checkout flow @regression', async ({ page }) => {
  // Test implementation
});
```

## 🔍 Troubleshooting

### **Common Issues**

1. **Browser Installation Fails**
   - Ensure `npx playwright install --with-deps` runs successfully
   - Check if system dependencies are available

2. **Tests Timeout**
   - Increase timeout in `playwright.config.ts`
   - Check network connectivity to test application

3. **Memory Issues**
   - Reduce workers to 1 (already configured)
   - Consider running tests in smaller batches

### **Debug Mode**

To debug pipeline issues:

1. Enable **Debug logging** in pipeline variables
2. Add `--debug` flag to test commands
3. Check pipeline logs for detailed error messages

## 📈 Performance Optimization

### **Azure DevOps Optimizations**
- **Workers**: Set to 1 for Azure DevOps agents
- **Retries**: 2 retries for flaky tests
- **Parallel**: Enabled for faster execution
- **Artifacts**: Only published on failure for efficiency

### **Test Organization**
- **Smoke Tests**: Critical functionality only
- **Regression Tests**: Comprehensive coverage
- **API Tests**: Separate job for API testing

## 🔄 Continuous Integration Best Practices

1. **Fast Feedback**: Smoke tests run on every PR
2. **Comprehensive Coverage**: Full suite on main branches
3. **Artifact Management**: Reports available for download
4. **Error Handling**: Proper retry mechanisms
5. **Resource Optimization**: Efficient use of Azure DevOps agents

## 📞 Support

For issues with the pipeline setup:

1. Check Azure DevOps pipeline logs
2. Verify Node.js and Playwright installation
3. Ensure test application is accessible
4. Review environment variables configuration

## 🎉 Success Criteria

Your pipeline is working correctly when:

✅ Tests run successfully on PRs  
✅ Full test suite passes on main branch  
✅ Test results are published to Azure DevOps  
✅ HTML reports are available as artifacts  
✅ Smoke tests provide fast feedback  
