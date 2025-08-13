/**
 * Demo för Senior Cockpit - För att testa komponenten visuellt
 * Visar hur Senior Cockpit ser ut och fungerar
 */

import React, { useState } from 'react';
import SeniorCockpit from './SeniorCockpit';
import { SeniorPreferences } from './types/SeniorTypes';
import { SeniorDesignTokens } from './SeniorDesignTokens';

const DemoContainer = {
  minHeight: '100vh',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const DemoHeader = {
  textAlign: 'center' as const,
  marginBottom: '30px',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};

const DemoControls = {
  display: 'flex',
  gap: '20px',
  marginBottom: '30px',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  flexWrap: 'wrap' as const
};

const ControlGroup = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '8px',
  minWidth: '150px'
};

const Label = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151'
};

const Select = {
  padding: '8px 12px',
  borderRadius: '6px',
  border: '2px solid #e5e7eb',
  fontSize: '14px',
  backgroundColor: 'white'
};

const Button = {
  padding: '12px 24px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: SeniorDesignTokens.colors.primary,
  color: 'white',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};

const LogContainer = {
  marginTop: '20px',
  padding: '15px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef',
  maxHeight: '200px',
  overflowY: 'auto' as const
};

const LogEntry = {
  fontSize: '12px',
  color: '#6c757d',
  marginBottom: '4px',
  fontFamily: 'monospace'
};

export const SeniorCockpitDemo: React.FC = () => {
  const [preferences, setPreferences] = useState<SeniorPreferences>({
    fontSize: 'large',
    contrast: 'high',
    animations: 'reduced',
    notifications: 'important',
    language: 'sv'
  });

  const [logs, setLogs] = useState<string[]>([]);
  const [showDemo, setShowDemo] = useState(true);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('sv-SE');
    setLogs(prev => [...prev.slice(-9), `[${timestamp}] ${message}`]);
  };

  const handlePreferencesChange = (newPreferences: SeniorPreferences) => {
    setPreferences(newPreferences);
    addLog(`Preferences updated: ${JSON.stringify(newPreferences)}`);
  };

  const handleNotificationDismiss = (notificationId: string) => {
    addLog(`Notification dismissed: ${notificationId}`);
  };

  const handleUpdateRead = (updateId: string) => {
    addLog(`Update marked as read: ${updateId}`);
  };

  const resetDemo = () => {
    setShowDemo(false);
    setTimeout(() => {
      setShowDemo(true);
      addLog('Demo reset');
    }, 100);
  };

  return (
    <div style={DemoContainer}>
      {/* Demo Header */}
      <div style={DemoHeader}>
        <h1 style={{ 
          margin: 0, 
          marginBottom: '10px',
          fontSize: '28px',
          color: SeniorDesignTokens.colors.primary 
        }}>
          🧪 Senior Cockpit Demo
        </h1>
        <p style={{ 
          margin: 0, 
          fontSize: '16px',
          color: '#6b7280' 
        }}>
          Testa Senior Cockpit komponenten och se hur den fungerar för seniorer
        </p>
      </div>

      {/* Demo Controls */}
      <div style={DemoControls}>
        <div style={ControlGroup}>
          <label style={Label}>Textstorlek:</label>
          <select 
            style={Select}
            value={preferences.fontSize}
            onChange={(e) => handlePreferencesChange({
              ...preferences,
              fontSize: e.target.value as 'normal' | 'large' | 'extra-large'
            })}
          >
            <option value="normal">Normal</option>
            <option value="large">Stor</option>
            <option value="extra-large">Extra stor</option>
          </select>
        </div>

        <div style={ControlGroup}>
          <label style={Label}>Kontrast:</label>
          <select 
            style={Select}
            value={preferences.contrast}
            onChange={(e) => handlePreferencesChange({
              ...preferences,
              contrast: e.target.value as 'normal' | 'high'
            })}
          >
            <option value="normal">Normal</option>
            <option value="high">Hög</option>
          </select>
        </div>

        <div style={ControlGroup}>
          <label style={Label}>Animationer:</label>
          <select 
            style={Select}
            value={preferences.animations}
            onChange={(e) => handlePreferencesChange({
              ...preferences,
              animations: e.target.value as 'normal' | 'reduced' | 'none'
            })}
          >
            <option value="normal">Normal</option>
            <option value="reduced">Reducerade</option>
            <option value="none">Inga</option>
          </select>
        </div>

        <div style={ControlGroup}>
          <label style={Label}>Notifikationer:</label>
          <select 
            style={Select}
            value={preferences.notifications}
            onChange={(e) => handlePreferencesChange({
              ...preferences,
              notifications: e.target.value as 'all' | 'important' | 'minimal'
            })}
          >
            <option value="all">Alla</option>
            <option value="important">Viktiga</option>
            <option value="minimal">Minimala</option>
          </select>
        </div>

        <div style={ControlGroup}>
          <label style={Label}>Åtgärder:</label>
          <button 
            style={Button}
            onClick={resetDemo}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = SeniorDesignTokens.colors.primaryHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = SeniorDesignTokens.colors.primary;
            }}
          >
            🔄 Återställ Demo
          </button>
        </div>
      </div>

      {/* Senior Cockpit Component */}
      {showDemo && (
        <div style={{
          border: '3px solid #e5e7eb',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <SeniorCockpit
            onPreferencesChange={handlePreferencesChange}
            onNotificationDismiss={handleNotificationDismiss}
            onUpdateRead={handleUpdateRead}
          />
        </div>
      )}

      {/* Event Log */}
      <div style={LogContainer}>
        <h3 style={{ 
          margin: 0, 
          marginBottom: '10px',
          fontSize: '14px',
          color: '#374151' 
        }}>
          📋 Event Log (senaste 10 händelser)
        </h3>
        {logs.length === 0 ? (
          <div style={LogEntry}>Inga händelser än...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} style={LogEntry}>
              {log}
            </div>
          ))
        )}
      </div>

      {/* Demo Information */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ 
          margin: 0, 
          marginBottom: '15px',
          fontSize: '18px',
          color: SeniorDesignTokens.colors.primary 
        }}>
          🎯 Vad du kan testa:
        </h3>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '20px',
          lineHeight: '1.6',
          color: '#374151'
        }}>
          <li><strong>Projektöversikt:</strong> Klicka på "Visa mer information" för att se utökade detaljer</li>
          <li><strong>Fas-progression:</strong> Klicka på olika faser för att se interaktivitet</li>
          <li><strong>Uppdateringar:</strong> Klicka på uppdateringar för att markera dem som lästa</li>
          <li><strong>Notifikationer:</strong> Klicka på ✕ för att stänga meddelanden</li>
          <li><strong>Inställningar:</strong> Ändra textstorlek, kontrast och animationer ovan</li>
          <li><strong>Responsivitet:</strong> Ändra fönsterstorlek för att se responsiv design</li>
        </ul>
        
        <div style={{
          marginTop: '15px',
          padding: '15px',
          backgroundColor: SeniorDesignTokens.colors.successLight,
          borderRadius: '8px',
          border: `2px solid ${SeniorDesignTokens.colors.success}`
        }}>
          <strong style={{ color: SeniorDesignTokens.colors.success }}>
            ✨ Senior-vänliga funktioner:
          </strong>
          <ul style={{ 
            margin: '8px 0 0 0', 
            paddingLeft: '20px',
            color: '#374151'
          }}>
            <li>Stora, läsbara textstorlekar (minimum 18px)</li>
            <li>Hög kontrast för bättre synlighet</li>
            <li>Touch-vänliga knappar (minimum 44px)</li>
            <li>Uppmuntrande språk utan teknisk jargong</li>
            <li>Tydliga visuella indikatorer och ikoner</li>
            <li>Responsiv design för alla enheter</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeniorCockpitDemo;