// MASTER PLAN 2.0: Senior Cockpit Main Component
// STATUS: Jules Senior Cockpit Implementation - Main Interface
// INTEGRATION: Conscious Agent - Senior-friendly Project Dashboard
// ARCHITECTURE: Dual Consciousness Architecture compliant

import React, { useState, useEffect } from 'react';
import { SeniorViewService } from './services/SeniorViewService';
import { SeniorView, PhaseStatus, CockpitApiResponse } from './types/SeniorCockpitTypes';
import ProjectOverview from './components/ProjectOverview';
import PhaseVisualizer from './components/PhaseVisualizer';

/**
 * JULES SENIOR COCKPIT
 * 
 * Huvudkomponent som implementerar Jules vision:
 * "Ett enda dynamiskt gränssnitt som ersätter behovet att navigera 40+ dokument"
 * 
 * Detta är seniorernas ENDA kontaktpunkt med systemet.
 * All teknisk komplexitet är dold bakom detta enkla interface.
 */

interface SeniorCockpitProps {
  className?: string;
}

export const SeniorCockpit: React.FC<SeniorCockpitProps> = ({
  className = ''
}) => {
  // State management
  const [seniorView, setSeniorView] = useState<SeniorView | null>(null);
  const [phaseStatus, setPhaseStatus] = useState<PhaseStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Services
  const [seniorViewService] = useState(() => new SeniorViewService());

  // Load data on component mount
  useEffect(() => {
    loadSeniorView();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadSeniorView, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Ladda Senior View data från service
   */
  const loadSeniorView = async (forceRefresh = false) => {
    try {
      if (forceRefresh) {
        setRefreshing(true);
        seniorViewService.clearCache();
      } else {
        setLoading(true);
      }
      
      setError(null);

      // Hämta Senior View
      const viewResponse = await seniorViewService.getSeniorView();
      
      if (viewResponse.success && viewResponse.data) {
        setSeniorView(viewResponse.data);
        setLastUpdated(new Date());

        // Hämta fas-status
        const phaseResponse = await seniorViewService.getPhaseStatus(viewResponse.data.projectOverview.currentPhase);
        if (phaseResponse.success && phaseResponse.data) {
          setPhaseStatus(phaseResponse.data);
        }
      } else {
        setError(viewResponse.seniorFriendlyMessage || 'Kunde inte ladda projektinformation');
      }
    } catch (err) {
      console.error('Failed to load Senior View:', err);
      setError('Ett oväntat fel uppstod. Vi försöker lösa det.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Manuell uppdatering
   */
  const handleRefresh = () => {
    loadSeniorView(true);
  };

  // Loading state
  if (loading && !seniorView) {
    return (
      <div className={`senior-cockpit-loading ${className}`}>
        <div className="flex flex-col items-center justify-center min-h-96 p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Laddar projektinformation...</h2>
          <p className="text-gray-500 text-center">Vi hämtar den senaste informationen om ditt projekt</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !seniorView) {
    return (
      <div className={`senior-cockpit-error ${className}`}>
        <div className="flex flex-col items-center justify-center min-h-96 p-8">
          <span className="text-6xl mb-4">😔</span>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Något gick fel</h2>
          <p className="text-gray-500 text-center mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Försök igen
          </button>
        </div>
      </div>
    );
  }

  // Main cockpit interface
  return (
    <div className={`senior-cockpit bg-gray-50 min-h-screen ${className}`}>
      {/* Header med uppdateringsinformation */}
      <div className="cockpit-header bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🎛️</span>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Projekt Cockpit</h1>
              <p className="text-sm text-gray-600">Din enkla översikt av projektframsteg</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Senast uppdaterad */}
            {lastUpdated && (
              <div className="text-sm text-gray-500">
                Uppdaterat: {lastUpdated.toLocaleTimeString('sv-SE', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            )}
            
            {/* Uppdatera-knapp */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${refreshing 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }
              `}
            >
              {refreshing ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uppdaterar...
                </span>
              ) : (
                '🔄 Uppdatera'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Huvudinnehåll */}
      <div className="cockpit-content max-w-7xl mx-auto p-6">
        {seniorView && (
          <div className="space-y-8">
            {/* Projektöversikt */}
            <section className="project-overview-section">
              <ProjectOverview 
                overview={seniorView.projectOverview}
                className="mb-6"
              />
            </section>

            {/* Fas-visualisering */}
            <section className="phase-section">
              <PhaseVisualizer
                currentPhase={seniorView.projectOverview.currentPhase}
                phaseStatus={phaseStatus || undefined}
                showDetails={true}
                className="mb-6"
              />
            </section>

            {/* Senaste framsteg */}
            <section className="progress-section">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">📈</span>
                  <h2 className="text-xl font-bold text-gray-800">Senaste Framsteg</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Denna vecka */}
                  <div className="this-week p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                      <span className="mr-2">✅</span>
                      Denna Vecka
                    </h3>
                    <p className="text-green-700">{seniorView.recentProgress.thisWeek}</p>
                  </div>
                  
                  {/* Nästa vecka */}
                  <div className="next-week p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <span className="mr-2">🎯</span>
                      Nästa Vecka
                    </h3>
                    <p className="text-blue-700">{seniorView.recentProgress.nextWeek}</p>
                  </div>
                </div>

                {/* Blockers (om det finns) */}
                {seniorView.recentProgress.blockers && (
                  <div className="blockers mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <span className="mr-2">⚠️</span>
                      Behöver Uppmärksamhet
                    </h3>
                    <p className="text-yellow-700">{seniorView.recentProgress.blockers}</p>
                  </div>
                )}

                {/* Confidence meter */}
                <div className="confidence mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">Säkerhet i tidsplan</span>
                    <span className="font-bold text-gray-800">{seniorView.recentProgress.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        seniorView.recentProgress.confidence >= 80 ? 'bg-green-500' :
                        seniorView.recentProgress.confidence >= 60 ? 'bg-blue-500' :
                        seniorView.recentProgress.confidence >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${seniorView.recentProgress.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Notifikationer */}
            {seniorView.notifications && seniorView.notifications.length > 0 && (
              <section className="notifications-section">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🔔</span>
                    <h2 className="text-xl font-bold text-gray-800">Uppdateringar</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {seniorView.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`
                          notification-item p-4 rounded-lg border
                          ${notification.priority === 'success' ? 'bg-green-50 border-green-200' : ''}
                          ${notification.priority === 'info' ? 'bg-blue-50 border-blue-200' : ''}
                          ${notification.priority === 'warning' ? 'bg-yellow-50 border-yellow-200' : ''}
                          ${notification.priority === 'celebration' ? 'bg-purple-50 border-purple-200' : ''}
                        `}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-xl flex-shrink-0 mt-1">
                            {notification.priority === 'success' ? '✅' : ''}
                            {notification.priority === 'info' ? 'ℹ️' : ''}
                            {notification.priority === 'warning' ? '⚠️' : ''}
                            {notification.priority === 'celebration' ? '🎉' : ''}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-1">
                              {notification.title}
                            </h3>
                            <p className="text-gray-700 text-sm">
                              {notification.message}
                            </p>
                            <div className="text-xs text-gray-500 mt-2">
                              {notification.timestamp.toLocaleString('sv-SE')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Footer med hjälpinformation */}
      <div className="cockpit-footer bg-white border-t border-gray-200 p-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            Detta cockpit uppdateras automatiskt. All teknisk komplexitet är dold för att ge dig en enkel översikt.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Har du frågor? Kontakta projektteamet så hjälper vi dig.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeniorCockpit;