// Jest setup för Senior Cockpit tester
require('@testing-library/jest-dom');

// Mock för window.matchMedia (används av responsiva komponenter)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock för window.ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock för IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Sätt upp console.error mock för att fånga React warnings
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Globala test utilities
global.testUtils = {
  // Hjälpfunktion för att kontrollera senior-vänlighet
  checkSeniorFriendliness: (element) => {
    const text = element.textContent || '';
    const forbiddenTerms = [
      'API', 'JSON', 'HTTP', 'Git', 'Build', 'Deploy', 'Debug', 'Error',
      'Exception', 'Stack', 'Trace', 'Log', 'Config', 'Database'
    ];
    
    return forbiddenTerms.filter(term => 
      text.toLowerCase().includes(term.toLowerCase())
    );
  },
  
  // Hjälpfunktion för att kontrollera tillgänglighet
  checkAccessibility: (element) => {
    const issues = [];
    
    // Kontrollera att interaktiva element har tillräcklig storlek
    const interactiveElements = element.querySelectorAll('button, a, input, select');
    interactiveElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        issues.push(`Element ${el.tagName} är för litet för touch (${rect.width}x${rect.height})`);
      }
    });
    
    // Kontrollera att bilder har alt-text
    const images = element.querySelectorAll('img');
    images.forEach(img => {
      if (!img.alt) {
        issues.push('Bild saknar alt-text');
      }
    });
    
    return issues;
  }
};