# Next.js Middleware Integration Patterns - RAW Documentation

**Källa**: https://nextjs.org/docs/app/building-your-application/routing/middleware  
**Importerad**: 2024-08-11 via MCP fetch  
**Syfte**: Integration patterns för Next.js middleware i vårt dubbelt medvetandesystem

---

The `middleware.js|ts` file is used to write [Middleware](/docs/app/api-reference/file-conventions/middleware) and run code on the server before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Middleware executes before routes are rendered. It's particularly useful for implementing custom server-side logic like authentication, logging, or handling redirects.

Use the file `middleware.ts` (or .js) in the root of your project to define Middleware. For example, at the same level as `app` or `pages`, or inside `src` if applicable.

```typescript
import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: '/about/:path*',
}
```

## Exports

### Middleware function

The file must export a single function, either as a default export or named `middleware`. Note that multiple middleware from the same file are not supported.

```typescript
// Example of default export
export default function middleware(request) {
  // Middleware logic
}
```

### Config object (optional)

Optionally, a config object can be exported alongside the Middleware function. This object includes the matcher to specify paths where the Middleware applies.

### Matcher

The `matcher` option allows you to target specific paths for the Middleware to run on. You can specify these paths in several ways:

* For a single path: Directly use a string to define the path, like `'/about'`.
* For multiple paths: Use an array to list multiple paths, such as `matcher: ['/about', '/contact']`, which applies the Middleware to both `/about` and `/contact`.

```typescript
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}
```

Additionally, the `matcher` option supports complex path specifications through regular expressions, such as `matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']`, enabling precise control over which paths to include or exclude.

---

## Integration Notes för Community Outreach Builder

### Dubbelt Medvetandesystem Integration:

#### Medvetna Rondellen (Frontend):
```typescript
// middleware.ts för senior-vänlig routing
export function middleware(request: NextRequest) {
  // Dölj teknisk komplexitet från seniorer
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Omdirigera tekniska endpoints till user-friendly interfaces
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Senior-optimerad routing
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/welcome', request.url))
  }
  
  return NextResponse.next()
}
```

#### Kärn-agenten (Backend):
```typescript
// Teknisk middleware för API-hantering
export function apiMiddleware(request: NextRequest) {
  // Hantera Jules automation requests
  if (request.nextUrl.pathname.startsWith('/api/jules/')) {
    // Validera och dirigera Jules requests
    return handleJulesRequest(request)
  }
  
  // LangChain orchestration middleware
  if (request.nextUrl.pathname.startsWith('/api/agent/')) {
    return handleAgentRequest(request)
  }
  
  return NextResponse.next()
}
```

### Koppling till Master Plan:
- **Fas 1 (WALK)**: Grundläggande middleware för routing och säkerhet
- **Fas 2 (RUN)**: Senior-optimerad middleware för WYSIWYG och PWA
- **Fas 3 (FLY)**: AI-driven middleware för metakognitiva förmågor