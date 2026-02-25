# ioBroker Adapter Development with GitHub Copilot

**Version:** 0.5.7
**Template Source:** https://github.com/DrozmotiX/ioBroker-Copilot-Instructions

This file contains instructions and best practices for GitHub Copilot when working on ioBroker adapter development.

---

## 📑 Table of Contents

1. [Project Context](#project-context)
2. [Code Quality & Standards](#code-quality--standards)
   - [Code Style Guidelines](#code-style-guidelines)
   - [ESLint Configuration](#eslint-configuration)
3. [Testing](#testing)
   - [Unit Testing](#unit-testing)
   - [Integration Testing](#integration-testing)
   - [API Testing with Credentials](#api-testing-with-credentials)
4. [Development Best Practices](#development-best-practices)
   - [Dependency Management](#dependency-management)
   - [HTTP Client Libraries](#http-client-libraries)
   - [Error Handling](#error-handling)
5. [Admin UI Configuration](#admin-ui-configuration)
   - [JSON-Config Setup](#json-config-setup)
   - [Translation Management](#translation-management)
6. [Documentation](#documentation)
   - [README Updates](#readme-updates)
   - [Changelog Management](#changelog-management)
7. [CI/CD & GitHub Actions](#cicd--github-actions)
   - [Workflow Configuration](#workflow-configuration)
   - [Testing Integration](#testing-integration)
8. [Admin Interface Development](#admin-interface-development)
9. [Configuration](#configuration)
10. [Troubleshooting](#troubleshooting)
11. [Security](#security)

---

## Project Context

You are working on an ioBroker adapter. ioBroker is an integration platform for the Internet of Things, focused on building smart home and industrial IoT solutions. Adapters are plugins that connect ioBroker to external systems, devices, or services.

**This is the alias-manager adapter**, which manages and creates aliases for ioBroker datapoints. Key features include:
- **Alias Creation**: Creates alias datapoints that mirror existing ioBroker objects with optional read/write conversion functions
- **Datapoint Management**: Provides GUI for managing alias relationships, including linking original datapoints to alias datapoints
- **Autocreate Functionality**: Automatically creates multiple aliases from existing device structures with pattern matching
- **Conversion Functions**: Supports JavaScript expressions for read/write value transformations (e.g., `val / 10` for scaling)
- **Sync Management**: Keeps original and alias datapoints synchronized bidirectionally
- **Admin Interface**: Web-based configuration interface for creating and managing aliases

---

## Code Quality & Standards

### Code Style Guidelines

- Follow JavaScript/TypeScript best practices
- Use async/await for asynchronous operations
- Implement proper resource cleanup in `unload()` method
- Use semantic versioning for adapter releases
- Include proper JSDoc comments for public methods
- Comment complex alias logic, especially conversion functions

**Timer and Resource Cleanup Example:**
```javascript
private connectionTimer?: NodeJS.Timeout;

async onReady() {
  this.connectionTimer = setInterval(() => this.checkConnection(), 30000);
}

onUnload(callback) {
  try {
    if (this.connectionTimer) {
      clearInterval(this.connectionTimer);
      this.connectionTimer = undefined;
    }
    callback();
  } catch (e) {
    callback();
  }
}
```

### ESLint Configuration

**CRITICAL:** ESLint validation must run FIRST in your CI/CD pipeline, before any other tests. This "lint-first" approach catches code quality issues early.

#### Setup
```bash
npm install --save-dev eslint @iobroker/eslint-config
```

#### Configuration (.eslintrc.json)
```json
{
  "extends": "@iobroker/eslint-config",
  "rules": {
    // Add project-specific rule overrides here if needed
  }
}
```

#### Package.json Scripts
```json
{
  "scripts": {
    "lint": "eslint --max-warnings 0 .",
    "lint:fix": "eslint . --fix"
  }
}
```

#### Best Practices
1. ✅ Run ESLint before committing — fix ALL warnings, not just errors
2. ✅ Use `lint:fix` for auto-fixable issues
3. ✅ Don't disable rules without documentation
4. ✅ Lint all relevant files (main code, tests, build scripts)
5. ✅ Keep `@iobroker/eslint-config` up to date
6. ✅ **ESLint warnings are treated as errors in CI** (`--max-warnings 0`). The `lint` script above already includes this flag — run `npm run lint` to match CI behavior locally

#### Common Issues
- **Unused variables**: Remove or prefix with underscore (`_variable`)
- **Missing semicolons**: Run `npm run lint:fix`
- **Indentation**: Use 4 spaces (ioBroker standard)
- **console.log**: Replace with `adapter.log.debug()` or remove

---

## Testing

### Unit Testing
- Use Jest as the primary testing framework for ioBroker adapters
- Follow standard Jest patterns for mocking and assertions
- Test both positive and negative scenarios
- Mock external dependencies and ioBroker core functions

### Integration Testing

**IMPORTANT**: Use the official `@iobroker/testing` framework for all integration tests. This is the ONLY correct way to test ioBroker adapters.

**Official Documentation**: https://github.com/ioBroker/testing

#### Framework Structure
Integration tests MUST follow this exact pattern:

```javascript
const path = require('path');
const { tests } = require('@iobroker/testing');

// Define test configuration for alias-manager
const TEST_ALIAS_CONFIG = {
    "alias.0.test_alias": {
        "common": {
            "name": "Test Alias",
            "type": "number",
            "read": true,
            "write": true,
            "role": "value"
        },
        "native": {
            "alias": {
                "id": "system.adapter.admin.0.alive",
                "read": "val",
                "write": "val"
            }
        }
    }
};

// Use tests.integration() with defineAdditionalTests
tests.integration(path.join(__dirname, '..'), {
    defineAdditionalTests({ suite }) {
        suite('Test alias-manager with specific configuration', (getHarness) => {
            let harness;

            before(() => {
                harness = getHarness();
            });

            it('should create and manage aliases correctly', function () {
                return new Promise(async (resolve, reject) => {
                    try {
                        harness = getHarness();
                        
                        // Get adapter object using promisified pattern
                        const obj = await new Promise((res, rej) => {
                            harness.objects.getObject('system.adapter.alias-manager.0', (err, o) => {
                                if (err) return rej(err);
                                res(o);
                            });
                        });
                        
                        if (!obj) {
                            return reject(new Error('Adapter object not found'));
                        }

                        // Configure adapter for alias testing
                        Object.assign(obj.native, {
                            autoCreateMode: true,
                            syncInterval: 1000
                        });

                        await new Promise((res, rej) => {
                            harness.objects.setObject(obj._id, obj, (err) => {
                                if (err) return rej(err);
                                res(undefined);
                            });
                        });

                        // Start adapter
                        await harness.startAdapterAndWait();
                        
                        // Create test alias object
                        await new Promise((res, rej) => {
                            harness.objects.setObject('alias.0.test_alias', TEST_ALIAS_CONFIG['alias.0.test_alias'], (err) => {
                                if (err) return rej(err);
                                res(undefined);
                            });
                        });

                        // Wait for alias processing
                        await new Promise(resolve => setTimeout(resolve, 5000));

                        // Verify alias was created and is functional
                        const aliasState = await new Promise((res, rej) => {
                            harness.states.getState('alias.0.test_alias', (err, state) => {
                                if (err) return rej(err);
                                res(state);
                            });
                        });

                        if (aliasState && aliasState.val !== undefined) {
                            console.log('✅ Alias created and has value:', aliasState.val);
                            resolve(true);
                        } else {
                            reject(new Error('Alias not properly created or has no value'));
                        }

                    } catch (error) {
                        reject(error);
                    }
                });
            }).timeout(30000);
        });
    }
});
```

**Key Testing Scenarios for alias-manager**:
1. **Alias Creation**: Test creating aliases with read/write functions
2. **Value Synchronization**: Verify bidirectional sync between original and alias
3. **Conversion Functions**: Test JavaScript expression evaluation for value transformation
4. **Error Handling**: Test invalid alias configurations and broken references
5. **Autocreate Functionality**: Test bulk alias creation from device patterns

#### Alias-Specific Test Cases
```javascript
describe('Alias Manager Tests', () => {
    test('should create alias with read conversion', async () => {
        const aliasConfig = {
            "alias.0.scaled_value": {
                "common": { "name": "Scaled Value", "type": "number" },
                "native": {
                    "alias": {
                        "id": "test.0.original_value", 
                        "read": "val / 10",
                        "write": "val * 10"
                    }
                }
            }
        };
        // Test implementation
    });
    
    test('should handle invalid alias references', async () => {
        // Test error handling for broken alias links
    });
    
    test('should sync values bidirectionally', async () => {
        // Test that changes to original affect alias and vice versa
    });
});
```

#### Testing Both Success AND Failure Scenarios

**IMPORTANT**: For every "it works" test, implement corresponding "it doesn't work and fails gracefully" tests. This ensures proper error handling and validates that your adapter fails gracefully when expected.

#### Key Integration Testing Rules

1. ✅ Use `@iobroker/testing` framework
2. ✅ Configure via `harness.objects.setObject()`
3. ✅ Start via `harness.startAdapterAndWait()`
4. ✅ Verify states via `harness.states.getState()`
5. ✅ Allow proper timeouts for async operations
6. ❌ NEVER test API URLs directly
7. ❌ NEVER bypass the harness system

#### Workflow Dependencies
Integration tests should run ONLY after lint and adapter tests pass:

```yaml
integration-tests:
  needs: [check-and-lint, adapter-tests]
  runs-on: ubuntu-22.04
```

### API Testing with Credentials
For adapters that connect to external APIs requiring authentication, implement comprehensive credential testing:

#### Password Encryption for Integration Tests

```javascript
async function encryptPassword(harness, password) {
    const systemConfig = await harness.objects.getObjectAsync("system.config");
    if (!systemConfig?.native?.secret) {
        throw new Error("Could not retrieve system secret for password encryption");
    }
    
    const secret = systemConfig.native.secret;
    let result = '';
    for (let i = 0; i < password.length; ++i) {
        result += String.fromCharCode(secret[i % secret.length].charCodeAt(0) ^ password.charCodeAt(i));
    }
    return result;
}
```

#### Demo Credentials Testing Pattern
- Use provider demo credentials when available (e.g., `demo@api-provider.com` / `demo`)
- Create separate test file (e.g., `test/integration-demo.js`) for credential-based tests
- Add npm script: `"test:integration-demo": "mocha test/integration-demo --exit"`
- Implement clear success/failure criteria with recognizable log messages

**Example Implementation:**
```javascript
it("Should connect to API with demo credentials", async () => {
    const encryptedPassword = await encryptPassword(harness, "demo_password");
    
    await harness.changeAdapterConfig("alias-manager", {
        native: {
            username: "demo@provider.com",
            password: encryptedPassword,
        }
    });

    await harness.startAdapter();
    await new Promise(resolve => setTimeout(resolve, 60000));
    
    const connectionState = await harness.states.getStateAsync("alias-manager.0.info.connection");
    
    if (connectionState?.val === true) {
        console.log("✅ SUCCESS: API connection established");
        return true;
    } else {
        throw new Error("API Test Failed: Expected API connection to be established. " +
            "Check logs above for specific API errors (DNS resolution, 401 Unauthorized, network issues, etc.)");
    }
}).timeout(120000);
```

---

## Development Best Practices

### Dependency Management

- Always use `npm` for dependency management
- Use `npm ci` in CI/CD pipelines for consistent installations
- Use `npm install` for development
- Keep dependencies minimal and focused
- Only update dependencies in separate Pull Requests

**When modifying package.json:**
1. Run `npm install` to sync package-lock.json
2. Commit both package.json and package-lock.json together

**Best Practices:**
- Minimize dependencies to reduce security vulnerabilities
- Use well-maintained, popular libraries
- Regular security audits with `npm audit`
- Keep Node.js and npm versions updated

### HTTP Client Libraries

- **Preferred:** Use native `fetch` API (Node.js 20+ required)
- **Avoid:** `axios` unless specific features are required

**Example with fetch:**
```javascript
try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
} catch (error) {
    this.log.error(`Failed to fetch data: ${error.message}`);
}
```

**Other Recommendations:**
- Use `dayjs` instead of `moment` (smaller, modern)
- Use native Node.js modules when possible
- Check bundle size impact before adding dependencies

### Error Handling

- Always catch and log errors appropriately
- Use adapter log levels (error, warn, info, debug)
- Provide meaningful, user-friendly error messages
- Handle network failures gracefully
- Implement retry mechanisms where appropriate
- Always clean up timers, intervals, and resources in `unload()` method

**Adapter Error Patterns:**
```javascript
try {
    // Alias operations
    await this.createAlias(aliasId, originalId, readFunc, writeFunc);
} catch (error) {
    this.log.error(`Failed to create alias ${aliasId}: ${error.message}`);
    this.log.debug(`Stack trace: ${error.stack}`);
}
```

**Example Error Handling:**
```javascript
async onReady() {
  try {
    // Initialize adapter
    await this.initializeAdapter();
  } catch (error) {
    this.log.error(`Failed to initialize: ${error.message}`);
    return;
  }
}
```

#### ioBroker-Specific State Management for alias-manager
```javascript
// Correct way to handle alias state changes
this.on('stateChange', (id, state) => {
    if (state && !state.ack && id.startsWith('alias.')) {
        // Handle alias state change, apply write conversion, update original
        this.processAliasWrite(id, state);
    } else if (state && state.ack && this.isOriginalDatapoint(id)) {
        // Handle original datapoint change, apply read conversion, update alias
        this.processOriginalRead(id, state);
    }
});
```

#### Object Management
```javascript
// Proper alias object creation
async createAlias(aliasId, originalId, readFunction, writeFunction) {
    const obj = {
        _id: aliasId,
        type: 'state',
        common: {
            name: 'Alias for ' + originalId,
            type: 'mixed',
            read: true,
            write: true,
            role: 'value'
        },
        native: {
            alias: {
                id: originalId,
                read: readFunction || 'val',
                write: writeFunction || 'val'
            }
        }
    };
    
    await this.setObjectAsync(aliasId, obj);
}
```

---

## Admin UI Configuration

### JSON-Config Setup

For adapters using JSON-Config admin interfaces, structure your io-package.json schema carefully:

```json
"native": {
    "username": "",
    "password": "",
    "interval": 300000
},
"encryptedNative": ["password"]
```

**Guidelines:**
- ✅ Use consistent naming conventions
- ✅ Provide sensible default values
- ✅ Include validation for required fields
- ✅ Add tooltips for complex options
- ✅ Ensure translations for all supported languages (minimum English and German)
- ✅ Write end-user friendly labels, avoid technical jargon

### Translation Management

**CRITICAL:** Translation files must stay synchronized with `admin/jsonConfig.json`. Orphaned keys or missing translations cause UI issues and PR review delays.

#### Overview
- **Location:** `admin/i18n/{lang}/translations.json` for 11 languages (de, en, es, fr, it, nl, pl, pt, ru, uk, zh-cn)
- **Source of truth:** `admin/jsonConfig.json` - all `label` and `help` properties must have translations
- **Command:** `npm run translate` - auto-generates translations but does NOT remove orphaned keys
- **Formatting:** English uses tabs, other languages use 4 spaces

#### Critical Rules
1. ✅ Keys must match exactly with jsonConfig.json
2. ✅ No orphaned keys in translation files
3. ✅ All translations must be in native language (no English fallbacks)
4. ✅ Keys must be sorted alphabetically

#### Workflow for Translation Updates

**When modifying admin/jsonConfig.json:**

1. Make your changes to labels/help texts
2. Run automatic translation: `npm run translate`
3. Run validation: `node scripts/validate-translations.js`
4. Remove orphaned keys manually from all translation files
5. Add missing translations in native languages
6. Run: `npm run lint && npm run test`

#### Translation Checklist

Before committing changes to admin UI or translations:
1. ✅ Validation script shows "All keys match!" for all 11 languages
2. ✅ No orphaned keys in any translation file
3. ✅ All translations in native language
4. ✅ Keys alphabetically sorted
5. ✅ `npm run lint` passes
6. ✅ `npm run test` passes
7. ✅ Admin UI displays correctly

---

## Documentation

### README Updates

#### Required Sections
When updating README.md files, ensure these sections are present and well-documented:

1. **Installation** - Clear npm/ioBroker admin installation steps
2. **Configuration** - Detailed configuration options with examples
3. **Usage** - Practical examples and use cases for alias creation
4. **Changelog** - Version history and changes (use "## **WORK IN PROGRESS**" section for ongoing changes following AlCalzone release-script standard)
5. **License** - License information (typically MIT for ioBroker adapters)
6. **Support** - Links to issues, discussions, and community support

#### Documentation Standards
- Use clear, concise language
- Include code examples for alias configuration
- Add screenshots for admin interface when applicable (alias-manager has a rich GUI)
- Maintain multilingual support (at minimum English and German)
- When creating PRs, add entries to README under "## **WORK IN PROGRESS**" section following ioBroker release script standard
- Always reference related issues in commits and PR descriptions (e.g., "solves #xx" or "fixes #xx")

#### Mandatory README Updates for PRs
For **every PR or new feature**, always add a user-friendly entry to README.md:

- Add entries under `## **WORK IN PROGRESS**` section before committing
- Use format: `* (author) **TYPE**: Description of user-visible change`
- Types: **NEW** (features), **FIXED** (bugs), **ENHANCED** (improvements), **TESTING** (test additions), **CI/CD** (automation)
- Focus on user impact, not technical details

**Example:**
```markdown
## **WORK IN PROGRESS**

* (DutchmanNL) **FIXED**: Adapter now properly validates login credentials (fixes #25)
* (DutchmanNL) **NEW**: Added device discovery to simplify initial setup
```

### Changelog Management

Follow the [AlCalzone release-script](https://github.com/AlCalzone/release-script) standard.

#### Format Requirements
The release script looks for a specific section header in README.md:

```markdown
## **WORK IN PROGRESS**
* (author) **FEATURE**: New cool feature
* (author) **FIX**: Fixed bug

## v0.1.0 (2023-01-01)
* (author) **FEATURE**: Previous feature
```

#### Workflow Process
- **During Development:** All changes go under `## **WORK IN PROGRESS**`
- **For Every PR:** Add user-facing changes to WORK IN PROGRESS section
- **Before Merge:** Version number and date added when merging to main
- **Release Process:** Release-script automatically converts placeholder to actual version

#### Change Entry Format
- Format: `* (githubUsername) **CATEGORY**: Description`
- Categories: FEATURE, FIX, BREAKING CHANGE, TRANSLATION, DEPENDENCIES
- Keep descriptions user-friendly and concise
- Reference issues when applicable: `fixes #123` or `closes #456`

---

## CI/CD & GitHub Actions

### Workflow Configuration

#### GitHub Actions Best Practices

**Must use ioBroker official testing actions:**
- `ioBroker/testing-action-check@v1` for lint and package validation
- `ioBroker/testing-action-adapter@v1` for adapter tests
- `ioBroker/testing-action-deploy@v1` for automated releases with Trusted Publishing (OIDC)

**Configuration:**
- **Node.js versions:** Test on 20.x, 22.x, 24.x
- **Platform:** Use ubuntu-22.04
- **Automated releases:** Deploy to npm on version tags (requires NPM Trusted Publishing)

#### Critical: Lint-First Validation Workflow

**ALWAYS run ESLint checks BEFORE other tests.** Benefits:
- Catches code quality issues immediately
- Prevents wasting CI resources on tests that would fail due to linting errors
- Provides faster feedback to developers
- Enforces consistent code quality

**Workflow Dependency Configuration:**
```yaml
jobs:
  check-and-lint:
    # Runs ESLint and package validation
    # Uses: ioBroker/testing-action-check@v1
    
  adapter-tests:
    needs: [check-and-lint]  # Wait for linting to pass
    # Run adapter unit tests
    
  integration-tests:
    needs: [check-and-lint, adapter-tests]  # Wait for both
    # Run integration tests
```

**Key Points:**
- The `check-and-lint` job has NO dependencies - runs first
- ALL other test jobs MUST list `check-and-lint` in their `needs` array
- If linting fails, no other tests run, saving time
- Fix all ESLint errors before proceeding

### Testing Integration

#### API Testing in CI/CD

For adapters with external API dependencies:

```yaml
demo-api-tests:
  if: contains(github.event.head_commit.message, '[skip ci]') == false
  runs-on: ubuntu-22.04
  
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Use Node.js 20.x
      uses: actions/setup-node@v4
      with:
        node-version: 20.x
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run demo API tests
      run: npm run test:integration-demo
```

#### CI/CD Best Practices
- Run credential tests separately from main test suite
- Use ubuntu-22.04 for consistency
- Don't make credential tests required for deployment
- Provide clear failure messages for API connectivity issues
- Use appropriate timeouts for external API calls (120+ seconds)

#### Package.json Script Integration
```json
{
  "scripts": {
    "test:integration-demo": "mocha test/integration-demo --exit"
  }
}
```

---

## Admin Interface Development

**The alias-manager adapter has a sophisticated web-based admin interface** for creating and managing aliases. When working on the admin interface:

### Admin Panel Structure
```javascript
// admin/index_m.js - Main admin interface logic
function loadAliases() {
    // Load existing aliases for management
}

function createAlias() {
    // Create new alias with GUI input validation
}

function validateConversionFunction(func) {
    // Validate JavaScript expressions for read/write conversion
    try {
        new Function('val', 'return ' + func);
        return true;
    } catch (e) {
        return false;
    }
}
```

### GUI Best Practices
- Validate conversion functions before saving
- Provide clear error messages for invalid configurations
- Show real-time preview of alias behavior when possible
- Support both simple and advanced alias creation modes

---

## Configuration

### Adapter Configuration Schema
The alias-manager uses standard ioBroker configuration patterns:

```javascript
// io-package.json native configuration
"native": {
    "syncMode": "auto",
    "updateInterval": 1000,
    "maxAliases": 1000
}
```

### State Structure
Aliases follow ioBroker naming conventions:
- Alias states: `alias.0.*`
- Original states: Any valid ioBroker object ID
- Conversion functions: JavaScript expressions evaluated in context

### Dependencies

#### Core Dependencies
- `@iobroker/adapter-core`: Core adapter functionality
- Standard Node.js modules as needed

#### Development Dependencies
- `@iobroker/testing`: For integration tests
- `eslint`: Code linting
- `mocha`/`chai`: Unit testing
- `typescript`: If using TypeScript

### Deployment

#### Release Process
- Use `@alcalzone/release-script` for automated releases
- Follow semantic versioning
- Update changelog with meaningful descriptions
- Test thoroughly before release

#### GitHub Actions
The project uses automated GitHub Actions for:
- Testing on multiple Node.js versions
- Linting and code quality checks
- Automated releases

---

## Troubleshooting

### Common Issues
1. **Alias not updating**: Check conversion function syntax and original datapoint existence
2. **Circular references**: Ensure aliases don't reference each other directly
3. **Performance issues**: Monitor alias count and conversion function complexity
4. **GUI not loading**: Check admin interface dependencies and browser console

### Debugging
```javascript
// Enable detailed logging for alias operations
this.log.debug(`Processing alias ${aliasId} with value ${value}`);
this.log.debug(`Conversion result: ${convertedValue}`);
```

---

## Security

### Input Validation
- Validate all conversion functions as safe JavaScript
- Sanitize alias IDs and names
- Prevent execution of unsafe code in conversion functions

### Access Control
- Follow ioBroker's standard permission model
- Admin interface should require appropriate permissions
- Validate all admin API calls

This file should be regularly updated as the adapter evolves and new patterns emerge.