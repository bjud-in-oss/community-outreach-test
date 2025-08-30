// MASTER PLAN 2.0: Phase Visualizer Component
// STATUS: Jules Senior Cockpit Implementation - Visual Progress
// INTEGRATION: Conscious Agent - Senior-friendly Phase Display
// ARCHITECTURE: Dual Consciousness Architecture compliant

import React from 'react';
import { Phase, PhaseStatus } from '../types/SeniorCockpitTypes';

/**
 * JULES PHASE VISUALIZER
 * 
 * Visuell representation av Crawl/Walk/Run/Fly faserna
 * för seniorer. Döljer teknisk komplexitet och visar
 * framsteg på ett intuitivt sätt.
 */

interface PhaseVisualizerProps {
  currentPhase: Phase;
  phaseStatus?: PhaseStatus;
  showDetails?: boolean;
  className?: string;
}

const PHASE_CONFIG = {
  Crawl: {
    emoji: '🐣',
    title: 'Crawl - Grundläggande',
    description: 'Vi bygger fundamentet för ditt projekt',
    color: 'bg-blue-100 border-blue-300 text-blue-800',
    progressColor: 'bg-blue-500'
  },
  Walk: {
    emoji: '🚶‍♂️',
    title: 'Walk - Funktionell',
    description: 'Systemet börjar förstå och utföra uppgifter',
    color: 'bg-green-100 border-green-300 text-green-800',
    progressColor: 'bg-green-500'
  },
  Run: {
    emoji: '🏃‍♂️',
    title: 'Run - Användarvänlig',
    description: 'Systemet blir riktigt enkelt att använda',
    color: 'bg-orange-100 border-orange-300 text-orange-800',
    progressColor: 'bg-orange-500'
  },
  Fly: {
    emoji: '🚀',
    title: 'Fly - Intelligent',
    description: 'Systemet lär sig och förbättras själv',
    color: 'bg-purple-100 border-purple-300 text-purple-800',
    progressColor: 'bg-purple-500'
  }
};

export const PhaseVisualizer: React.FC<PhaseVisualizerProps> = ({
  currentPhase,
  phaseStatus,
  showDetails = true,
  className = ''
}) => {
  const phases: Phase[] = ['Crawl', 'Walk', 'Run', 'Fly'];
  const currentPhaseIndex = phases.indexOf(currentPhase);

  return (
    <div className={`senior-phase-visualizer ${className}`}>
      {/* Huvudtitel */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Projektets Framsteg
        </h2>
        <p className="text-gray-600">
          Vi följer en strukturerad process för att bygga ditt projekt
        </p>
      </div>

      {/* Fas-progression */}
      <div className="phase-progression mb-8">
        <div className="flex items-center justify-between mb-4">
          {phases.map((phase, index) => {
            const config = PHASE_CONFIG[phase];
            const isActive = phase === currentPhase;
            const isCompleted = index < currentPhaseIndex;
            const isFuture = index > currentPhaseIndex;

            return (
              <div key={phase} className="flex-1 relative">
                {/* Fas-cirkel */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl
                      transition-all duration-300 mb-2
                      ${isActive ? config.color : ''}
                      ${isCompleted ? 'bg-green-100 border-green-400 text-green-800' : ''}
                      ${isFuture ? 'bg-gray-100 border-gray-300 text-gray-500' : ''}
                    `}
                  >
                    {isCompleted ? '✅' : config.emoji}
                  </div>
                  
                  {/* Fas-namn */}
                  <div className="text-center">
                    <div className={`font-semibold text-sm ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
                      {phase}
                    </div>
                    <div className="text-xs text-gray-500 max-w-20">
                      {config.title.split(' - ')[1]}
                    </div>
                  </div>
                </div>

                {/* Förbindelselinje */}
                {index < phases.length - 1 && (
                  <div className="absolute top-8 left-full w-full h-1 -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`
                        h-full transition-all duration-300
                        ${isCompleted ? 'bg-green-400' : 'bg-gray-300'}
                      `}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Nuvarande fas-detaljer */}
      {showDetails && phaseStatus && (
        <div className={`current-phase-details p-6 rounded-lg border-2 ${PHASE_CONFIG[currentPhase].color}`}>
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{PHASE_CONFIG[currentPhase].emoji}</span>
            <div>
              <h3 className="text-xl font-bold">{PHASE_CONFIG[currentPhase].title}</h3>
              <p className="text-sm opacity-80">{phaseStatus.description}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Framsteg i denna fas</span>
              <span className="text-sm font-bold">{phaseStatus.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${PHASE_CONFIG[currentPhase].progressColor}`}
                style={{ width: `${phaseStatus.progress}%` }}
              />
            </div>
          </div>

          {/* Milstones */}
          {phaseStatus.keyMilestones && phaseStatus.keyMilestones.length > 0 && (
            <div className="milestones">
              <h4 className="font-semibold mb-3 text-sm">Viktiga milstones:</h4>
              <div className="space-y-2">
                {phaseStatus.keyMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {milestone.completed ? (
                        <span className="text-green-600 text-lg">✅</span>
                      ) : (
                        <span className="text-gray-400 text-lg">⏳</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${milestone.completed ? 'text-green-800' : 'text-gray-700'}`}>
                        {milestone.title}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {milestone.description}
                      </div>
                      {milestone.completed && milestone.completedAt && (
                        <div className="text-xs text-green-600 mt-1">
                          Slutfört: {milestone.completedAt.toLocaleDateString('sv-SE')}
                        </div>
                      )}
                      {!milestone.completed && milestone.estimatedCompletion && (
                        <div className="text-xs text-gray-500 mt-1">
                          Beräknat klart: {milestone.estimatedCompletion}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tidsestimering */}
          {phaseStatus.estimatedDuration && (
            <div className="mt-4 p-3 bg-white bg-opacity-50 rounded">
              <div className="text-sm">
                <span className="font-medium">Beräknad tid för denna fas: </span>
                <span className="font-bold">{phaseStatus.estimatedDuration}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Uppmuntrande meddelande */}
      <div className="encouragement mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
        <div className="flex items-center">
          <span className="text-2xl mr-3">🌟</span>
          <div>
            <div className="font-semibold text-gray-800">Bra jobbat!</div>
            <div className="text-sm text-gray-600">
              {currentPhaseIndex === 0 && 'Vi har kommit igång bra med grundarbetet.'}
              {currentPhaseIndex === 1 && 'Systemet börjar ta form och bli funktionellt.'}
              {currentPhaseIndex === 2 && 'Nu blir det riktigt användarvänligt!'}
              {currentPhaseIndex === 3 && 'Fantastiskt! Systemet är nu intelligent och självförbättrande.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseVisualizer;