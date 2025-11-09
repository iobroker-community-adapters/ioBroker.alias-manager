# ioBroker Adapter Development with GitHub Copilot

**Version:** 0.4.2
**Template Source:** https://github.com/DrozmotiX/ioBroker-Copilot-Instructions

This file contains instructions and best practices for GitHub Copilot when working on ioBroker adapter development.

## Project Context

You are working on an ioBroker adapter. ioBroker is an integration platform for the Internet of Things, focused on building smart home and industrial IoT solutions. Adapters are plugins that connect ioBroker to external systems, devices, or services.

**This is the alias-manager adapter**, which manages and creates aliases for ioBroker datapoints. Key features include:
- **Alias Creation**: Creates alias datapoints that mirror existing ioBroker objects with optional read/write conversion functions
- **Datapoint Management**: Provides GUI for managing alias relationships, including linking original datapoints to alias datapoints
- **Autocreate Functionality**: Automatically creates multiple aliases from existing device structures with pattern matching
- **Conversion Functions**: Supports JavaScript expressions for read/write value transformations (e.g., `val / 10` for scaling)
- **Sync Management**: Keeps original and alias datapoints synchronized bidirectionally
- **Admin Interface**: Web-based configuration interface for creating and managing aliases

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
                            // Add any specific native configuration for alias-manager
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

### Testing Best Practices for alias-manager

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

1. **NEVER test API URLs directly** - Let the adapter handle API calls
2. **ALWAYS use the harness** - `getHarness()` provides the testing environment  
3. **Configure via objects** - Use `harness.objects.setObject()` to set adapter configuration
4. **Start properly** - Use `harness.startAdapterAndWait()` to start the adapter
5. **Check states** - Use `harness.states.getState()` to verify results
6. **Use timeouts** - Allow time for async operations with appropriate timeouts
7. **Test real workflow** - Initialize → Configure → Start → Verify States

#### Workflow Dependencies
Integration tests should run ONLY after lint and adapter tests pass:

```yaml
integration-tests:
  needs: [check-and-lint, adapter-tests]
  runs-on: ubuntu-latest
  steps:
    - name: Run integration tests
      run: npx mocha test/integration-*.js --exit
```

#### What NOT to Do
❌ Direct API testing: `axios.get('https://api.example.com')`
❌ Mock adapters: `new MockAdapter()`  
❌ Direct internet calls in tests
❌ Bypassing the harness system

#### What TO Do
✅ Use `@iobroker/testing` framework
✅ Configure via `harness.objects.setObject()`
✅ Start via `harness.startAdapterAndWait()`
✅ Test complete adapter lifecycle
✅ Verify states via `harness.states.getState()`
✅ Allow proper timeouts for async operations

### API Testing with Credentials
For adapters that connect to external APIs requiring authentication, implement comprehensive credential testing:

#### Password Encryption for Integration Tests
When creating integration tests that need encrypted passwords (like those marked as `encryptedNative` in io-package.json):

1. **Read system secret**: Use `harness.objects.getObjectAsync("system.config")` to get `obj.native.secret`
2. **Apply XOR encryption**: Implement the encryption algorithm:
   ```javascript
   async function encryptPassword(harness, password) {
       const systemConfig = await harness.objects.getObjectAsync("system.config");
       if (!systemConfig || !systemConfig.native || !systemConfig.native.secret) {
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
3. **Store encrypted password**: Set the encrypted result in adapter config, not the plain text
4. **Result**: Adapter will properly decrypt and use credentials, enabling full API connectivity testing

#### Demo Credentials Testing Pattern
- Use provider demo credentials when available (e.g., `demo@api-provider.com` / `demo`)
- Create separate test file (e.g., `test/integration-demo.js`) for credential-based tests
- Add npm script: `"test:integration-demo": "mocha test/integration-demo --exit"`
- Implement clear success/failure criteria with recognizable log messages
- Expected success pattern: Look for specific adapter initialization messages
- Test should fail clearly with actionable error messages for debugging

#### Enhanced Test Failure Handling
```javascript
it("Should connect to API with demo credentials", async () => {
    // ... setup and encryption logic ...
    
    const connectionState = await harness.states.getStateAsync("adapter.0.info.connection");
    
    if (connectionState && connectionState.val === true) {
        console.log("✅ SUCCESS: API connection established");
        return true;
    } else {
        throw new Error("API Test Failed: Expected API connection to be established with demo credentials. " +
            "Check logs above for specific API errors (DNS resolution, 401 Unauthorized, network issues, etc.)");
    }
}).timeout(120000); // Extended timeout for API calls
```

## README Updates

### Required Sections
When updating README.md files, ensure these sections are present and well-documented:

1. **Installation** - Clear npm/ioBroker admin installation steps
2. **Configuration** - Detailed configuration options with examples
3. **Usage** - Practical examples and use cases for alias creation
4. **Changelog** - Version history and changes (use "## **WORK IN PROGRESS**" section for ongoing changes following AlCalzone release-script standard)
5. **License** - License information (typically MIT for ioBroker adapters)
6. **Support** - Links to issues, discussions, and community support

### Documentation Standards
- Use clear, concise language
- Include code examples for alias configuration
- Add screenshots for admin interface when applicable (alias-manager has a rich GUI)
- Maintain multilingual support (at minimum English and German)
- When creating PRs, add entries to README under "## **WORK IN PROGRESS**" section following ioBroker release script standard
- Always reference related issues in commits and PR descriptions (e.g., "solves #xx" or "fixes #xx")

### Mandatory README Updates for PRs
For **every PR or new feature**, always add a user-friendly entry to README.md:

- Add entries under `## **WORK IN PROGRESS**` section before committing
- Use format: `* (author) **TYPE**: Description of user-visible change`
- Example: `* (developer) **FEATURE**: Added support for regex patterns in autocreate alias functionality`

