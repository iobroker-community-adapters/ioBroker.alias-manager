# ioBroker Adapter Development with GitHub Copilot

**Version:** 0.4.0
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