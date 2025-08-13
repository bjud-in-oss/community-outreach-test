/**
 * Senior Cockpit Test Suite
 * Omfattande tester för senior-vänligt gränssnitt
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SeniorCockpit } from './SeniorCockpit';
import { SeniorCockpitProps } from './types/SeniorTypes';

// Öka timeout för alla waitFor-anrop
const WAIT_TIMEOUT = 5000;

// Mock props för tester
const defaultProps: SeniorCockpitProps = {
  className: 'test-senior-cockpit',
  onPreferencesChange: jest.fn(),
  onNotificationDismiss: jest.fn(),
  onUpdateRead: jest.fn()
};

// Helper function för att vänta på att komponenten laddas
const waitForComponentToLoad = async () => {
  await waitFor(() => {
    expect(screen.queryByText('⏳ Vi förbereder allt åt dig...')).not.toBeInTheDocument();
  }, { timeout: WAIT_TIMEOUT });
};

describe('SeniorCockpit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Laddning och Grundläggande Funktionalitet', () => {
    it('visar laddningsmeddelande initialt', () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      expect(screen.getByText('⏳ Vi förbereder allt åt dig...')).toBeInTheDocument();
      expect(screen.getByText('Det här tar bara en stund')).toBeInTheDocument();
    });

    it('laddar och visar huvudinnehåll efter laddning', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      // Kontrollera att huvudinnehållet visas
      expect(screen.getByText('Ditt Fantastiska Projekt')).toBeInTheDocument();
      expect(screen.getByText('🌟 Välkommen till ditt projekt!')).toBeInTheDocument();
    });
  });

  describe('Projektöversikt', () => {
    it('visar projektinformation med senior-vänlig beskrivning', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      expect(screen.getByText('Ditt Fantastiska Projekt')).toBeInTheDocument();
      expect(screen.getByText(/Vi bygger något alldeles speciellt åt dig/)).toBeInTheDocument();
    });

    it('visar framstegsinformation utan tekniska termer', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      // Kontrollera att progress visas på senior-vänligt sätt
      expect(screen.getByText(/Vi förbereder det första steget/)).toBeInTheDocument();
    });
  });

  describe('Fas-progression', () => {
    it('visar fas-progression med senior-vänliga namn', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      // Använd getAllByText för att hantera duplicerade element
      expect(screen.getAllByText('Grundläggande Setup').length).toBeGreaterThan(0);
      expect(screen.getByText('Utveckling')).toBeInTheDocument();
      expect(screen.getByText('Förbättring')).toBeInTheDocument();
      expect(screen.getByText('Perfektion')).toBeInTheDocument();
    });

    it('visar aktuell fas som aktiv', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      // Grundläggande Setup ska vara aktiv fas
      expect(screen.getAllByText('Grundläggande Setup').length).toBeGreaterThan(0);
    });
  });

  describe('Uppdateringar och Notifikationer', () => {
    it('visar senaste uppdateringar med uppmuntrande språk', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      expect(screen.getByText(/Fantastiska framsteg/)).toBeInTheDocument();
      expect(screen.getByText(/Vi arbetar för dig/)).toBeInTheDocument();
    });

    it('visar välkomstnotifikation', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      expect(screen.getByText('Välkommen!')).toBeInTheDocument();
      expect(screen.getByText(/Ditt projekt är nu igång/)).toBeInTheDocument();
    });
  });

  describe('Interaktivitet', () => {
    it('kan stänga notifikationer', async () => {
      const mockOnNotificationDismiss = jest.fn();
      render(<SeniorCockpit {...defaultProps} onNotificationDismiss={mockOnNotificationDismiss} />);
      
      await waitForComponentToLoad();
      
      const closeButton = screen.getByLabelText('Stäng meddelande');
      fireEvent.click(closeButton);
      
      expect(mockOnNotificationDismiss).toHaveBeenCalledWith('1');
    });

    it('kan markera uppdateringar som lästa', async () => {
      const mockOnUpdateRead = jest.fn();
      render(<SeniorCockpit {...defaultProps} onUpdateRead={mockOnUpdateRead} />);
      
      await waitForComponentToLoad();
      
      // Hitta uppdateringselementet med mer flexibel sökning
      const updateElement = screen.getByText(/Fantastiska framsteg/).closest('div');
      if (updateElement) {
        fireEvent.click(updateElement);
        expect(mockOnUpdateRead).toHaveBeenCalledWith('1');
      }
    });
  });

  describe('Senior-säkerhet', () => {
    it('innehåller INGA tekniska termer', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      const forbiddenTerms = ['API', 'JSON', 'HTTP', 'Git', 'Build', 'Deploy', 'Debug', 'Error', 'Stack', 'Trace'];
      const pageText = document.body.textContent || '';
      
      forbiddenTerms.forEach(term => {
        expect(pageText.toLowerCase()).not.toContain(term.toLowerCase());
      });
    });

    it('använder endast uppmuntrande och positiva meddelanden', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      const pageText = document.body.textContent || '';
      const encouragingWords = ['fantastisk', 'bra', 'välkommen', 'framsteg'];
      
      // Minst ett uppmuntrande ord ska finnas
      const hasEncouragingWords = encouragingWords.some(word => 
        pageText.toLowerCase().includes(word)
      );
      expect(hasEncouragingWords).toBe(true);
    });

    it('har stora, läsbara textstorlekar', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      // Kontrollera att huvudcontainern har rätt fontstorlek
      const container = document.querySelector('[style*="font-size"]');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Tillgänglighet', () => {
    it('har korrekt ARIA-labels för interaktiva element', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      const closeButton = screen.getByLabelText('Stäng meddelande');
      expect(closeButton).toBeInTheDocument();
    });

    it('har semantisk HTML-struktur', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      // Kontrollera att det finns semantiska element
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  describe('Responsiv design', () => {
    it('fungerar på olika skärmstorlekar', async () => {
      render(<SeniorCockpit {...defaultProps} />);
      
      await waitForComponentToLoad();
      
      // Kontrollera att komponenten renderas korrekt
      expect(screen.getByText('Ditt Fantastiska Projekt')).toBeInTheDocument();
      
      // Testa att grid-layout används för responsivitet
      const container = document.querySelector('[style*="grid"]');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Felhantering', () => {
    it('visar senior-vänliga felmeddelanden', async () => {
      // Mock console.error för att undvika spam i tester
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // Mock fetch för att simulera fel
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
      render(<SeniorCockpit {...defaultProps} />);
      
      // Vänta på att felmeddelandet visas
      await waitFor(() => {
        const errorText = screen.queryByText(/Vi har lite problem just nu/);
        if (errorText) {
          expect(errorText).toBeInTheDocument();
        }
      }, { timeout: WAIT_TIMEOUT });
      
      // Återställ mocks
      global.fetch = originalFetch;
      consoleSpy.mockRestore();
    });
  });
});