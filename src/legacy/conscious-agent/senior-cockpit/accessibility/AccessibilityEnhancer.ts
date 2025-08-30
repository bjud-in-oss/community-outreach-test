// MASTER PLAN 2.0: Accessibility Enhancer
// STATUS: WCAG 2.1 AA Compliance för Senior Cockpit
// INTEGRATION: Senior-Vänlig Tillgänglighet

/**
 * Tillgänglighetsförbättringar specifikt designade för seniorer
 * Följer WCAG 2.1 AA riktlinjer med extra fokus på senior-behov
 */
export class AccessibilityEnhancer {
  private highContrastMode: boolean = false;
  private textScaling: number = 1.0;
  private reducedMotion: boolean = false;

  /**
   * Initialiserar tillgänglighetsförbättringar baserat på användarpreferenser
   */
  initialize(): void {
    this.detectUserPreferences();
    this.applyAccessibilityEnhancements();
    this.setupKeyboardNavigation();
    this.enhanceScreenReaderSupport();
  }

  /**
   * Upptäcker användarens tillgänglighetspreferenser
   */
  private detectUserPreferences(): void {
    // Kontrollera systempreferenser
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      this.highContrastMode = true;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.reducedMotion = true;
    }

    // Kontrollera sparade användarinställningar
    const savedSettings = localStorage.getItem('senior-accessibility-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.textScaling = settings.textScaling || 1.0;
      this.highContrastMode = settings.highContrast || this.highContrastMode;
    }
  }

  /**
   * Tillämpar tillgänglighetsförbättringar på hela applikationen
   */
  private applyAccessibilityEnhancements(): void {
    const root = document.documentElement;

    // Textförstoring för seniorer
    root.style.setProperty('--senior-text-scale', this.textScaling.toString());
    
    // Hög kontrast-läge
    if (this.highContrastMode) {
      root.classList.add('high-contrast-mode');
    }

    // Reducerad rörelse
    if (this.reducedMotion) {
      root.classList.add('reduced-motion');
    }

    // Senior-specifika förbättringar
    root.classList.add('senior-optimized');
  }

  /**
   * Konfigurerar tangentbordsnavigation för seniorer
   */
  private setupKeyboardNavigation(): void {
    // Större fokusindikatorer
    const style = document.createElement('style');
    style.textContent = `
      .senior-optimized *:focus {
        outline: 3px solid #0066cc !important;
        outline-offset: 2px !important;
        border-radius: 4px !important;
      }

      .senior-optimized button:focus,
      .senior-optimized input:focus,
      .senior-optimized select:focus {
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3) !important;
      }
    `;
    document.head.appendChild(style);

    // Förbättrad Tab-navigation
    this.enhanceTabNavigation();
  }

  /**
   * Förbättrar Tab-navigation för seniorer
   */
  private enhanceTabNavigation(): void {
    let focusableElements: NodeListOf<HTMLElement>;
    let currentFocusIndex = 0;

    const updateFocusableElements = () => {
      focusableElements = document.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
    };

    // Uppdatera fokuserbara element när DOM ändras
    const observer = new MutationObserver(updateFocusableElements);
    observer.observe(document.body, { childList: true, subtree: true });

    updateFocusableElements();

    // Förbättrad Tab-hantering
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        updateFocusableElements();
        
        if (event.shiftKey) {
          currentFocusIndex = Math.max(0, currentFocusIndex - 1);
        } else {
          currentFocusIndex = Math.min(focusableElements.length - 1, currentFocusIndex + 1);
        }
      }
    });
  }

  /**
   * Förbättrar stöd för skärmläsare
   */
  private enhanceScreenReaderSupport(): void {
    // Lägg till ARIA-labels för alla interaktiva element
    this.addAriaLabels();
    
    // Skapa live-regioner för dynamiska uppdateringar
    this.createLiveRegions();
    
    // Förbättra semantisk HTML
    this.enhanceSemanticStructure();
  }

  /**
   * Lägger till ARIA-labels för bättre skärmläsarstöd
   */
  private addAriaLabels(): void {
    // Automatiskt lägg till ARIA-labels för knappar utan text
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach((button, index) => {
      if (!button.textContent?.trim()) {
        button.setAttribute('aria-label', `Knapp ${index + 1}`);
      }
    });

    // Förbättra formulärelement
    const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
    inputs.forEach((input) => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label && input.getAttribute('placeholder')) {
        input.setAttribute('aria-label', input.getAttribute('placeholder') || '');
      }
    });
  }

  /**
   * Skapar live-regioner för dynamiska uppdateringar
   */
  private createLiveRegions(): void {
    // Skapa polite live-region för icke-kritiska uppdateringar
    const politeRegion = document.createElement('div');
    politeRegion.setAttribute('aria-live', 'polite');
    politeRegion.setAttribute('aria-atomic', 'true');
    politeRegion.setAttribute('id', 'senior-live-polite');
    politeRegion.style.position = 'absolute';
    politeRegion.style.left = '-10000px';
    politeRegion.style.width = '1px';
    politeRegion.style.height = '1px';
    politeRegion.style.overflow = 'hidden';
    document.body.appendChild(politeRegion);

    // Skapa assertive live-region för viktiga uppdateringar
    const assertiveRegion = document.createElement('div');
    assertiveRegion.setAttribute('aria-live', 'assertive');
    assertiveRegion.setAttribute('aria-atomic', 'true');
    assertiveRegion.setAttribute('id', 'senior-live-assertive');
    assertiveRegion.style.position = 'absolute';
    assertiveRegion.style.left = '-10000px';
    assertiveRegion.style.width = '1px';
    assertiveRegion.style.height = '1px';
    assertiveRegion.style.overflow = 'hidden';
    document.body.appendChild(assertiveRegion);
  }

  /**
   * Förbättrar semantisk HTML-struktur
   */
  private enhanceSemanticStructure(): void {
    // Säkerställ att alla sidor har korrekt heading-hierarki
    this.validateHeadingHierarchy();
    
    // Lägg till landmarks om de saknas
    this.addMissingLandmarks();
  }

  /**
   * Validerar och korrigerar heading-hierarki
   */
  private validateHeadingHierarchy(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let currentLevel = 0;

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      // Kontrollera att vi inte hoppar över nivåer
      if (level > currentLevel + 1) {
        console.warn(`Heading hierarchy issue: ${heading.tagName} follows h${currentLevel}`);
      }
      
      currentLevel = level;
    });
  }

  /**
   * Lägger till saknade landmarks
   */
  private addMissingLandmarks(): void {
    // Lägg till main landmark om det saknas
    if (!document.querySelector('main')) {
      const mainContent = document.querySelector('#root, .app, .main-content');
      if (mainContent && !mainContent.closest('main')) {
        const main = document.createElement('main');
        mainContent.parentNode?.insertBefore(main, mainContent);
        main.appendChild(mainContent);
      }
    }
  }

  /**
   * Annonserar meddelanden till skärmläsare
   */
  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const regionId = priority === 'assertive' ? 'senior-live-assertive' : 'senior-live-polite';
    const region = document.getElementById(regionId);
    
    if (region) {
      region.textContent = message;
      
      // Rensa meddelandet efter en kort stund
      setTimeout(() => {
        region.textContent = '';
      }, 1000);
    }
  }

  /**
   * Uppdaterar textförstoring
   */
  updateTextScaling(scale: number): void {
    this.textScaling = Math.max(0.8, Math.min(2.0, scale));
    document.documentElement.style.setProperty('--senior-text-scale', this.textScaling.toString());
    
    this.saveAccessibilitySettings();
    this.announceToScreenReader(`Textstorlek ändrad till ${Math.round(this.textScaling * 100)}%`);
  }

  /**
   * Växlar hög kontrast-läge
   */
  toggleHighContrast(): void {
    this.highContrastMode = !this.highContrastMode;
    
    if (this.highContrastMode) {
      document.documentElement.classList.add('high-contrast-mode');
      this.announceToScreenReader('Hög kontrast aktiverad');
    } else {
      document.documentElement.classList.remove('high-contrast-mode');
      this.announceToScreenReader('Hög kontrast inaktiverad');
    }
    
    this.saveAccessibilitySettings();
  }

  /**
   * Sparar tillgänglighetsinställningar
   */
  private saveAccessibilitySettings(): void {
    const settings = {
      textScaling: this.textScaling,
      highContrast: this.highContrastMode,
      reducedMotion: this.reducedMotion
    };
    
    localStorage.setItem('senior-accessibility-settings', JSON.stringify(settings));
  }

  /**
   * Hämtar aktuella tillgänglighetsinställningar
   */
  getAccessibilitySettings() {
    return {
      textScaling: this.textScaling,
      highContrast: this.highContrastMode,
      reducedMotion: this.reducedMotion
    };
  }
}