### Documentation Workflow Standards
- **Pre-Commit**: Add user-visible changes to "## **WORK IN PROGRESS**" section in README.md
- **Post-Release**: AlCalzone release-script automatically moves entries to versioned section
- **Format**: `* (githubUsername) **CATEGORY**: Description` where CATEGORY is FEATURE, BREAKING CHANGE, FIX, etc.

### Changelog Management with AlCalzone Release-Script

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
1. **Development**: Add changes under `## **WORK IN PROGRESS**` heading
2. **Release**: Run `npm run release` (uses @alcalzone/release-script)
3. **Automation**: Script moves WIP entries to new version section with timestamp
4. **Result**: Clean changelog with version history

#### Change Entry Format
- Use format: `* (githubUsername) **CATEGORY**: Description`
- Categories: FEATURE, FIX, BREAKING CHANGE, TRANSLATION, DEPENDENCIES
- Keep descriptions user-friendly and concise
- Reference issues when applicable: `fixes #123` or `closes #456`

#### Example Entry
```markdown
## **WORK IN PROGRESS**
* (developer) **FEATURE**: Added autocreate patterns for alias creation
* (developer) **FIX**: Resolved sync issue with bidirectional aliases (fixes #42)
```

## Dependency Updates

### Package Management
- Use `npm ci` in CI/CD pipelines for consistent installations
- Use `npm install` for development
- Document required peer dependencies
- Lock dependency versions for production stability

### Dependency Best Practices
- Minimize dependencies to reduce security vulnerabilities
- Use well-maintained, popular libraries
- Regular security audits with `npm audit`
- Keep Node.js and npm versions updated

## JSON-Config Admin Instructions

### Configuration Schema
For adapters using JSON-Config admin interfaces, structure your io-package.json schema carefully:

```json
"native": {
    "username": "",
    "password": "",
    "interval": 300000
},
"encryptedNative": ["password"]
```

### Admin Interface Guidelines
- Use clear labels and descriptions
- Provide input validation
- Show helpful error messages
- Support both simple and advanced modes

## Best Practices for Dependencies

### HTTP Client Libraries
- **Recommended**: Use `fetch` (built-in Node 18+) or `axios` for HTTP requests
- Avoid deprecated libraries like `request`
- Handle network errors gracefully

### Example with fetch:
```javascript
try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
} catch (error) {
    this.log.error(`Failed to fetch data: ${error.message}`);
}
```

### Other Dependency Recommendations
- Use `dayjs` instead of `moment` (smaller, modern)
- Use native Node.js modules when possible
- Check bundle size impact before adding dependencies

## Code Standards

### JavaScript/TypeScript Standards
- Use ESLint with the project's configuration
- Follow async/await patterns over callbacks where possible
- Use proper error handling with try/catch blocks
- Comment complex alias logic, especially conversion functions

### ioBroker-Specific Standards

#### State Management for alias-manager
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

### Error Handling

#### Adapter Error Patterns
Always implement comprehensive error handling:

```javascript
try {
    // Alias operations
    await this.createAlias(aliasId, originalId, readFunc, writeFunc);
} catch (error) {
    this.log.error(`Failed to create alias ${aliasId}: ${error.message}`);
    this.log.debug(`Stack trace: ${error.stack}`);
}
```

#### Example Error Handling:
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

#### Timer and Resource Cleanup:
```javascript
onUnload(callback) {
  try {
    // Clear all timers
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = undefined;
    }
    if (this.connectionTimer) {
      clearTimeout(this.connectionTimer);
      this.connectionTimer = undefined;
    }
    // Close connections, clean up resources
    callback();
  } catch (e) {
    callback();
  }
}
```

## Dependencies

### Core Dependencies
- `@iobroker/adapter-core`: Core adapter functionality
- Standard Node.js modules as needed

### Development Dependencies
- `@iobroker/testing`: For integration tests
- `eslint`: Code linting
- `mocha`/`chai`: Unit testing
- `typescript`: If using TypeScript

### Dependency Management
- Keep dependencies updated but test thoroughly
- Use exact versions for critical dependencies
- Document any special dependency requirements

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

## Deployment

### Release Process
- Use `@alcalzone/release-script` for automated releases
- Follow semantic versioning
- Update changelog with meaningful descriptions
- Test thoroughly before release

### GitHub Actions
The project uses automated GitHub Actions for:
- Testing on multiple Node.js versions
- Linting and code quality checks
- Automated releases

## CI/CD and Testing Integration

### GitHub Actions for API Testing
For adapters with external API dependencies, implement separate CI/CD jobs:

```yaml
# Tests API connectivity with demo credentials (runs separately)
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

### CI/CD Best Practices
- Run credential tests separately from main test suite
- Use ubuntu-22.04 for consistency
- Don't make credential tests required for deployment
- Provide clear failure messages for API connectivity issues
- Use appropriate timeouts for external API calls (120+ seconds)

### Package.json Script Integration
Add dedicated script for credential testing:
```json
{
  "scripts": {
    "test:integration-demo": "mocha test/integration-demo --exit"
  }
}
```

## Code Style and Standards

- Follow JavaScript/TypeScript best practices
- Use async/await for asynchronous operations
- Implement proper resource cleanup in `unload()` method
- Use semantic versioning for adapter releases
- Include proper JSDoc comments for public methods

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