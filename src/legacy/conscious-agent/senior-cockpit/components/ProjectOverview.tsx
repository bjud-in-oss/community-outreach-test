/**
 * ProjectOverview - Dedikerad komponent för projektöversikt
 * Visar projektinformation på ett senior-vänligt sätt utan teknisk komplexitet
 */

import React, { useState } from 'react';
import { SeniorDesignTokens } from '../SeniorDesignTokens';
import { ProjectSummary } from '../types/SeniorTypes';

interface ProjectOverviewProps {
  projectSummary: ProjectSummary;
  onDetailsToggle?: (expanded: boolean) => void;
  className?: string;
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

const ProjectTitle = {
  fontSize: SeniorDesignTokens.fontSize.xlarge,
  marginBottom: SeniorDesignTokens.spacing.sm,
  marginTop: 0,
  fontWeight: '600',
  color: SeniorDesignTokens.colors.text,
  lineHeight: '1.2'
};

const Description = {
  marginBottom: SeniorDesignTokens.spacing.lg,
  lineHeight: '1.7',
  fontSize: SeniorDesignTokens.fontSize.medium,
  color: SeniorDesignTokens.colors.text
};

const ProgressSection = {
  marginBottom: SeniorDesignTokens.spacing.lg,
  padding: SeniorDesignTokens.spacing.lg,
  backgroundColor: SeniorDesignTokens.colors.background,
  borderRadius: SeniorDesignTokens.borderRadius.md,
  border: `2px solid ${SeniorDesignTokens.colors.primaryLight}`
};

const ProgressHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: SeniorDesignTokens.spacing.md
};

const ProgressLabel = {
  fontWeight: '600',
  fontSize: SeniorDesignTokens.fontSize.medium,
  color: SeniorDesignTokens.colors.text
};

const ProgressValue = {
  fontSize: SeniorDesignTokens.fontSize.xlarge,
  fontWeight: '700',
  color: SeniorDesignTokens.colors.success,
  display: 'flex',
  alignItems: 'center',
  gap: SeniorDesignTokens.spacing.sm
};

const ProgressBar = {
  width: '100%',
  height: '16px',
  backgroundColor: SeniorDesignTokens.colors.border,
  borderRadius: SeniorDesignTokens.borderRadius.full,
  overflow: 'hidden' as const,
  position: 'relative' as const
};

const NextStepsSection = {
  padding: SeniorDesignTokens.spacing.lg,
  backgroundColor: SeniorDesignTokens.colors.infoLight,
  borderRadius: SeniorDesignTokens.borderRadius.md,
  border: `2px solid ${SeniorDesignTokens.colors.info}`,
  marginTop: SeniorDesignTokens.spacing.lg
};

