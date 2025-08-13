/**
 * PhaseIndicator - Visuell fas-progression med journey-map stil
 * Visar Crawl/Walk/Run/Fly som "Grundläggande Setup/Utveckling/Förbättring/Perfektion"
 */

import React, { useState, useEffect } from 'react';
import { SeniorDesignTokens } from '../SeniorDesignTokens';
import { PhaseIndicator as PhaseIndicatorType, PhaseStatus } from '../types/SeniorTypes';

interface PhaseIndicatorProps {
  phaseProgress: PhaseIndicatorType;
  onPhaseClick?: (phaseName: string) => void;
  className?: string;
  showAnimations?: boolean;
}

const Card = {
  backgroundColor: SeniorDesignTokens.colors.surface,
  borderRadius: SeniorDesignTokens.borderRadius.lg,
  padding: SeniorDesignTokens.spacing.xl,
  boxShadow: SeniorDesignTokens.shadows.md,
  border: `1px solid ${SeniorDesignTokens.colors.border}`,
  marginBottom: SeniorDesignTokens.spacing.lg
};

const SectionTitle = {
  fontSize: SeniorDesignTokens.fontSize.large,
  color: SeniorDesignTokens.colors.primary,
  marginBottom: SeniorDesignTokens.spacing.md,
  marginTop: 0,
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  gap: SeniorDesignTokens.spacing.sm
};

const JourneyContainer = {
  position: 'relative' as const,
  padding: `${SeniorDesignTokens.spacing.lg} 0`
};

const JourneyPath = {
  position: 'absolute' as const,
  top: '50%',
  left: '10%',
  right: '10%',
  height: '4px',
  backgroundColor: SeniorDesignTokens.colors.border,
  borderRadius: SeniorDesignTokens.borderRadius.full,
  transform: 'translateY(-50%)',
  zIndex: 1
};

const JourneyProgress = {
  height: '100%',
  backgroundColor: SeniorDesignTokens.colors.success,
  borderRadius: SeniorDesignTokens.borderRadius.full,
  transition: `width ${SeniorDesignTokens.animation.duration.slow} ${SeniorDesignTokens.animation.easing.easeOut}`,
  position: 'relative' as const,
  overflow: 'hidden' as const
};

const PhaseContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  position: 'relative' as const,
  zIndex: 2,
  gap: SeniorDesignTokens.spacing.sm
};

const TotalProgressSection = {
  textAlign: 'center' as const,
  marginBottom: SeniorDesignTokens.spacing.xl,
  padding: SeniorDesignTokens.spacing.lg,
  backgroundColor: SeniorDesignTokens.colors.primaryLight,
  borderRadius: SeniorDesignTokens.borderRadius.md,
  border: `2px solid ${SeniorDesignTokens.colors.primary}`
};

const CurrentPhaseHighlight = {
  marginTop: SeniorDesignTokens.spacing.lg,
  padding: SeniorDesignTokens.spacing.lg,
  backgroundColor: SeniorDesignTokens.colors.successLight,
  borderRadius: SeniorDesignTokens.borderRadius.md,
  border: `2px solid ${SeniorDesignTokens.colors.success}`,
  textAlign: 'center' as const
};

export const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({
  phaseProgress,
  onPhaseClick,
  className,
  showAnimations = true
}) => {
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    if (showAnimations) {
      setAnimationDelay(500); // Delay för att visa animationer sekventiellt
    }
  }, [showAnimations]);

  const getPhaseIcon = (phase: PhaseStatus): string => {
    const icons = {
      'Crawl': '🌱', // Grundläggande Setup
      'Walk': '🚀', // Utveckling  
      'Run': '⭐', // Förbättring
      'Fly': '🏆'  // Perfektion
    };
    return icons[phase.name as keyof typeof icons] || '📍';
  };

  const getPhaseColor = (phase: PhaseStatus): string => {
    switch (phase.status) {
      case 'completed':
        return SeniorDesignTokens.colors.success;
      case 'active':
        return SeniorDesignTokens.colors.primary;
      case 'upcoming':
        return SeniorDesignTokens.colors.textMuted;
      default:
        return SeniorDesignTokens.colors.border;
    }
  };

  const getPhaseBackgroundColor = (phase: PhaseStatus): string => {
    switch (phase.status) {
      case 'completed':
        return SeniorDesignTokens.colors.successLight;
      case 'active':
        return SeniorDesignTokens.colors.primaryLight;
      case 'upcoming':
        return SeniorDesignTokens.colors.surface;
      default:
        return SeniorDesignTokens.colors.background;
    }
  };

  const calculateOverallProgress = (): number => {
    const totalPhases = phaseProgress.phases.length;
    const completedPhases = phaseProgress.phases.filter(p => p.status === 'completed').length;
    const activePhase = phaseProgress.phases.find(p => p.status === 'active');
    const activeProgress = activePhase ? activePhase.progress / 100 : 0;
    
    return Math.round(((completedPhases + activeProgress) / totalPhases) * 100);
  };

  const getEncouragingMessage = (progress: number): string => {
    if (progress >= 90) return "Nästan i mål! Du är fantastisk! 🎉";
    if (progress >= 75) return "Otroliga framsteg! Fortsätt så här! 🚀";
    if (progress >= 50) return "Halvvägs där! Du gör det bra! ⭐";
    if (progress >= 25) return "Bra start! Vi kommer långt tillsammans! 🌟";
    return "Resan har börjat! Spännande tider väntar! 🌱";
  };

  const getCurrentPhaseDescription = (): string => {
    const activePhase = phaseProgress.phases.find(p => p.status === 'active');
    if (activePhase) {
      return `Vi arbetar just nu med ${activePhase.displayName.toLowerCase()}. ${activePhase.description}`;
    }
    
    const nextPhase = phaseProgress.phases.find(p => p.status === 'upcoming');
    if (nextPhase) {
      return `Nästa steg blir ${nextPhase.displayName.toLowerCase()}. ${nextPhase.description}`;
    }
    
    return "Alla faser är slutförda! Fantastiskt arbete! 🎉";
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div style={Card} className={className}>
      {/* Huvudrubrik */}
      <h2 style={SectionTitle}>
        🚀 Vår Resa Tillsammans
      </h2>

      {/* Total framsteg */}
      <div style={TotalProgressSection}>
        <div style={{
          fontSize: SeniorDesignTokens.fontSize.xlarge,
          fontWeight: '700',
          color: SeniorDesignTokens.colors.primary,
          marginBottom: SeniorDesignTokens.spacing.sm
        }}>
          {overallProgress}% Klart
        </div>
        <div style={{
          fontSize: SeniorDesignTokens.fontSize.medium,
          color: SeniorDesignTokens.colors.text,
          marginBottom: SeniorDesignTokens.spacing.md
        }}>
          {getEncouragingMessage(overallProgress)}
        </div>
        
        {/* Total progress bar */}
        <div style={{
          width: '100%',
          height: '12px',
          backgroundColor: SeniorDesignTokens.colors.border,
          borderRadius: SeniorDesignTokens.borderRadius.full,
          overflow: 'hidden',
          margin: `${SeniorDesignTokens.spacing.md} 0`
        }}>
          <div style={{
            width: `${overallProgress}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${SeniorDesignTokens.colors.success}, ${SeniorDesignTokens.colors.primary})`,
            borderRadius: SeniorDesignTokens.borderRadius.full,
            transition: `width ${SeniorDesignTokens.animation.duration.slow} ${SeniorDesignTokens.animation.easing.easeOut}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Glimmer-effekt */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: showAnimations ? 'shimmer 3s ease-in-out infinite' : 'none'
            }} />
          </div>
        </div>
      </div>

      {/* Journey Map Visualisering */}
      <div style={JourneyContainer}>
        {/* Bakgrundslinje */}
        <div style={JourneyPath}>
          <div style={{
            ...JourneyProgress,
            width: `${(overallProgress / 100) * 80}%` // 80% för att inte täcka sista cirkeln
          }}>
            {/* Animated progress shimmer */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-50px',
              width: '50px',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              animation: showAnimations && overallProgress > 0 ? 'progressShimmer 2s ease-in-out infinite' : 'none'
            }} />
          </div>
        </div>

        {/* Fas-cirklar och information */}
        <div style={PhaseContainer}>
          {phaseProgress.phases.map((phase, index) => (
            <div
              key={phase.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                cursor: onPhaseClick ? 'pointer' : 'default',
                transition: `transform ${SeniorDesignTokens.animation.duration.normal} ${SeniorDesignTokens.animation.easing.easeOut}`,
                animation: showAnimations ? `fadeInUp 0.6s ease-out ${index * 0.2}s both` : 'none'
              }}
              onClick={() => onPhaseClick?.(phase.name)}
              onMouseEnter={(e) => {
                if (onPhaseClick) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (onPhaseClick) {
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {/* Fas-cirkel */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: getPhaseBackgroundColor(phase),
                border: `4px solid ${getPhaseColor(phase)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: SeniorDesignTokens.fontSize.xlarge,
                marginBottom: SeniorDesignTokens.spacing.md,
                position: 'relative',
                boxShadow: phase.status === 'active' ? SeniorDesignTokens.shadows.lg : SeniorDesignTokens.shadows.sm,
                transition: `all ${SeniorDesignTokens.animation.duration.normal} ${SeniorDesignTokens.animation.easing.easeOut}`
              }}>
                {phase.status === 'completed' ? '✅' : getPhaseIcon(phase)}
                
                {/* Pulsande effekt för aktiv fas */}
                {phase.status === 'active' && showAnimations && (
                  <div style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '-4px',
                    right: '-4px',
                    bottom: '-4px',
                    borderRadius: '50%',
                    border: `2px solid ${getPhaseColor(phase)}`,
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                )}
              </div>

              {/* Fas-namn */}
              <h3 style={{
                margin: 0,
                marginBottom: SeniorDesignTokens.spacing.sm,
                fontSize: SeniorDesignTokens.fontSize.medium,
                fontWeight: '600',
                color: getPhaseColor(phase),
                textAlign: 'center'
              }}>
                {phase.displayName}
              </h3>

              {/* Fas-beskrivning */}
              <p style={{
                margin: 0,
                fontSize: SeniorDesignTokens.fontSize.small,
                color: SeniorDesignTokens.colors.textSecondary,
                textAlign: 'center',
                lineHeight: '1.4',
                maxWidth: '120px'
              }}>
                {phase.description}
              </p>

              {/* Progress för aktiv fas */}
              {phase.status === 'active' && (
                <div style={{
                  marginTop: SeniorDesignTokens.spacing.sm,
                  fontSize: SeniorDesignTokens.fontSize.medium,
                  fontWeight: '700',
                  color: getPhaseColor(phase),
                  backgroundColor: getPhaseBackgroundColor(phase),
                  padding: `${SeniorDesignTokens.spacing.sm} ${SeniorDesignTokens.spacing.md}`,
                  borderRadius: SeniorDesignTokens.borderRadius.md,
                  border: `2px solid ${getPhaseColor(phase)}`
                }}>
                  {phase.progress}%
                </div>
              )}

              {/* Estimerad tid för kommande faser */}
              {phase.status === 'upcoming' && phase.estimatedCompletion && (
                <div style={{
                  marginTop: SeniorDesignTokens.spacing.sm,
                  fontSize: SeniorDesignTokens.fontSize.small,
                  color: SeniorDesignTokens.colors.textMuted,
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  {phase.estimatedCompletion}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Aktuell fas-information */}
      <div style={CurrentPhaseHighlight}>
        <h3 style={{
          margin: 0,
          marginBottom: SeniorDesignTokens.spacing.sm,
          fontSize: SeniorDesignTokens.fontSize.medium,
          fontWeight: '600',
          color: SeniorDesignTokens.colors.success,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: SeniorDesignTokens.spacing.sm
        }}>
          🎯 Just nu
        </h3>
        <p style={{
          margin: 0,
          fontSize: SeniorDesignTokens.fontSize.medium,
          lineHeight: '1.6',
          color: SeniorDesignTokens.colors.text
        }}>
          {getCurrentPhaseDescription()}
        </p>
      </div>

      {/* CSS Animationer */}
      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes progressShimmer {
          0% { left: -50px; }
          100% { left: 100%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Responsiv design för mindre skärmar */
        @media (max-width: 768px) {
          .phase-container {
            flex-direction: column;
            gap: 2rem;
          }
          
          .journey-path {
            display: none; /* Dölj linjen på mobil */
          }
          
          .phase-circle {
            width: 100px !important;
            height: 100px !important;
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PhaseIndicator;