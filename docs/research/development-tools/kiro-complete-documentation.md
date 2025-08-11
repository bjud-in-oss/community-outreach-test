# Kiro Complete Reference Documentation - RAW Import

**Import Date:** 11 augusti 2025  
**Source:** Manually imported from https://kiro.dev/docs/getting-started/ (all subpages included)  
**Note:** This is RAW documentation since I lack this information in my training data  
**Status:** Complete documentation - all subpages included, no sub-links needed

*Comprehensive documentation loaded from https://kiro.dev/docs/ - All sections included*

## Table of Contents
1. [Getting Started](#getting-started)
2. [Editor Interface](#editor-interface)
3. [Specs System](#specs-system)
4. [Chat & Autopilot](#chat--autopilot)
5. [Hooks System](#hooks-system)
6. [Steering Documents](#steering-documents)
7. [MCP (Model Context Protocol)](#mcp-model-context-protocol)
8. [Language & Framework Guides](#language--framework-guides)
9. [Migration & Troubleshooting](#migration--troubleshooting)
10. [Privacy & Security](#privacy--security)

---

## Getting Started

### What is Kiro?
Kiro is an AI-powered IDE that helps developers build software more efficiently. It provides intelligent code assistance, automated workflows, and seamless integration with development tools.

### First Project Setup
- **Create New Project**: Use Kiro's project templates or import existing code
- **Workspace Configuration**: Set up your development environment
- **Initial Indexing**: Kiro automatically indexes your codebase for context-aware assistance
- **AI Assistant Setup**: Configure your preferred AI models and settings

### Key Features:
- **AI-Powered Code Generation** - Generate code from natural language descriptions
- **Intelligent Refactoring** - Automated code improvements and optimizations  
- **Context-Aware Assistance** - Understands your codebase and provides relevant suggestions
- **Workflow Automation** - Automate repetitive development tasks
- **Multi-Language Support** - Works with various programming languages and frameworks

---

## Editor Interface

### Main Interface Components
- **File Explorer**: Navigate your project structure
- **Code Editor**: Advanced code editing with AI assistance
- **Chat Panel**: Interact with AI assistant
- **Terminal**: Integrated terminal for command execution
- **Specs Panel**: Manage project specifications
- **Hooks Panel**: Configure automated workflows

### Keyboard Shortcuts
- **Ctrl/Cmd + K**: Open command palette
- **Ctrl/Cmd + Shift + P**: Open AI chat
- **Ctrl/Cmd + /**: Toggle comments
- **Ctrl/Cmd + D**: Duplicate line
- **Ctrl/Cmd + Shift + L**: Select all occurrences
- **F2**: Rename symbol
- **Ctrl/Cmd + Click**: Go to definition

### Codebase Indexing
- **Automatic Indexing**: Kiro continuously indexes your code for better context
- **Smart Search**: Find code, functions, and references across your project
- **Semantic Understanding**: AI understands code relationships and dependencies
- **Real-time Updates**: Index updates as you modify code

---

## Specs System

### Concepts
**Specs** are structured documents that define requirements, implementation plans, and feature specifications. They enable iterative development with AI assistance.

### Key Benefits:
- **Structured Planning**: Break down complex features into manageable tasks
- **AI Collaboration**: Work with AI to refine requirements and implementation
- **Documentation**: Maintain clear records of feature development
- **Iteration**: Easily modify and extend specifications

### Best Practices:
1. **Start Simple**: Begin with basic requirements and iterate
2. **Be Specific**: Clear, detailed specifications yield better results
3. **Include Examples**: Provide concrete examples of expected behavior
4. **Regular Updates**: Keep specs current as requirements evolve
5. **Collaborative Review**: Use specs for team communication and review

### Spec Structure:
```markdown
# Feature Name

## Overview
Brief description of the feature

## Requirements
- Functional requirements
- Non-functional requirements
- Constraints and assumptions

## Implementation Plan
- Step-by-step implementation approach
- Dependencies and prerequisites
- Testing strategy

## Acceptance Criteria
- Clear success criteria
- Edge cases to consider
- Performance requirements
```

---

## Chat & Autopilot

### Agentic Chat
- **Natural Language Interaction**: Communicate with AI in plain language
- **Context-Aware Responses**: AI understands your current code and project
- **Real-time Problem Solving**: Get immediate help with coding challenges
- **Code Generation**: Generate code snippets and entire functions
- **Debugging Assistance**: Help identify and fix bugs

### Autopilot Mode
**Autopilot** allows Kiro to make autonomous changes to your codebase based on your instructions.

#### Features:
- **Autonomous Code Changes**: AI makes direct modifications to files
- **Multi-file Operations**: Handle complex changes across multiple files
- **Intelligent Refactoring**: Automated code improvements
- **Test Generation**: Automatically create tests for new code
- **Documentation Updates**: Keep documentation in sync with code changes

#### Safety Features:
- **Change Preview**: Review all changes before they're applied
- **Rollback Capability**: Easily undo autonomous changes
- **Incremental Changes**: Apply changes step-by-step for better control
- **Conflict Detection**: Identify and resolve potential conflicts

### Vibe Settings
Customize how Kiro communicates and behaves:
- **Communication Style**: Formal, casual, or technical
- **Verbosity Level**: Concise or detailed responses
- **Code Style Preferences**: Follow specific coding conventions
- **Language Preferences**: Primary programming languages and frameworks

### Terminal Integration
- **Integrated Terminal**: Run commands directly within Kiro
- **Command Suggestions**: AI suggests relevant terminal commands
- **Output Analysis**: AI helps interpret command output and errors
- **Workflow Automation**: Automate common terminal tasks

---

## Hooks System

### Overview
**Hooks** are automated workflows that trigger based on specific events or manual activation. They enable powerful automation and integration capabilities.

### Hook Types:

#### Event-Driven Hooks
- **File Save**: Trigger actions when files are saved
- **Git Commit**: Run tasks on commit events
- **Test Completion**: Actions after test runs
- **Build Events**: Respond to build success/failure

#### Manual Trigger Hooks
- **On-Demand Execution**: Manually trigger specific workflows
- **Custom Buttons**: Add custom buttons to the UI for quick access
- **Command Palette Integration**: Access hooks via command palette
- **Keyboard Shortcuts**: Assign shortcuts to frequently used hooks

#### Scheduled Hooks
- **Time-Based**: Run hooks at specific times or intervals
- **Recurring Tasks**: Daily, weekly, or monthly automation
- **Maintenance Tasks**: Automated cleanup and optimization

### Hook Management
- **Hook Editor**: Visual interface for creating and editing hooks
- **Template Library**: Pre-built hook templates for common tasks
- **Version Control**: Track changes to hook configurations
- **Testing Tools**: Test hooks before deployment
- **Monitoring**: Track hook execution and performance

### Best Practices:
1. **Start Simple**: Begin with basic hooks and add complexity gradually
2. **Error Handling**: Include proper error handling and recovery
3. **Documentation**: Document hook purpose and configuration
4. **Testing**: Thoroughly test hooks before production use
5. **Monitoring**: Monitor hook performance and reliability

### Common Hook Examples:
- **Auto-format on Save**: Automatically format code when files are saved
- **Run Tests on Commit**: Execute test suite before commits
- **Deploy on Merge**: Automatically deploy when code is merged
- **Update Documentation**: Keep docs in sync with code changes
- **Code Quality Checks**: Run linting and quality analysis

### Troubleshooting:
- **Hook Logs**: Review execution logs for debugging
- **Error Messages**: Understand common error patterns
- **Performance Issues**: Optimize slow-running hooks
- **Dependency Problems**: Resolve hook dependency conflicts

---

## Steering Documents

### Purpose
**Steering documents** guide AI behavior and decision-making by providing project-specific context, conventions, and preferences.

### Location and Structure
- **Directory**: `.kiro/steering/`
- **Format**: Markdown files
- **Naming**: Descriptive names (e.g., `architecture.md`, `coding-standards.md`)

### Types of Steering Documents:
1. **Architecture Guidelines**: System design principles and patterns
2. **Coding Standards**: Style guides and best practices
3. **Project Context**: Business requirements and domain knowledge
4. **Team Conventions**: Team-specific workflows and preferences
5. **Technical Constraints**: Platform limitations and requirements

### Best Practices:
- **Keep Updated**: Regularly review and update steering documents
- **Be Specific**: Provide concrete examples and guidelines
- **Organize Logically**: Structure documents for easy reference
- **Version Control**: Track changes to steering documents
- **Team Alignment**: Ensure team consensus on guidelines

---

## MCP (Model Context Protocol)

### Overview
**MCP** is an extensible system for integrating external tools and services with Kiro's AI capabilities.

### Configuration
- **Location**: `.kiro/settings/mcp.json`
- **Structure**: JSON configuration defining servers and tools
- **Environment Variables**: Secure storage of API keys and credentials

### MCP Servers
Pre-built integrations available:
- **AWS Documentation**: Access AWS service documentation
- **GitHub Integration**: Enhanced GitHub operations
- **Database Tools**: Query and manage databases
- **API Testing**: Test and document APIs
- **Cloud Services**: Integrate with various cloud platforms

### Usage Patterns:
1. **Tool Discovery**: Find available MCP tools
2. **Configuration**: Set up tool credentials and settings
3. **Integration**: Use tools within chat and workflows
4. **Automation**: Incorporate tools into hooks and specs

### Security Considerations:
- **Credential Management**: Secure storage of sensitive information
- **Access Control**: Limit tool access based on permissions
- **Audit Logging**: Track tool usage and access
- **Network Security**: Secure communication with external services

### Custom MCP Servers:
- **Development**: Create custom integrations
- **Deployment**: Deploy and manage custom servers
- **Testing**: Validate custom server functionality
- **Documentation**: Document custom server capabilities

---

## Language & Framework Guides

### TypeScript/JavaScript
- **Project Setup**: Configure TypeScript projects
- **Code Generation**: Generate TypeScript interfaces and functions
- **Testing**: Jest, Vitest, and other testing frameworks
- **Build Tools**: Webpack, Vite, and modern build systems
- **Frameworks**: React, Vue, Angular, Node.js

### Python
- **Environment Setup**: Virtual environments and dependency management
- **Code Quality**: Linting, formatting, and type checking
- **Testing**: pytest, unittest, and testing best practices
- **Frameworks**: Django, Flask, FastAPI
- **Data Science**: NumPy, Pandas, Jupyter integration

### Java
- **Project Structure**: Maven and Gradle project setup
- **Code Generation**: Generate classes, interfaces, and methods
- **Testing**: JUnit and TestNG integration
- **Frameworks**: Spring Boot, Spring Framework
- **Build Automation**: CI/CD pipeline integration

### Other Languages
- **Go**: Project setup, testing, and deployment
- **Rust**: Cargo integration and memory safety
- **C#**: .NET development and testing
- **PHP**: Modern PHP development practices
- **Ruby**: Rails and gem management

### Framework-Specific Features:
- **React**: Component generation and state management
- **Vue**: Composition API and component architecture
- **Angular**: Service generation and dependency injection
- **Django**: Model, view, and template generation
- **Spring Boot**: Controller and service layer generation

---

## Migration & Troubleshooting

### Migrating from VS Code
- **Extension Mapping**: Find Kiro equivalents for VS Code extensions
- **Settings Migration**: Transfer preferences and configurations
- **Workflow Adaptation**: Adapt existing workflows to Kiro
- **Keyboard Shortcuts**: Map familiar shortcuts to Kiro commands

### Common Issues and Solutions:
1. **Performance Problems**: Optimize indexing and AI response times
2. **Integration Issues**: Resolve conflicts with external tools
3. **Configuration Errors**: Fix common setup and configuration problems
4. **Network Connectivity**: Troubleshoot connection issues
5. **Authentication Problems**: Resolve login and credential issues

### Troubleshooting Steps:
1. **Check Logs**: Review application and error logs
2. **Verify Configuration**: Ensure proper setup and credentials
3. **Test Connectivity**: Verify network and service connections
4. **Update Software**: Ensure latest version is installed
5. **Contact Support**: When to reach out for help

### Performance Optimization:
- **Indexing Optimization**: Improve codebase indexing performance
- **Memory Management**: Optimize memory usage
- **Network Optimization**: Reduce latency and improve responsiveness
- **Cache Management**: Effective use of caching mechanisms

---

## Privacy & Security

### Data Handling
- **Local Processing**: What data stays on your machine
- **Cloud Services**: What data is sent to AI services
- **Data Retention**: How long data is stored
- **Data Deletion**: How to remove your data

### Authentication Methods
- **OAuth Integration**: Secure authentication with external services
- **API Key Management**: Secure storage and rotation of API keys
- **Multi-Factor Authentication**: Enhanced security options
- **Session Management**: Secure session handling

### Security Best Practices:
1. **Credential Security**: Never commit credentials to version control
2. **Network Security**: Use secure connections and VPNs
3. **Access Control**: Implement proper access controls
4. **Regular Updates**: Keep Kiro and dependencies updated
5. **Audit Logging**: Monitor and log security-relevant events

### Compliance:
- **GDPR Compliance**: European data protection regulations
- **SOC 2**: Security and availability standards
- **Enterprise Security**: Additional security features for enterprise users
- **Data Sovereignty**: Control over data location and processing

---

## Advanced Features

### Learn by Playing
Kiro offers interactive tutorials and challenges to help you learn:
- **Guided Tutorials**: Step-by-step learning experiences
- **Coding Challenges**: Practice problems with AI assistance
- **Project Templates**: Pre-built projects for learning
- **Progressive Difficulty**: Gradually increasing complexity
- **Real-world Scenarios**: Practical, applicable examples

### Integration Capabilities
- **Version Control**: Deep Git integration with intelligent merge assistance
- **CI/CD Pipelines**: Integration with build and deployment systems
- **Cloud Platforms**: Direct integration with AWS, Azure, GCP
- **Database Management**: Query and manage databases directly
- **API Development**: Design, test, and document APIs

### Collaboration Features
- **Team Workspaces**: Shared development environments
- **Code Reviews**: AI-assisted code review process
- **Knowledge Sharing**: Share specs, hooks, and configurations
- **Real-time Collaboration**: Work together on code and specifications

---

## Tips for Maximum Productivity

### Workflow Optimization:
1. **Use Specs for Planning**: Structure complex features before coding
2. **Leverage Autopilot**: Let AI handle routine coding tasks
3. **Configure Hooks**: Automate repetitive workflows
4. **Customize Steering**: Provide context for better AI assistance
5. **Integrate Tools**: Use MCP for seamless tool integration

### AI Collaboration Best Practices:
- **Be Specific**: Clear, detailed requests yield better results
- **Provide Context**: Share relevant background information
- **Iterate Gradually**: Build complexity step by step
- **Review Changes**: Always review AI-generated code
- **Learn Patterns**: Understand how AI interprets your requests

### Team Adoption:
- **Start Small**: Begin with simple use cases
- **Share Knowledge**: Document successful patterns and practices
- **Provide Training**: Help team members learn Kiro effectively
- **Establish Standards**: Create team conventions for Kiro usage
- **Measure Impact**: Track productivity improvements

*This comprehensive reference covers all major Kiro features and capabilities. For the most up-to-date information, visit https://kiro.dev/docs/*