/**
 * Senior Design Tokens - Designsystem optimerat för seniorer
 * Stora knappar, hög kontrast, läsbar text
 */

export const SeniorDesignTokens = {
  // Fontstorlekar - alla större än standard för läsbarhet
  fontSize: {
    small: '18px',    // Minimum läsbar storlek
    medium: '24px',   // Standard text
    large: '32px',    // Rubriker
    xlarge: '48px',   // Huvudtitlar
    xxlarge: '64px'   // Hero text
  },

  // Avstånd - generösa för touch-vänlighet
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
    touch: '44px',      // Minimum touch target (iOS/Android standard)
    comfortable: '24px', // Bekvämt avstånd mellan element
    generous: '48px'     // Generöst avstånd för visuell vila
  },

  // Färger - hög kontrast för synlighet
  colors: {
    // Primära färger
    primary: '#2563eb',      // Tydlig blå
    primaryHover: '#1d4ed8', // Mörkare blå för hover
    primaryLight: '#dbeafe', // Ljus blå för bakgrunder
    
    // Semantiska färger
    success: '#16a34a',      // Tydlig grön för framgång
    successLight: '#dcfce7', // Ljus grön bakgrund
    warning: '#ea580c',      // Synlig orange för varningar
    warningLight: '#fed7aa', // Ljus orange bakgrund
    info: '#0ea5e9',         // Information blå
    infoLight: '#e0f2fe',    // Ljus info bakgrund
    
    // Neutrala färger
    background: '#ffffff',   // Ren vit bakgrund
    surface: '#f8fafc',      // Ljusgrå för kort/paneler
    border: '#e2e8f0',       // Subtil gräns
    text: '#1f2937',         // Mörk grå för läsbarhet
    textSecondary: '#6b7280', // Sekundär text
    textMuted: '#9ca3af',    // Dämpad text
    
    // Interaktiva element
    buttonPrimary: '#2563eb',
    buttonPrimaryHover: '#1d4ed8',
    buttonSecondary: '#f1f5f9',
    buttonSecondaryHover: '#e2e8f0',
    
    // Specialfärger för seniorer
    celebration: '#f59e0b',  // Gul för firande
    encouragement: '#10b981', // Grön för uppmuntran
    gentle: '#8b5cf6'        // Lila för mjuka meddelanden
  },

  // Skuggor - subtila för djup utan att vara överväldigande
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },

  // Border radius - mjuka hörn
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },

  // Animationer - lugna och inte överväldigande
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Breakpoints för responsiv design
  breakpoints: {
    sm: '640px',   // Mobil landscape
    md: '768px',   // Tablet
    lg: '1024px',  // Desktop
    xl: '1280px',  // Stor desktop
    xxl: '1536px'  // Extra stor desktop
  },

  // Z-index värden
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060
  }
} as const;

// Hjälpfunktioner för att använda design tokens
export const getSpacing = (size: keyof typeof SeniorDesignTokens.spacing) => 
  SeniorDesignTokens.spacing[size];

export const getColor = (color: keyof typeof SeniorDesignTokens.colors) => 
  SeniorDesignTokens.colors[color];

export const getFontSize = (size: keyof typeof SeniorDesignTokens.fontSize) => 
  SeniorDesignTokens.fontSize[size];

// CSS-in-JS hjälpare för styled-components eller emotion
export const seniorButtonStyles = {
  minHeight: SeniorDesignTokens.spacing.touch,
  minWidth: SeniorDesignTokens.spacing.touch,
  fontSize: SeniorDesignTokens.fontSize.medium,
  padding: `${SeniorDesignTokens.spacing.md} ${SeniorDesignTokens.spacing.lg}`,
  borderRadius: SeniorDesignTokens.borderRadius.lg,
  fontWeight: '600',
  cursor: 'pointer',
  transition: `all ${SeniorDesignTokens.animation.duration.normal} ${SeniorDesignTokens.animation.easing.easeOut}`,
  
  // Primär knapp
  primary: {
    backgroundColor: SeniorDesignTokens.colors.primary,
    color: SeniorDesignTokens.colors.background,
    border: 'none',
    '&:hover': {
      backgroundColor: SeniorDesignTokens.colors.primaryHover,
      transform: 'translateY(-1px)',
      boxShadow: SeniorDesignTokens.shadows.md
    }
  },
  
  // Sekundär knapp
  secondary: {
    backgroundColor: SeniorDesignTokens.colors.buttonSecondary,
    color: SeniorDesignTokens.colors.text,
    border: `2px solid ${SeniorDesignTokens.colors.border}`,
    '&:hover': {
      backgroundColor: SeniorDesignTokens.colors.buttonSecondaryHover,
      borderColor: SeniorDesignTokens.colors.primary
    }
  }
};

export type SeniorDesignTokens = typeof SeniorDesignTokens;