const ToggleButton = {
  backgroundColor: 'transparent',
  border: `2px solid ${SeniorDesignTokens.colors.primary}`,
  color: SeniorDesignTokens.colors.primary,
  padding: `${SeniorDesignTokens.spacing.sm} ${SeniorDesignTokens.spacing.md}`,
  borderRadius: SeniorDesignTokens.borderRadius.md,
  fontSize: SeniorDesignTokens.fontSize.medium,
  fontWeight: '600',
  cursor: 'pointer',
  minHeight: SeniorDesignTokens.spacing.touch,
  transition: `all ${SeniorDesignTokens.animation.duration.normal} ${SeniorDesignTokens.animation.easing.easeOut}`,
  marginTop: SeniorDesignTokens.spacing.md
};

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  projectSummary,
  onDetailsToggle,
  className
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleDetails = () => {
    setIsAnimating(true);
    const newState = !showDetails;
    setShowDetails(newState);
    onDetailsToggle?.(newState);
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getProgressMessage = (progress: number): string => {
    if (progress >= 90) return "Nästan klart! 🎉";
    if (progress >= 75) return "Fantastiska framsteg! 🚀";
    if (progress >= 50) return "Vi kommer långt! 💪";
    if (progress >= 25) return "Bra början! ⭐";
    return "Vi har startat resan! 🌟";
  };

  const getProgressColor = (progress: number): string => {
    if (progress >= 75) return SeniorDesignTokens.colors.success;
    if (progress >= 50) return SeniorDesignTokens.colors.info;
    if (progress >= 25) return SeniorDesignTokens.colors.warning;
    return SeniorDesignTokens.colors.primary;
  };

  const formatLastUpdate = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Uppdaterat just nu";
    if (diffInHours < 24) return `Uppdaterat för ${diffInHours} timme${diffInHours > 1 ? 'r' : ''} sedan`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Uppdaterat igår";
    if (diffInDays < 7) return `Uppdaterat för ${diffInDays} dagar sedan`;
    
    return date.toLocaleDateString('sv-SE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={Card} className={className}>
      {/* Huvudrubrik */}
      <h2 style={SectionTitle}>
        📊 Ditt Projekt
      </h2>

      {/* Projekttitel */}
      <h3 style={ProjectTitle}>
        {projectSummary.title}
      </h3>

      {/* Projektbeskrivning */}
      <p style={Description}>
        {projectSummary.description}
      </p>

      {/* Framstegsinformation */}
      <div style={ProgressSection}>
        <div style={ProgressHeader}>
          <span style={ProgressLabel}>Framsteg:</span>
          <div style={ProgressValue}>
            <span>{projectSummary.overallProgress}%</span>
            <span style={{ fontSize: SeniorDesignTokens.fontSize.medium }}>
              {projectSummary.overallProgress >= 75 ? '🎉' : 
               projectSummary.overallProgress >= 50 ? '🚀' : 
               projectSummary.overallProgress >= 25 ? '⭐' : '🌟'}
            </span>
          </div>
        </div>

        {/* Progress bar med animation */}
        <div style={ProgressBar}>
          <div 
            style={{
              width: `${projectSummary.overallProgress}%`,
              height: '100%',
              backgroundColor: getProgressColor(projectSummary.overallProgress),
              transition: `width ${SeniorDesignTokens.animation.duration.slow} ${SeniorDesignTokens.animation.easing.easeOut}`,
              borderRadius: SeniorDesignTokens.borderRadius.full,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Glimmer-effekt för visuell feedback */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: projectSummary.overallProgress > 0 ? 'shimmer 2s ease-in-out infinite' : 'none'
            }} />
          </div>
        </div>

        {/* Uppmuntrande meddelande */}
        <div style={{
          textAlign: 'center',
          marginTop: SeniorDesignTokens.spacing.md,
          fontSize: SeniorDesignTokens.fontSize.medium,
          fontWeight: '600',
          color: getProgressColor(projectSummary.overallProgress)
        }}>
          {getProgressMessage(projectSummary.overallProgress)}
        </div>
      </div>

      {/* Aktuell fas */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: SeniorDesignTokens.spacing.md,
        marginBottom: SeniorDesignTokens.spacing.lg,
        padding: SeniorDesignTokens.spacing.md,
        backgroundColor: SeniorDesignTokens.colors.primaryLight,
        borderRadius: SeniorDesignTokens.borderRadius.md,
        border: `2px solid ${SeniorDesignTokens.colors.primary}`
      }}>
        <div style={{
          fontSize: SeniorDesignTokens.fontSize.xlarge,
          fontWeight: '700'
        }}>
          🎯
        </div>
        <div>
          <div style={{
            fontSize: SeniorDesignTokens.fontSize.medium,
            color: SeniorDesignTokens.colors.textSecondary,
            marginBottom: '4px'
          }}>
            Just nu arbetar vi med:
          </div>
          <div style={{
            fontSize: SeniorDesignTokens.fontSize.large,
            fontWeight: '600',
            color: SeniorDesignTokens.colors.primary
          }}>
            {projectSummary.currentPhaseDisplay}
          </div>
        </div>
      </div>

      {/* Nästa steg */}
      <div style={NextStepsSection}>
        <h4 style={{
          margin: 0,
          marginBottom: SeniorDesignTokens.spacing.sm,
          fontSize: SeniorDesignTokens.fontSize.medium,
          fontWeight: '600',
          color: SeniorDesignTokens.colors.info,
          display: 'flex',
          alignItems: 'center',
          gap: SeniorDesignTokens.spacing.sm
        }}>
          🔮 Nästa steg:
        </h4>
        <p style={{
          margin: 0,
          fontSize: SeniorDesignTokens.fontSize.medium,
          lineHeight: '1.6',
          color: SeniorDesignTokens.colors.text
        }}>
          {projectSummary.nextMilestone}
        </p>
      </div>

      {/* Senaste uppdatering */}
      <div style={{
        fontSize: SeniorDesignTokens.fontSize.small,
        color: SeniorDesignTokens.colors.textMuted,
        textAlign: 'center',
        marginTop: SeniorDesignTokens.spacing.lg,
        fontStyle: 'italic'
      }}>
        {formatLastUpdate(projectSummary.lastUpdate)}
      </div>

      {/* Visa mer/mindre knapp */}
      <div style={{ textAlign: 'center' }}>
        <button
          style={{
            ...ToggleButton,
            backgroundColor: showDetails ? SeniorDesignTokens.colors.primary : 'transparent',
            color: showDetails ? SeniorDesignTokens.colors.background : SeniorDesignTokens.colors.primary,
            transform: isAnimating ? 'scale(0.95)' : 'scale(1)'
          }}
          onClick={handleToggleDetails}
          onMouseEnter={(e) => {
            if (!showDetails) {
              e.currentTarget.style.backgroundColor = SeniorDesignTokens.colors.primaryLight;
            }
          }}
          onMouseLeave={(e) => {
            if (!showDetails) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {showDetails ? '📖 Visa mindre' : '📋 Visa mer information'}
        </button>
      </div>

      {/* Utökad information (visas när showDetails är true) */}
      {showDetails && (
        <div style={{
          marginTop: SeniorDesignTokens.spacing.lg,
          padding: SeniorDesignTokens.spacing.lg,
          backgroundColor: SeniorDesignTokens.colors.background,
          borderRadius: SeniorDesignTokens.borderRadius.md,
          border: `1px solid ${SeniorDesignTokens.colors.border}`,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <h4 style={{
            margin: 0,
            marginBottom: SeniorDesignTokens.spacing.md,
            fontSize: SeniorDesignTokens.fontSize.medium,
            fontWeight: '600',
            color: SeniorDesignTokens.colors.primary
          }}>
            📚 Mer om ditt projekt
          </h4>
          
          <div style={{ marginBottom: SeniorDesignTokens.spacing.md }}>
            <strong>Projekttyp:</strong> Senior-vänlig applikation
          </div>
          
          <div style={{ marginBottom: SeniorDesignTokens.spacing.md }}>
            <strong>Startdatum:</strong> {projectSummary.lastUpdate.toLocaleDateString('sv-SE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          <div style={{ marginBottom: SeniorDesignTokens.spacing.md }}>
            <strong>Fokus:</strong> Enkelhet, tillgänglighet och användarvänlighet
          </div>
          
          <div style={{
            padding: SeniorDesignTokens.spacing.md,
            backgroundColor: SeniorDesignTokens.colors.successLight,
            borderRadius: SeniorDesignTokens.borderRadius.md,
            border: `1px solid ${SeniorDesignTokens.colors.success}`,
            marginTop: SeniorDesignTokens.spacing.md
          }}>
            <div style={{
              fontSize: SeniorDesignTokens.fontSize.medium,
              fontWeight: '600',
              color: SeniorDesignTokens.colors.success,
              marginBottom: SeniorDesignTokens.spacing.sm,
              display: 'flex',
              alignItems: 'center',
              gap: SeniorDesignTokens.spacing.sm
            }}>
              ✨ Vad gör detta projekt speciellt?
            </div>
            <p style={{
              margin: 0,
              lineHeight: '1.6',
              color: SeniorDesignTokens.colors.text
            }}>
              Detta projekt är designat specifikt för att vara enkelt och trevligt att använda. 
              Vi fokuserar på stora knappar, tydlig text och ett vänligt gränssnitt som känns 
              bekant och tryggt.
            </p>
          </div>
        </div>
      )}

      {/* CSS för animationer */}
      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectOverview;