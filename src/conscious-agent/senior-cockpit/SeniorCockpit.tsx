/**
 * Senior Cockpit - Huvudkomponent för senior-vänligt gränssnitt
 * Döljer all teknisk komplexitet och visar endast meningsfull, uppmuntrande information
 */

import React, { useState, useEffect } from 'react';
import { SeniorDesignTokens } from './SeniorDesignTokens';
import { 
  SeniorDashboard, 
  SeniorCockpitProps, 
  SeniorPreferences,
  SeniorNotification,
  SeniorFriendlyUpdate 
} from './types/SeniorTypes';
import ProjectOverview from './components/ProjectOverview';
import PhaseIndicator from './components/PhaseIndicator';

// Styled components med senior-vänliga designtokens
const CockpitContainer = {
  minHeight: '100vh',
  backgroundColor: SeniorDesignTokens.colors.background,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: SeniorDesignTokens.fontSize.medium,
  color: SeniorDesignTokens.colors.text,
  lineHeight: '1.6'
};

const Header = {
  backgroundColor: SeniorDesignTokens.colors.surface,
  padding: `${SeniorDesignTokens.spacing.lg} ${SeniorDesignTokens.spacing.xl}`,
  borderBottom: `2px solid ${SeniorDesignTokens.colors.border}`,
  marginBottom: SeniorDesignTokens.spacing.xl
};

const MainContent = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${SeniorDesignTokens.spacing.xl}`,
  display: 'grid',
  gap: SeniorDesignTokens.spacing.xl,
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
};

const Card = {
  backgroundColor: SeniorDesignTokens.colors.surface,
  borderRadius: SeniorDesignTokens.borderRadius.lg,
  padding: SeniorDesignTokens.spacing.xl,
  boxShadow: SeniorDesignTokens.shadows.md,
  border: `1px solid ${SeniorDesignTokens.colors.border}`
};

const WelcomeTitle = {
  fontSize: SeniorDesignTokens.fontSize.xlarge,
  fontWeight: '700',
  color: SeniorDesignTokens.colors.primary,
  marginBottom: SeniorDesignTokens.spacing.md,
  textAlign: 'center' as const
};

const LoadingMessage = {
  textAlign: 'center' as const,
  fontSize: SeniorDesignTokens.fontSize.large,
  color: SeniorDesignTokens.colors.textSecondary,
  padding: SeniorDesignTokens.spacing.xxl
};

const ErrorMessage = {
  textAlign: 'center' as const,
  fontSize: SeniorDesignTokens.fontSize.large,
  color: SeniorDesignTokens.colors.encouragement,
  padding: SeniorDesignTokens.spacing.xxl,
  backgroundColor: SeniorDesignTokens.colors.successLight,
  borderRadius: SeniorDesignTokens.borderRadius.lg,
  border: `2px solid ${SeniorDesignTokens.colors.success}`
};

export const SeniorCockpit: React.FC<SeniorCockpitProps> = ({
  className,
  onPreferencesChange,
  onNotificationDismiss,
  onUpdateRead
}) => {
  // State för dashboard data
  const [dashboardData, setDashboardData] = useState<SeniorDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default preferences - senior-vänliga inställningar
  const [preferences, setPreferences] = useState<SeniorPreferences>({
    fontSize: 'large',
    contrast: 'high',
    animations: 'reduced',
    notifications: 'important',
    language: 'sv'
  });

  // Ladda dashboard data (kommer från SeniorViewService senare)
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Simulerad data för nu - kommer ersättas med riktig SeniorViewService
        const mockData: SeniorDashboard = {
          projectOverview: {
            title: 'Ditt Fantastiska Projekt',
            description: 'Vi bygger något alldeles speciellt åt dig. Ett enkelt och vänligt system som hjälper dig att skapa precis det du behöver.',
            currentPhase: 'Crawl',
            currentPhaseDisplay: 'Grundläggande Setup',
            overallProgress: 25,
            nextMilestone: 'Vi förbereder det första steget',
            lastUpdate: new Date()
          },
          phaseProgress: {
            phases: [
              {
                name: 'Crawl',
                displayName: 'Grundläggande Setup',
                status: 'active',
                progress: 75,
                description: 'Vi lägger grunden för ditt projekt'
              },
              {
                name: 'Walk',
                displayName: 'Utveckling',
                status: 'upcoming',
                progress: 0,
                description: 'Vi börjar bygga funktionaliteten'
              },
              {
                name: 'Run',
                displayName: 'Förbättring',
                status: 'upcoming',
                progress: 0,
                description: 'Vi gör allt ännu bättre'
              },
              {
                name: 'Fly',
                displayName: 'Perfektion',
                status: 'upcoming',
                progress: 0,
                description: 'Vi polerar till perfektion'
              }
            ],
            currentPhase: 'Grundläggande Setup',
            visualStyle: 'journey-map',
            totalProgress: 25
          },
          recentUpdates: [
            {
              id: '1',
              title: 'Fantastiska framsteg idag!',
              description: 'Vi har slutfört den grundläggande strukturen för ditt projekt. Allt ser riktigt bra ut!',
              type: 'celebration',
              timestamp: new Date(),
              priority: 'high',
              isRead: false
            },
            {
              id: '2',
              title: 'Vi arbetar för dig',
              description: 'Just nu förbereder vi nästa steg i utvecklingen. Du behöver inte göra något - vi sköter allt!',
              type: 'progress',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 timmar sedan
              priority: 'medium',
              isRead: false
            }
          ],
          notifications: [
            {
              id: '1',
              type: 'celebration',
              title: 'Välkommen!',
              message: 'Ditt projekt är nu igång och vi arbetar för att göra något fantastiskt åt dig.',
              timestamp: new Date(),
              priority: 'high',
              autoHide: false
            }
          ],
          preferences
        };

        // Simulera laddningstid för realistisk upplevelse (kortare för tester)
        const loadingTime = process.env.NODE_ENV === 'test' ? 100 : 1000;
        await new Promise(resolve => setTimeout(resolve, loadingTime));
        
        setDashboardData(mockData);
        setError(null);
      } catch (err) {
        // Senior-vänlig felhantering - aldrig visa tekniska fel
        setError('Vi har lite problem just nu, men vi arbetar på att lösa det. Försök igen om en stund.');
        console.error('Dashboard loading error:', err); // Teknisk loggning
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Hantera preferensändringar
  const handlePreferencesChange = (newPreferences: SeniorPreferences) => {
    setPreferences(newPreferences);
    onPreferencesChange?.(newPreferences);
  };

  // Hantera notifikationsstängning
  const handleNotificationDismiss = (notificationId: string) => {
    if (dashboardData) {
      setDashboardData({
        ...dashboardData,
        notifications: dashboardData.notifications.filter(n => n.id !== notificationId)
      });
    }
    onNotificationDismiss?.(notificationId);
  };

  // Hantera uppdateringsläsning
  const handleUpdateRead = (updateId: string) => {
    if (dashboardData) {
      setDashboardData({
        ...dashboardData,
        recentUpdates: dashboardData.recentUpdates.map(update =>
          update.id === updateId ? { ...update, isRead: true } : update
        )
      });
    }
    onUpdateRead?.(updateId);
  };

  // Laddningsvy
  if (isLoading) {
    return (
      <div style={CockpitContainer} className={className}>
        <div style={LoadingMessage}>
          <div style={{ marginBottom: SeniorDesignTokens.spacing.lg }}>
            ⏳ Vi förbereder allt åt dig...
          </div>
          <div style={{ fontSize: SeniorDesignTokens.fontSize.medium, color: SeniorDesignTokens.colors.textMuted }}>
            Det här tar bara en stund
          </div>
        </div>
      </div>
    );
  }

  // Felvy - alltid uppmuntrande och aldrig teknisk
  if (error) {
    return (
      <div style={CockpitContainer} className={className}>
        <div style={ErrorMessage}>
          <div style={{ marginBottom: SeniorDesignTokens.spacing.lg }}>
            🌟 Vi arbetar för dig!
          </div>
          <div>{error}</div>
          <button
            style={{
              ...Card,
              marginTop: SeniorDesignTokens.spacing.lg,
              backgroundColor: SeniorDesignTokens.colors.primary,
              color: SeniorDesignTokens.colors.background,
              border: 'none',
              cursor: 'pointer',
              fontSize: SeniorDesignTokens.fontSize.medium,
              fontWeight: '600',
              minHeight: SeniorDesignTokens.spacing.touch
            }}
            onClick={() => window.location.reload()}
          >
            Försök igen
          </button>
        </div>
      </div>
    );
  }

  // Huvudvy
  return (
    <div style={CockpitContainer} className={className}>
      {/* Header med välkomstmeddelande */}
      <header style={Header}>
        <h1 style={WelcomeTitle}>
          🌟 Välkommen till ditt projekt!
        </h1>
        <p style={{ 
          textAlign: 'center', 
          fontSize: SeniorDesignTokens.fontSize.large,
          color: SeniorDesignTokens.colors.textSecondary,
          margin: 0
        }}>
          Vi bygger något fantastiskt åt dig
        </p>
      </header>

      {/* Huvudinnehåll */}
      <main style={MainContent}>
        {/* Projektöversikt - Dedikerad komponent */}
        {dashboardData && (
          <ProjectOverview 
            projectSummary={dashboardData.projectOverview}
            onDetailsToggle={(expanded) => {
              console.log('Project details toggled:', expanded);
            }}
          />
        )}

        {/* Fas-progression - Dedikerad komponent */}
        {dashboardData && (
          <PhaseIndicator 
            phaseProgress={dashboardData.phaseProgress}
            onPhaseClick={(phaseName) => {
              console.log('Phase clicked:', phaseName);
            }}
            showAnimations={preferences.animations !== 'none'}
          />
        )}

        {/* Senaste uppdateringar */}
        <section style={Card}>
          <h2 style={{ 
            fontSize: SeniorDesignTokens.fontSize.large,
            color: SeniorDesignTokens.colors.primary,
            marginBottom: SeniorDesignTokens.spacing.md,
            marginTop: 0
          }}>
            📢 Senaste Nytt
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: SeniorDesignTokens.spacing.md }}>
            {dashboardData?.recentUpdates.map((update) => (
              <div 
                key={update.id} 
                style={{
                  padding: SeniorDesignTokens.spacing.md,
                  backgroundColor: update.type === 'celebration' 
                    ? SeniorDesignTokens.colors.successLight
                    : SeniorDesignTokens.colors.background,
                  borderRadius: SeniorDesignTokens.borderRadius.md,
                  border: `1px solid ${
                    update.type === 'celebration' 
                      ? SeniorDesignTokens.colors.success
                      : SeniorDesignTokens.colors.border
                  }`,
                  cursor: 'pointer',
                  opacity: update.isRead ? 0.7 : 1
                }}
                onClick={() => handleUpdateRead(update.id)}
              >
                <div style={{ 
                  fontWeight: '600',
                  marginBottom: SeniorDesignTokens.spacing.sm,
                  display: 'flex',
                  alignItems: 'center',
                  gap: SeniorDesignTokens.spacing.sm
                }}>
                  {update.type === 'celebration' && '🎉'}
                  {update.type === 'progress' && '⚡'}
                  {update.type === 'milestone' && '🏆'}
                  {update.type === 'info' && 'ℹ️'}
                  {update.title}
                </div>
                <p style={{ 
                  margin: 0,
                  lineHeight: '1.6',
                  color: SeniorDesignTokens.colors.textSecondary
                }}>
                  {update.description}
                </p>
                <div style={{ 
                  fontSize: SeniorDesignTokens.fontSize.small,
                  color: SeniorDesignTokens.colors.textMuted,
                  marginTop: SeniorDesignTokens.spacing.sm
                }}>
                  {update.timestamp.toLocaleString('sv-SE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notifikationer */}
        {dashboardData?.notifications && dashboardData.notifications.length > 0 && (
          <section style={Card}>
            <h2 style={{ 
              fontSize: SeniorDesignTokens.fontSize.large,
              color: SeniorDesignTokens.colors.primary,
              marginBottom: SeniorDesignTokens.spacing.md,
              marginTop: 0
            }}>
              🔔 Meddelanden
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: SeniorDesignTokens.spacing.md }}>
              {dashboardData.notifications.map((notification) => (
                <div 
                  key={notification.id}
                  style={{
                    padding: SeniorDesignTokens.spacing.md,
                    backgroundColor: notification.type === 'celebration'
                      ? SeniorDesignTokens.colors.successLight
                      : notification.type === 'info'
                      ? SeniorDesignTokens.colors.infoLight
                      : SeniorDesignTokens.colors.background,
                    borderRadius: SeniorDesignTokens.borderRadius.md,
                    border: `2px solid ${
                      notification.type === 'celebration'
                        ? SeniorDesignTokens.colors.success
                        : notification.type === 'info'
                        ? SeniorDesignTokens.colors.info
                        : SeniorDesignTokens.colors.border
                    }`
                  }}
                >
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: SeniorDesignTokens.spacing.sm
                  }}>
                    <h3 style={{ 
                      margin: 0,
                      fontSize: SeniorDesignTokens.fontSize.medium,
                      fontWeight: '600'
                    }}>
                      {notification.title}
                    </h3>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: SeniorDesignTokens.fontSize.large,
                        cursor: 'pointer',
                        padding: SeniorDesignTokens.spacing.sm,
                        minWidth: SeniorDesignTokens.spacing.touch,
                        minHeight: SeniorDesignTokens.spacing.touch
                      }}
                      onClick={() => handleNotificationDismiss(notification.id)}
                      aria-label="Stäng meddelande"
                    >
                      ✕
                    </button>
                  </div>
                  <p style={{ 
                    margin: 0,
                    lineHeight: '1.6'
                  }}>
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SeniorCockpit;