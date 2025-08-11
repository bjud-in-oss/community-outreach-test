# Tailwind CSS Framework Integration - RAW Documentation

**Källa**: https://tailwindcss.com/docs/installation/framework-guides  
**Importerad**: 2024-08-11 via MCP fetch  
**Syfte**: UI framework integration patterns för senior-vänlig design

---

# Get started with Tailwind CSS

Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

It's fast, flexible, and reliable — with zero-runtime.

## Framework Guides

Framework-specific guides that cover our recommended approach to installing Tailwind CSS in a number of popular environments.

### Next.js
Full-featured React framework with great developer experience.

### Laravel
PHP web application framework with expressive, elegant syntax.

### Nuxt
Intuitive Vue framework for building universal applications.

### SolidJS
A tool for building simple, performant, and reactive user interfaces.

### SvelteKit
The fastest way to build apps of all sizes with Svelte.js.

### Gatsby
Framework for building static sites with React and GraphQL.

### Angular
Platform for building mobile and desktop web applications.

### Ruby on Rails
Full-stack framework with all the tools needed to build amazing web apps.

### React Router
A standards‑focused router you can deploy anywhere.

### Phoenix
A framework to build rich, interactive applications with Elixir.

### Parcel
The zero-configuration build tool for the web.

### Symfony
A PHP framework to create websites and web applications.

### Meteor
The full stack JavaScript framework for developing cross-platform apps.

### AdonisJS
A fully featured web framework for Node.js.

### Ember.js
A JavaScript framework for ambitious web developers.

### Astro
The all-in-one web framework designed for speed.

### Qwik
Build instantly-interactive web apps without effort.

### Rspack
A fast Rust-based web bundler.

---

## Integration Notes för Community Outreach Builder

### Senior-Optimerad Tailwind Konfiguration:

#### Accessibility-First Design:
```css
/* Senior-vänliga färger och storlekar */
.senior-button {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl;
  min-height: 44px; /* Touch target minimum */
}

.senior-text {
  @apply text-lg leading-relaxed text-gray-800;
  font-size: clamp(16px, 2.5vw, 24px); /* Responsive text */
}

.senior-container {
  @apply max-w-4xl mx-auto px-6 py-8;
  /* Begränsad bredd för läsbarhet */
}
```

#### WYSIWYG Integration:
```typescript
// Tailwind classes för WYSIWYG komponenter
const seniorComponents = {
  button: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl min-h-[44px]',
  heading: 'text-3xl font-bold text-gray-900 mb-6',
  paragraph: 'text-lg leading-relaxed text-gray-800 mb-4',
  card: 'bg-white rounded-lg shadow-md p-6 mb-6',
  input: 'w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500'
}
```

### Koppling till Master Plan:
- **Fas 1 (WALK)**: Grundläggande Tailwind setup med Next.js
- **Fas 2 (RUN)**: Senior-optimerade komponenter och WYSIWYG integration
- **Fas 3 (FLY)**: AI-genererade Tailwind classes för dynamisk styling