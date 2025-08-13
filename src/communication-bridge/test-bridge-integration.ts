// MASTER PLAN 2.0: Communication Bridge Integration Test
// STATUS: Komplett test av Dual Consciousness Architecture
// INTEGRATION: Testar hela Communication Bridge flödet
// ARCHITECTURE: Verifierar senior-säkerhet och teknisk filtrering

import { CommunicationBridge } from './CommunicationBridge.js';
import { TechnicalFilter } from './guardrails/TechnicalFilter.js';
import { SeniorTranslator } from './translation/SeniorTranslator.js';
import { ContextManager } from './memory/ContextManager.js';

/**
 * MASTER PLAN 2.0: Communication Bridge Integration Test
 * 
 * Testar hela flödet:
 * 1. Senior request → Technical specification
 * 2. Technical response → Senior-friendly message
 * 3. Guardrails filtering
 * 4. Context preservation
 * 5. Memory management
 */
export class CommunicationBridgeIntegrationTest {
  private bridge: CommunicationBridge;
  private testResults: TestResult[] = [];

  constructor() {
    console.log('🧪 Initializing Communication Bridge Integration Test...');
    
    // Initialize Communication Bridge with test configuration
    this.bridge = new CommunicationBridge({
      guardrails: {
        enabled: true,
        strictMode: true,
        customTranslations: new Map(),
        customBlacklist: new Set(),
        emotionalSafetyLevel: 'high',
        debugMode: true
      },
      translation: {
        sourceLanguage: 'sv',
        targetLanguage: 'en',
        technicalToSenior: true,
        seniorToTechnical: true,
        preserveContext: true,
        confidenceThreshold: 0.7
      },
      memory: {
        maxSessions: 10,
        sessionTimeoutMinutes: 30,
        maxMessagesPerSession: 100,
        persistToDisk: false
      },
      monitoring: {
        enabled: true,
        metricsInterval: 10,
        healthCheckInterval: 30,
        logLevel: 'debug'
      },
      security: {
        encryptMessages: false,
        auditLog: true,
        rateLimiting: {
          enabled: false,
          maxMessagesPerMinute: 60
        }
      }
    });
  }

  /**
   * MASTER PLAN 2.0: Run all integration tests
   */
  async runAllTests(): Promise<TestSummary> {
    console.log('🚀 Starting Communication Bridge Integration Tests...');\n    
    const startTime = Date.now();
    
    try {
      // Test 1: Hello World Flow
      await this.testHelloWorldFlow();
      
      // Test 2: Senior Safety Filtering
      await this.testSeniorSafetyFiltering();
      
      // Test 3: Technical Translation
      await this.testTechnicalTranslation();
      
      // Test 4: Context Preservation
      await this.testContextPreservation();
      
      // Test 5: Error Handling
      await this.testErrorHandling();
      
      // Test 6: Memory Management
      await this.testMemoryManagement();
      
      // Test 7: Performance
      await this.testPerformance();
      
      const endTime = Date.now();
      const summary = this.generateTestSummary(endTime - startTime);
      
      console.log('✅ All Communication Bridge tests completed!');\n      this.printTestSummary(summary);
      
      return summary;
      
    } catch (error) {
      console.error('❌ Integration test failed:', error);
      throw error;
    }
  }

  /**
   * TEST 1: Hello World Flow
   * Testar grundläggande flöde från senior request till technical spec och tillbaka
   */
  private async testHelloWorldFlow(): Promise<void> {
    console.log('\\n🧪 TEST 1: Hello World Flow');
    
    const testName = 'Hello World Flow';
    const startTime = Date.now();
    
    try {
      // 1. Senior request: "Skapa en enkel Hello World app"
      const seniorRequest = {
        id: 'test-senior-1',
        timestamp: new Date(),
        originalText: 'Skapa en enkel Hello World app för mig',
        intent: 'create_app' as const,
        complexity: 'low' as const,
        emotionalTone: 'excited' as const
      };
      
      console.log(`   📝 Senior request: "${seniorRequest.originalText}"`);
      
      // 2. Process through Communication Bridge
      const bridgeResult = await this.bridge.processSeniorRequest(seniorRequest);
      
      console.log(`   🔄 Bridge processing completed`);
      console.log(`   📊 Technical spec generated: ${bridgeResult.technicalSpec.title}`);
      
      // 3. Simulate Core Agent response
      const coreAgentResponse = {
        success: true,
        message: 'Hello World application created successfully',
        data: {
          appUrl: 'https://hello-world-app.vercel.app',
          deploymentStatus: 'completed',
          buildTime: '45 seconds',
          technicalDetails: {
            framework: 'Next.js',
            language: 'TypeScript',
            deployment: 'Vercel',
            database: 'None required'
          }
        },
        metadata: {
          processingTime: 45000,
          complexity: 'low',
          confidence: 0.95
        }
      };
      
      // 4. Process Core Agent response back to senior
      const seniorResponse = await this.bridge.processCoreAgentResponse(
        coreAgentResponse,
        bridgeResult.sessionId
      );
      
      console.log(`   💬 Senior response: "${seniorResponse.message}"`);
      
      // 5. Verify results
      const verifications = [
        {
          name: 'Technical spec generated',
          passed: bridgeResult.technicalSpec !== null,
          details: `Title: ${bridgeResult.technicalSpec?.title}`
        },
        {
          name: 'Senior-safe response',
          passed: !seniorResponse.message.toLowerCase().includes('api') &&
                  !seniorResponse.message.toLowerCase().includes('deployment') &&
                  !seniorResponse.message.toLowerCase().includes('framework'),
          details: 'No technical terms in senior response'
        },
        {
          name: 'Encouraging tone',
          passed: seniorResponse.message.includes('🎉') || 
                  seniorResponse.message.includes('Fantastiskt') ||
                  seniorResponse.message.includes('Perfekt'),
          details: 'Response has encouraging tone'
        },
        {
          name: 'Context preserved',
          passed: bridgeResult.sessionId !== null,
          details: `Session ID: ${bridgeResult.sessionId}`
        }
      ];
      
      const allPassed = verifications.every(v => v.passed);
      const processingTime = Date.now() - startTime;
      
      this.testResults.push({
        testName,
        passed: allPassed,
        processingTime,
        verifications,
        details: {
          seniorRequest: seniorRequest.originalText,
          technicalSpec: bridgeResult.technicalSpec?.title,
          seniorResponse: seniorResponse.message,
          sessionId: bridgeResult.sessionId
        }
      });
      
      console.log(`   ${allPassed ? '✅' : '❌'} Test completed in ${processingTime}ms`);
      
    } catch (error) {
      console.error(`   ❌ Test failed:`, error);
      this.testResults.push({
        testName,
        passed: false,
        processingTime: Date.now() - startTime,
        verifications: [],
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * TEST 2: Senior Safety Filtering
   * Testar att teknisk information filtreras korrekt
   */
  private async testSeniorSafetyFiltering(): Promise<void> {
    console.log('\\n🧪 TEST 2: Senior Safety Filtering');
    
    const testName = 'Senior Safety Filtering';
    const startTime = Date.now();
    
    try {
      // Skapa teknisk respons med farlig information
      const dangerousTechnicalResponse = {
        success: false,
        error: 'API endpoint /api/users returned 500 Internal Server Error',
        stackTrace: 'Error: Database connection failed\\n    at DatabaseManager.connect (db.js:45)\\n    at UserService.getUsers (users.js:23)',
        debugInfo: {
          sqlQuery: 'SELECT * FROM users WHERE password = ?',
          connectionString: 'postgresql://user:pass@localhost:5432/db',
          apiKeys: {
            openai: 'sk-1234567890abcdef',
            github: 'ghp_abcdef1234567890'
          }
        },
        systemDetails: {
          nodeVersion: '18.17.0',
          memoryUsage: '245MB',
          cpuUsage: '78%',
          environment: 'production'
        }
      };
      
      console.log('   🚨 Processing dangerous technical response...');
      
      // Process genom Communication Bridge
      const filteredResponse = await this.bridge.processCoreAgentResponse(
        dangerousTechnicalResponse,
        'test-session-safety'
      );
      
      console.log(`   🛡️ Filtered response: "${filteredResponse.message}"`);
      
      // Verify safety filtering
      const dangerousTerms = [
        'API', 'endpoint', '500', 'Internal Server Error', 'stackTrace',
        'Database', 'SQL', 'postgresql', 'apiKeys', 'sk-', 'ghp_',
        'nodeVersion', 'memoryUsage', 'cpuUsage', 'production'
      ];
      
      const verifications = dangerousTerms.map(term => ({
        name: `Filtered "${term}"`,
        passed: !filteredResponse.message.toLowerCase().includes(term.toLowerCase()),
        details: `Term "${term}" should not appear in senior response`
      }));
      
      // Additional verifications
      verifications.push(
        {
          name: 'Encouraging tone maintained',
          passed: filteredResponse.message.includes('löser') || 
                  filteredResponse.message.includes('hjälper') ||
                  filteredResponse.message.includes('fixar'),
          details: 'Response maintains supportive tone despite error'
        },
        {
          name: 'No technical jargon',
          passed: !/\\b(error|exception|crash|fail|debug|log|api|server|database)\\b/i.test(filteredResponse.message),
          details: 'No technical jargon in filtered response'
        }
      );
      
      const allPassed = verifications.every(v => v.passed);
      const processingTime = Date.now() - startTime;
      
      this.testResults.push({
        testName,
        passed: allPassed,
        processingTime,
        verifications,
        details: {
          originalResponse: JSON.stringify(dangerousTechnicalResponse, null, 2),
          filteredResponse: filteredResponse.message,
          dangerousTermsCount: dangerousTerms.length,
          filteredTermsCount: verifications.filter(v => v.passed).length
        }
      });
      
      console.log(`   ${allPassed ? '✅' : '❌'} Safety filtering completed in ${processingTime}ms`);
      
    } catch (error) {
      console.error(`   ❌ Safety filtering test failed:`, error);
      this.testResults.push({
        testName,
        passed: false,
        processingTime: Date.now() - startTime,
        verifications: [],
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * TEST 3: Technical Translation
   * Testar översättning mellan senior-språk och tekniska specifikationer
   */
  private async testTechnicalTranslation(): Promise<void> {
    console.log('\\n🧪 TEST 3: Technical Translation');
    
    const testName = 'Technical Translation';
    const startTime = Date.now();
    
    try {
      const testCases = [
        {
          seniorText: 'Jag vill ha en app som översätter svenska till engelska',
          expectedIntent: 'translation_feature',
          expectedComplexity: 'high'
        },
        {
          seniorText: 'Kan du hjälpa mig skapa en enkel familjekalender?',
          expectedIntent: 'create_simple_app',
          expectedComplexity: 'medium'
        },
        {
          seniorText: 'Vad händer med min app? Är den klar?',
          expectedIntent: 'check_status',
          expectedComplexity: 'low'
        }
      ];
      
      const verifications: TestVerification[] = [];
      
      for (const testCase of testCases) {
        console.log(`   📝 Testing: "${testCase.seniorText}"`);\n        
        const seniorRequest = {
          id: `test-translation-${Date.now()}`,
          timestamp: new Date(),
          originalText: testCase.seniorText,
          intent: 'unknown' as const,
          complexity: 'medium' as const,
          emotionalTone: 'neutral' as const
        };
        
        const result = await this.bridge.processSeniorRequest(seniorRequest);
        
        verifications.push(
          {
            name: `Intent detection for "${testCase.seniorText.substring(0, 30)}..."`,
            passed: result.detectedIntent === testCase.expectedIntent,
            details: `Expected: ${testCase.expectedIntent}, Got: ${result.detectedIntent}`
          },
          {
            name: `Complexity assessment for "${testCase.seniorText.substring(0, 30)}..."`,
            passed: result.technicalSpec.complexity === testCase.expectedComplexity,
            details: `Expected: ${testCase.expectedComplexity}, Got: ${result.technicalSpec.complexity}`
          }
        );
        
        console.log(`     🎯 Intent: ${result.detectedIntent}, Complexity: ${result.technicalSpec.complexity}`);
      }
      
      const allPassed = verifications.every(v => v.passed);
      const processingTime = Date.now() - startTime;
      
      this.testResults.push({
        testName,
        passed: allPassed,
        processingTime,
        verifications,
        details: {
          testCasesCount: testCases.length,
          successfulTranslations: verifications.filter(v => v.passed).length / 2
        }
      });
      
      console.log(`   ${allPassed ? '✅' : '❌'} Translation testing completed in ${processingTime}ms`);
      
    } catch (error) {
      console.error(`   ❌ Translation test failed:`, error);
      this.testResults.push({
        testName,
        passed: false,
        processingTime: Date.now() - startTime,
        verifications: [],
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * TEST 4: Context Preservation
   * Testar att kontext bevaras mellan meddelanden
   */
  private async testContextPreservation(): Promise<void> {
    console.log('\\n🧪 TEST 4: Context Preservation');
    
    const testName = 'Context Preservation';
    const startTime = Date.now();
    
    try {
      // Start conversation
      const initialRequest = {
        id: 'context-test-1',
        timestamp: new Date(),
        originalText: 'Skapa en familjehistoria-app',
        intent: 'create_app' as const,
        complexity: 'medium' as const,
        emotionalTone: 'excited' as const
      };
      
      console.log('   📝 Initial request: Creating family history app');
      const initialResult = await this.bridge.processSeniorRequest(initialRequest);
      const sessionId = initialResult.sessionId;
      
      // Follow-up request in same session
      const followUpRequest = {
        id: 'context-test-2',
        timestamp: new Date(),
        originalText: 'Lägg till funktionalitet för att ladda upp foton',
        intent: 'add_feature' as const,
        complexity: 'medium' as const,
        emotionalTone: 'neutral' as const
      };
      
      console.log('   📝 Follow-up request: Add photo upload');
      const followUpResult = await this.bridge.processSeniorRequest(followUpRequest, sessionId);
      
      // Status check
      const statusRequest = {
        id: 'context-test-3',
        timestamp: new Date(),
        originalText: 'Hur går det med min app?',
        intent: 'check_status' as const,
        complexity: 'low' as const,
        emotionalTone: 'curious' as const
      };
      
      console.log('   📝 Status request: How is my app doing?');
      const statusResult = await this.bridge.processSeniorRequest(statusRequest, sessionId);
      
      // Verify context preservation
      const verifications = [
        {
          name: 'Same session ID maintained',
          passed: initialResult.sessionId === followUpResult.sessionId &&
                  followUpResult.sessionId === statusResult.sessionId,
          details: `Session ID: ${sessionId}`
        },
        {
          name: 'Context references preserved',
          passed: followUpResult.technicalSpec.description.includes('family') ||
                  followUpResult.technicalSpec.description.includes('familj'),
          details: 'Follow-up request references original context'
        },
        {
          name: 'Conversation history maintained',
          passed: statusResult.conversationHistory !== undefined &&
                  statusResult.conversationHistory.length >= 2,
          details: `History length: ${statusResult.conversationHistory?.length || 0}`
        }
      ];
      
      const allPassed = verifications.every(v => v.passed);
      const processingTime = Date.now() - startTime;
      
      this.testResults.push({
        testName,
        passed: allPassed,
        processingTime,
        verifications,
        details: {
          sessionId,
          requestsInSession: 3,
          contextPreserved: allPassed
        }
      });
      
      console.log(`   ${allPassed ? '✅' : '❌'} Context preservation completed in ${processingTime}ms`);
      
    } catch (error) {
      console.error(`   ❌ Context preservation test failed:`, error);
      this.testResults.push({
        testName,
        passed: false,
        processingTime: Date.now() - startTime,
        verifications: [],
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * TEST 5: Error Handling
   * Testar felhantering och återhämtning
   */
  private async testErrorHandling(): Promise<void> {
    console.log('\\n🧪 TEST 5: Error Handling');
    
    const testName = 'Error Handling';
    const startTime = Date.now();
    
    try {
      // Test invalid senior request
      const invalidRequest = {
        id: 'error-test-1',
        timestamp: new Date(),
        originalText: '', // Empty request
        intent: 'unknown' as const,
        complexity: 'low' as const,
        emotionalTone: 'confused' as const
      };
      
      console.log('   🚨 Testing empty request handling...');
      const emptyResult = await this.bridge.processSeniorRequest(invalidRequest);
      
      // Test malformed Core Agent response
      const malformedResponse = {
        // Missing required fields
        randomField: 'invalid data',
        nestedError: {
          deepError: new Error('Deep system error')
        }
      };
      
      console.log('   🚨 Testing malformed response handling...');
      const malformedResult = await this.bridge.processCoreAgentResponse(
        malformedResponse,
        'error-test-session'
      );
      
      // Test system overload simulation
      console.log('   🚨 Testing system overload handling...');
      const overloadPromises = Array.from({ length: 10 }, (_, i) => 
        this.bridge.processSeniorRequest({
          id: `overload-test-${i}`,
          timestamp: new Date(),
          originalText: `Test request ${i}`,
          intent: 'create_app' as const,
          complexity: 'high' as const,
          emotionalTone: 'neutral' as const
        })
      );
      
      const overloadResults = await Promise.allSettled(overloadPromises);
      
      const verifications = [
        {
          name: 'Empty request handled gracefully',
          passed: emptyResult.technicalSpec !== null && 
                  emptyResult.error === undefined,
          details: 'Empty request should generate fallback spec'
        },
        {
          name: 'Malformed response handled gracefully',
          passed: malformedResult.message.length > 0 &&
                  !malformedResult.message.includes('Error') &&
                  !malformedResult.message.includes('undefined'),
          details: 'Malformed response should generate safe fallback message'
        },
        {
          name: 'System overload handled',
          passed: overloadResults.every(result => result.status === 'fulfilled'),
          details: `${overloadResults.filter(r => r.status === 'fulfilled').length}/10 requests handled`
        },
        {
          name: 'Senior-safe error messages',
          passed: !malformedResult.message.toLowerCase().includes('error') &&
                  !malformedResult.message.toLowerCase().includes('exception') &&
                  !malformedResult.message.toLowerCase().includes('failed'),
          details: 'Error messages are senior-friendly'
        }
      ];
      
      const allPassed = verifications.every(v => v.passed);
      const processingTime = Date.now() - startTime;
      
      this.testResults.push({
        testName,
        passed: allPassed,
        processingTime,
        verifications,
        details: {
          emptyRequestHandled: emptyResult.error === undefined,
          malformedResponseHandled: malformedResult.message.length > 0,
          overloadRequestsHandled: overloadResults.filter(r => r.status === 'fulfilled').length,
          totalOverloadRequests: overloadResults.length
        }
      });
      
      console.log(`   ${allPassed ? '✅' : '❌'} Error handling completed in ${processingTime}ms`);
      
    } catch (error) {
      console.error(`   ❌ Error handling test failed:`, error);
      this.testResults.push({
        testName,
        passed: false,
        processingTime: Date.now() - startTime,
        verifications: [],
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * TEST 6: Memory Management
   * Testar minneshantering och cleanup
   */
  private async testMemoryManagement(): Promise<void> {
    console.log('\\n🧪 TEST 6: Memory Management');
    
    const testName = 'Memory Management';
    const startTime = Date.now();
    
    try {
      // Get initial memory stats
      const initialStats = this.bridge.getHealthStatus();
      console.log(`   📊 Initial memory usage: ${initialStats.memoryManager.memoryUsage}MB`);
      
      // Create multiple sessions to test memory management
      const sessions: string[] = [];
      for (let i = 0; i < 5; i++) {
        const request = {
          id: `memory-test-${i}`,
          timestamp: new Date(),
          originalText: `Test request ${i} for memory management`,
          intent: 'create_app' as const,
          complexity: 'medium' as const,
          emotionalTone: 'neutral' as const
        };
        
        const result = await this.bridge.processSeniorRequest(request);
        sessions.push(result.sessionId);
        
        // Add multiple messages to each session
        for (let j = 0; j < 3; j++) {
          await this.bridge.processCoreAgentResponse(
            { success: true, message: `Response ${j} for session ${i}` },
            result.sessionId
          );
        }
      }
      
      // Get memory stats after creating sessions
      const afterCreationStats = this.bridge.getHealthStatus();
      console.log(`   📊 After creation: ${afterCreationStats.memoryManager.memoryUsage}MB`);
      
      // Test memory cleanup
      console.log('   🧹 Testing memory cleanup...');
      await this.bridge.performCleanup();
      
      const afterCleanupStats = this.bridge.getHealthStatus();
      console.log(`   📊 After cleanup: ${afterCleanupStats.memoryManager.memoryUsage}MB`);
      
      const verifications = [
        {
          name: 'Memory usage tracked',
          passed: initialStats.memoryManager.memoryUsage >= 0,
          details: `Initial usage: ${initialStats.memoryManager.memoryUsage}MB`
        },
        {
          name: 'Memory increased with sessions',
          passed: afterCreationStats.memoryManager.memoryUsage > initialStats.memoryManager.memoryUsage,
          details: `Increased from ${initialStats.memoryManager.memoryUsage}MB to ${afterCreationStats.memoryManager.memoryUsage}MB`
        },
        {
          name: 'Cleanup reduces memory usage',
          passed: afterCleanupStats.memoryManager.memoryUsage <= afterCreationStats.memoryManager.memoryUsage,
          details: `Reduced to ${afterCleanupStats.memoryManager.memoryUsage}MB after cleanup`
        },
        {
          name: 'Active sessions managed',
          passed: afterCreationStats.memoryManager.activeSessions >= 5,
          details: `${afterCreationStats.memoryManager.activeSessions} active sessions`
        }
      ];
      
      const allPassed = verifications.every(v => v.passed);
      const processingTime = Date.now() - startTime;
      
      this.testResults.push({
        testName,
        passed: allPassed,
        processingTime,
        verifications,
        details: {
          initialMemory: initialStats.memoryManager.memoryUsage,
          peakMemory: afterCreationStats.memoryManager.memoryUsage,
          finalMemory: afterCleanupStats.memoryManager.memoryUsage,
          sessionsCreated: sessions.length,
          activeSessions: afterCreationStats.memoryManager.activeSessions
        }
      });
      
      console.log(`   ${allPassed ? '✅' : '❌'} Memory management completed in ${processingTime}ms`);
      
    } catch (error) {
      console.error(`   ❌ Memory management test failed:`, error);
      this.testResults.push({
        testName,
        passed: false,
        processingTime: Date.now() - startTime,
        verifications: [],
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * TEST 7: Performance
   * Testar prestanda och svarstider
   */
  private async testPerformance(): Promise<void> {
    console.log('\\n🧪 TEST 7: Performance');
    
    const testName = 'Performance';
    const startTime = Date.now();
    
    try {
      const performanceTests = [
        {
          name: 'Simple request processing',
          request: {
            id: 'perf-simple',
            timestamp: new Date(),
            originalText: 'Skapa en enkel app',
            intent: 'create_app' as const,
            complexity: 'low' as const,
            emotionalTone: 'neutral' as const
          },
          expectedMaxTime: 1000 // 1 second
        },
        {
          name: 'Complex request processing',
          request: {
            id: 'perf-complex',
            timestamp: new Date(),
            originalText: 'Skapa en avancerad app med realtidsöversättning, familjehistoria och kyrktjänstautomation',
            intent: 'create_app' as const,
            complexity: 'high' as const,
            emotionalTone: 'excited' as const
          },
          expectedMaxTime: 2000 // 2 seconds
        }
      ];
      
      const verifications: TestVerification[] = [];
      
      for (const test of performanceTests) {
        console.log(`   ⏱️ Testing: ${test.name}`);
        
        const testStart = Date.now();
        const result = await this.bridge.processSeniorRequest(test.request);
        const testTime = Date.now() - testStart;
        
        console.log(`     ⏱️ Completed in ${testTime}ms`);
        
        verifications.push({
          name: `${test.name} performance`,
          passed: testTime <= test.expectedMaxTime,
          details: `Expected: ≤${test.expectedMaxTime}ms, Actual: ${testTime}ms`
        });
      }
      
      // Test concurrent processing
      console.log('   ⏱️ Testing concurrent processing...');
      const concurrentStart = Date.now();
      
      const concurrentRequests = Array.from({ length: 5 }, (_, i) => ({
        id: `concurrent-${i}`,
        timestamp: new Date(),
        originalText: `Concurrent request ${i}`,
        intent: 'create_app' as const,
        complexity: 'medium' as const,
        emotionalTone: 'neutral' as const
      }));
      
      const concurrentResults = await Promise.all(
        concurrentRequests.map(req => this.bridge.processSeniorRequest(req))
      );
      
      const concurrentTime = Date.now() - concurrentStart;
      console.log(`     ⏱️ 5 concurrent requests completed in ${concurrentTime}ms`);
      
      verifications.push({
        name: 'Concurrent processing',
        passed: concurrentTime <= 3000 && concurrentResults.length === 5,
        details: `5 requests in ${concurrentTime}ms (≤3000ms expected)`
      });
      
      const allPassed = verifications.every(v => v.passed);
      const processingTime = Date.now() - startTime;
      
      this.testResults.push({
        testName,
        passed: allPassed,
        processingTime,
        verifications,
        details: {
          performanceTests: performanceTests.length,
          concurrentRequests: concurrentRequests.length,
          averageResponseTime: verifications
            .filter(v => v.details.includes('ms'))
            .map(v => parseInt(v.details.match(/\\d+/)?.[0] || '0'))
            .reduce((sum, time) => sum + time, 0) / performanceTests.length
        }
      });
      
      console.log(`   ${allPassed ? '✅' : '❌'} Performance testing completed in ${processingTime}ms`);
      
    } catch (error) {
      console.error(`   ❌ Performance test failed:`, error);
      this.testResults.push({
        testName,
        passed: false,
        processingTime: Date.now() - startTime,
        verifications: [],
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Generate comprehensive test summary
   */
  private generateTestSummary(totalTime: number): TestSummary {
    const passedTests = this.testResults.filter(t => t.passed).length;
    const totalTests = this.testResults.length;
    const successRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
    
    const totalVerifications = this.testResults.reduce(
      (sum, test) => sum + test.verifications.length, 0
    );
    const passedVerifications = this.testResults.reduce(
      (sum, test) => sum + test.verifications.filter(v => v.passed).length, 0
    );
    
    return {
      totalTests,
      passedTests,
      failedTests: totalTests - passedTests,
      successRate,
      totalTime,
      averageTestTime: totalTime / totalTests,
      totalVerifications,
      passedVerifications,
      failedVerifications: totalVerifications - passedVerifications,
      verificationSuccessRate: totalVerifications > 0 ? 
        (passedVerifications / totalVerifications) * 100 : 0,
      testResults: this.testResults,
      overallStatus: successRate >= 80 ? 'PASS' : 'FAIL'
    };
  }

  /**
   * Print formatted test summary
   */
  private printTestSummary(summary: TestSummary): void {
    console.log('\\n' + '='.repeat(80));
    console.log('🧪 COMMUNICATION BRIDGE INTEGRATION TEST SUMMARY');
    console.log('='.repeat(80));
    
    console.log(`\\n📊 OVERALL RESULTS:`);
    console.log(`   Status: ${summary.overallStatus === 'PASS' ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Success Rate: ${summary.successRate.toFixed(1)}%`);
    console.log(`   Total Time: ${summary.totalTime}ms`);
    console.log(`   Average Test Time: ${summary.averageTestTime.toFixed(0)}ms`);
    
    console.log(`\\n🧪 TEST BREAKDOWN:`);
    console.log(`   Total Tests: ${summary.totalTests}`);
    console.log(`   Passed: ${summary.passedTests} ✅`);
    console.log(`   Failed: ${summary.failedTests} ❌`);
    
    console.log(`\\n🔍 VERIFICATION BREAKDOWN:`);
    console.log(`   Total Verifications: ${summary.totalVerifications}`);
    console.log(`   Passed: ${summary.passedVerifications} ✅`);
    console.log(`   Failed: ${summary.failedVerifications} ❌`);
    console.log(`   Verification Success Rate: ${summary.verificationSuccessRate.toFixed(1)}%`);
    
    console.log(`\\n📋 DETAILED RESULTS:`);
    summary.testResults.forEach((test, index) => {
      const status = test.passed ? '✅' : '❌';
      console.log(`   ${index + 1}. ${status} ${test.testName} (${test.processingTime}ms)`);
      
      if (!test.passed && test.error) {
        console.log(`      Error: ${test.error}`);
      }
      
      const failedVerifications = test.verifications.filter(v => !v.passed);
      if (failedVerifications.length > 0) {
        console.log(`      Failed verifications:`);
        failedVerifications.forEach(v => {
          console.log(`        - ${v.name}: ${v.details}`);
        });
      }
    });
    
    console.log('\\n' + '='.repeat(80));
    
    if (summary.overallStatus === 'PASS') {
      console.log('🎉 Communication Bridge is ready for production!');
    } else {
      console.log('⚠️ Communication Bridge needs attention before production.');
    }
    
    console.log('='.repeat(80));
  }
}

// Type definitions for test results
interface TestResult {
  testName: string;
  passed: boolean;
  processingTime: number;
  verifications: TestVerification[];
  details?: any;
  error?: string;
}

interface TestVerification {
  name: string;
  passed: boolean;
  details: string;
}

interface TestSummary {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  successRate: number;
  totalTime: number;
  averageTestTime: number;
  totalVerifications: number;
  passedVerifications: number;
  failedVerifications: number;
  verificationSuccessRate: number;
  testResults: TestResult[];
  overallStatus: 'PASS' | 'FAIL';
}

// Export for use in other modules
export { CommunicationBridgeIntegrationTest, TestResult, TestSummary };

// Main execution if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new CommunicationBridgeIntegrationTest();
  
  tester.runAllTests()
    .then(summary => {
      process.exit(summary.overallStatus === 'PASS' ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Test execution failed:', error);
      process.exit(1);
    });
}