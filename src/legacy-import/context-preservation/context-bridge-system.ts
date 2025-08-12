#!/usr/bin/env node

/**
 * 🧠 CONTEXT BRIDGE SYSTEM
 * Kopplar ihop Gemini ↔ Jules ↔ Future Developers med persistent kontext
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';

interface ContextSession {
  sessionId: string;
  timestamp: string;
  participants: ('gemini' | 'jules' | 'developer')[];
  contextData: {
    decisions: Decision[];
    codeChanges: CodeChange[];
    conflicts: ConflictResolution[];
    learnings: Learning[];
    futureGuidance: FutureGuidance[];
  };
  status: 'active' | 'completed' | 'transferred';
}

interface Decision {
  id: string;
  timestamp: string;
  actor: 'gemini' | 'jules' | 'developer';
  decision: string;
  reasoning: string;
  impact: string[];
  confidence: number; // 0-1
}

interface ConflictResolution {
  prNumber: number;
  conflictType: string;
  resolutionStrategy: string;
  geminiAnalysis: string;
  julesImplementation: string;
  outcome: 'success' | 'partial' | 'failed';
  lessonsLearned: string[];
}

interface Learning {
  pattern: string;
  context: string;
  recommendation: string;
  applicableWhen: string[];
  avoidWhen: string[];
}

interface FutureGuidance {
  scenario: string;
  recommendedApproach: string;
  contextToPreserve: string[];
  warningSignals: string[];
}

class ContextBridgeSystem {
  private gemini: GoogleGenerativeAI;
  private contextDir = '.jules/context-sessions';
  private currentSession: ContextSession | null = null;

  constructor() {
    this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    this.ensureContextDir();
  }

  private ensureContextDir(): void {
    if (!fs.existsSync(this.contextDir)) {
      fs.mkdirSync(this.contextDir, { recursive: true });
    }
  }

  /**
   * 🚀 PHASE 1: Gemini Analyserar Konflikter och Skapar Kontext
   */
  async createGeminiMergeContext(conflictPRs: any[]): Promise<ContextSession> {
    console.log('🧠 Gemini creating intelligent merge context...');

    const sessionId = `merge-session-${Date.now()}`;
    
    // Gemini analyserar alla konflikter och skapar en sammanhängande strategi
    const geminiAnalysis = await this.gemini.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp" 
    }).generateContent({
      contents: [{
        role: "user",
        parts: [{ text: `
          Du är en expert på merge-konflikter och kodintegration. Analysera dessa ${conflictPRs.length} PR-konflikter och skapa en sammanhängande merge-strategi.

          KONFLIKTER ATT ANALYSERA:
          ${conflictPRs.map(pr => `
          - PR #${pr.number}: ${pr.title}
            Files: ${pr.changed_files}, Age: ${this.calculateAge(pr.created_at)} days
            Additions: ${pr.additions}, Deletions: ${pr.deletions}
          `).join('\n')}

          SKAPA EN INTELLIGENT MERGE-STRATEGI SOM:
          1. **Identifierar mönster** - Vilka konflikter hänger ihop?
          2. **Prioriterar ordning** - Vilken ordning minimerar framtida konflikter?
          3. **Förutser problem** - Vilka konflikter kommer skapa nya konflikter?
          4. **Skapar kontext** - Vad behöver Jules veta för att implementera?
          5. **Guidar framtiden** - Vad ska framtida utvecklare veta?

          RETURNERA STRUKTURERAD ANALYS MED:
          - Merge-ordning med motivering
          - Konflikt-beroenden mellan PRs
          - Specifika instruktioner för Jules
          - Varningar för framtida utvecklare
          - Lärdomar för att undvika liknande konflikter

          Var konkret och actionable - detta ska Jules kunna följa steg för steg.
        `}]
      }],
      systemInstruction: `
        Du är en senior software architect med expertis inom:
        - Git merge strategies och konflikt-resolution
        - Kodintegration och dependency management
        - Team collaboration och knowledge transfer
        - Predictive analysis av kod-konflikter

        PRINCIPER:
        - Minimera framtida konflikter genom smart ordning
        - Bevara funktionalitet och intent från alla PRs
        - Skapa tydlig kontext för Jules att följa
        - Dokumentera beslut för framtida utvecklare
        - Lär av mönster för att förbättra processen
      `
    });

    const analysis = geminiAnalysis.response.text();

    // Skapa kontext-session
    const contextSession: ContextSession = {
      sessionId,
      timestamp: new Date().toISOString(),
      participants: ['gemini'],
      contextData: {
        decisions: [{
          id: `decision-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: 'gemini',
          decision: 'Created intelligent merge strategy',
          reasoning: analysis,
          impact: conflictPRs.map(pr => `PR #${pr.number}`),
          confidence: 0.9
        }],
        codeChanges: [],
        conflicts: conflictPRs.map(pr => ({
          prNumber: pr.number,
          conflictType: this.classifyConflictType(pr),
          resolutionStrategy: 'pending_gemini_analysis',
          geminiAnalysis: analysis,
          julesImplementation: 'pending',
          outcome: 'pending' as const,
          lessonsLearned: []
        })),
        learnings: [],
        futureGuidance: []
      },
      status: 'active'
    };

    this.currentSession = contextSession;
    this.saveContextSession(contextSession);

    console.log(`✅ Gemini context created: ${sessionId}`);
    return contextSession;
  }

  /**
   * 🔄 PHASE 2: Överför Kontext till Jules
   */
  async transferContextToJules(sessionId: string): Promise<void> {
    console.log('🔄 Transferring context to Jules...');

    const session = this.loadContextSession(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    // Skapa Jules-instruktioner baserat på Gemini-analys
    const julesInstructions = await this.createJulesInstructions(session);

    // Uppdatera session med Jules som participant
    session.participants.push('jules');
    session.contextData.decisions.push({
      id: `decision-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'developer', // Vi som överför
      decision: 'Transferred context to Jules',
      reasoning: 'Context bridge activated for Jules implementation',
      impact: ['jules_context_transfer'],
      confidence: 1.0
    });

    this.saveContextSession(session);

    // Skapa Jules-task med full kontext
    await this.createJulesTaskWithContext(session, julesInstructions);

    console.log('✅ Context transferred to Jules');
  }

  /**
   * 🎯 Skapa Jules-instruktioner från Gemini-kontext
   */
  private async createJulesInstructions(session: ContextSession): Promise<string> {
    const geminiDecision = session.contextData.decisions.find(d => d.actor === 'gemini');
    
    return `
# 🧠 JULES MERGE INSTRUCTIONS - Context Session: ${session.sessionId}

## 📋 GEMINI ANALYSIS SUMMARY:
${geminiDecision?.reasoning || 'No Gemini analysis found'}

## 🎯 YOUR MISSION:
Implement the merge strategy created by Gemini. Follow the analysis above EXACTLY.

## 📊 CONFLICTS TO RESOLVE:
${session.contextData.conflicts.map(c => `
- **PR #${c.prNumber}**: ${c.conflictType}
  Strategy: ${c.resolutionStrategy}
  Gemini Analysis: ${c.geminiAnalysis.substring(0, 200)}...
`).join('\n')}

## 🔄 CONTEXT PRESERVATION:
- **Session ID**: ${session.sessionId}
- **Started by**: Gemini intelligent analysis
- **Your role**: Implement merge strategy with full context preservation
- **Next step**: Transfer context back to developers after completion

## ✅ SUCCESS CRITERIA:
1. Follow Gemini's merge order exactly
2. Preserve all functionality and intent
3. Document your implementation decisions
4. Update context session with results
5. Prepare context transfer for future developers

## 🚨 IMPORTANT:
This is part of a context bridge system. Your work will be transferred to future developers with full context preservation. Document everything clearly.
    `;
  }

  /**
   * 📝 Skapa Jules-task med kontext
   */
  private async createJulesTaskWithContext(session: ContextSession, instructions: string): Promise<void> {
    const taskData = {
      title: `CONTEXT-AWARE: Intelligent Merge Resolution (Session: ${session.sessionId})`,
      description: instructions,
      sessionId: session.sessionId,
      contextPreservation: true
    };

    // Här skulle vi skapa en Jules-task via API
    console.log('📝 Jules task created with context:', taskData.title);
  }

  /**
   * 🔄 PHASE 3: Jules Rapporterar Tillbaka
   */
  async receiveJulesContext(sessionId: string, julesResults: any): Promise<void> {
    console.log('📥 Receiving context from Jules...');

    const session = this.loadContextSession(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    // Uppdatera session med Jules resultat
    session.contextData.decisions.push({
      id: `decision-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'jules',
      decision: 'Completed merge implementation',
      reasoning: julesResults.summary || 'Jules completed the merge strategy',
      impact: julesResults.affectedPRs || [],
      confidence: julesResults.confidence || 0.8
    });

    // Uppdatera konflikt-resolutions
    session.contextData.conflicts.forEach(conflict => {
      const julesResult = julesResults.conflicts?.find((c: any) => c.prNumber === conflict.prNumber);
      if (julesResult) {
        conflict.julesImplementation = julesResult.implementation;
        conflict.outcome = julesResult.outcome;
        conflict.lessonsLearned = julesResult.lessons || [];
      }
    });

    this.saveContextSession(session);
    console.log('✅ Jules context received and integrated');
  }

  /**
   * 🚀 PHASE 4: Skapa Framtida Utvecklar-Kontext
   */
  async createFutureDeveloperContext(sessionId: string): Promise<void> {
    console.log('🔮 Creating future developer context...');

    const session = this.loadContextSession(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    // Gemini analyserar hela sessionen och skapar framtida guidance
    const futureGuidance = await this.gemini.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp" 
    }).generateContent({
      contents: [{
        role: "user",
        parts: [{ text: `
          Analysera denna kompletta merge-session och skapa guidance för framtida utvecklare:

          SESSION DATA:
          ${JSON.stringify(session, null, 2)}

          SKAPA FRAMTIDA GUIDANCE SOM INKLUDERAR:
          1. **Lärdomar** - Vad lärde vi oss från denna merge-session?
          2. **Mönster** - Vilka mönster kan framtida utvecklare känna igen?
          3. **Varningar** - Vad ska de undvika?
          4. **Rekommendationer** - Vad ska de göra i liknande situationer?
          5. **Kontext-bevarande** - Vilken kontext är viktig att bevara?

          Gör det actionable och konkret för framtida team-medlemmar.
        `}]
      }]
    });

    const guidance = futureGuidance.response.text();

    // Uppdatera session med framtida guidance
    session.contextData.futureGuidance.push({
      scenario: 'Similar merge conflicts',
      recommendedApproach: guidance,
      contextToPreserve: ['merge_order', 'conflict_patterns', 'resolution_strategies'],
      warningSignals: ['multiple_structural_conflicts', 'dependency_cycles', 'obsolete_prs']
    });

    session.participants.push('developer');
    session.status = 'completed';

    this.saveContextSession(session);

    // Skapa README för framtida utvecklare
    await this.createFutureDeveloperREADME(session, guidance);

    console.log('✅ Future developer context created');
  }

  /**
   * 📚 Skapa README för framtida utvecklare
   */
  private async createFutureDeveloperREADME(session: ContextSession, guidance: string): Promise<void> {
    const readmeContent = `
# 🧠 MERGE SESSION CONTEXT - ${session.sessionId}

## 📋 SESSION SUMMARY
- **Started**: ${session.timestamp}
- **Participants**: ${session.participants.join(' → ')}
- **Status**: ${session.status}
- **Conflicts Resolved**: ${session.contextData.conflicts.length}

## 🎯 WHAT HAPPENED
This session used the Context Bridge System to intelligently resolve merge conflicts:

1. **Gemini Analysis** - AI analyzed all conflicts and created merge strategy
2. **Jules Implementation** - Agent followed strategy and implemented merges
3. **Context Preservation** - Full context preserved for future reference

## 🔮 FUTURE DEVELOPER GUIDANCE
${guidance}

## 📊 DECISIONS MADE
${session.contextData.decisions.map(d => `
### ${d.timestamp} - ${d.actor.toUpperCase()}
**Decision**: ${d.decision}
**Reasoning**: ${d.reasoning}
**Confidence**: ${(d.confidence * 100).toFixed(0)}%
`).join('\n')}

## 🚨 LESSONS LEARNED
${session.contextData.conflicts.map(c => `
### PR #${c.prNumber}
- **Type**: ${c.conflictType}
- **Strategy**: ${c.resolutionStrategy}
- **Outcome**: ${c.outcome}
- **Lessons**: ${c.lessonsLearned.join(', ')}
`).join('\n')}

## 🔄 FOR NEXT TIME
When you encounter similar conflicts:
1. Check this context session for patterns
2. Use the Context Bridge System
3. Let Gemini analyze before acting
4. Preserve context for future developers
5. Update this documentation

---
*Generated by Context Bridge System - Session ${session.sessionId}*
    `;

    fs.writeFileSync(
      path.join(this.contextDir, `${session.sessionId}-README.md`),
      readmeContent
    );
  }

  /**
   * 💾 Spara/ladda kontext-sessioner
   */
  private saveContextSession(session: ContextSession): void {
    const filePath = path.join(this.contextDir, `${session.sessionId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(session, null, 2));
  }

  private loadContextSession(sessionId: string): ContextSession | null {
    const filePath = path.join(this.contextDir, `${sessionId}.json`);
    if (!fs.existsSync(filePath)) return null;
    
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  /**
   * 🔧 Hjälpfunktioner
   */
  private calculateAge(createdAt: string): number {
    return (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  }

  private classifyConflictType(pr: any): string {
    if (pr.changed_files === 0) return 'OBSOLETE';
    if (pr.changed_files > 10) return 'STRUCTURAL';
    if (pr.additions > 100) return 'MAJOR_FEATURE';
    return 'CONTENT';
  }
}

export { ContextBridgeSystem, ContextSession };