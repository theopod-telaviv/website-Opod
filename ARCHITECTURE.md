# Architecture Overview - The O Pod Hotel

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Hebrew     │  │   English    │  │      French          │  │
│  │   /he/*      │  │   /en/*      │  │      /fr/*           │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS MIDDLEWARE                           │
│          (Locale Detection & Routing)                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APP ROUTER                                 │
│                                                                 │
│  app/[locale]/                                                  │
│  ├── page.tsx              → Homepage                           │
│  ├── capsules/                                                  │
│  │   ├── page.tsx         → Capsules Listing                   │
│  │   └── [slug]/page.tsx  → Capsule Detail (7 types)          │
│  ├── hotel/page.tsx        → Hotel Info                         │
│  ├── faq/page.tsx          → FAQ                                │
│  └── contact/page.tsx      → Contact                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      COMPONENTS LAYER                           │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐     │
│  │   Layout     │  │   Booking    │  │   Capsules       │     │
│  │              │  │              │  │                  │     │
│  │  • Header    │  │  • Widget    │  │  • Card          │     │
│  │  • Footer    │  │  • Calendar  │  │  • Gallery       │     │
│  │  • Locale    │  │  • Selectors │  │  • Amenities     │     │
│  │    Switcher  │  │              │  │                  │     │
│  └──────────────┘  └──────────────┘  └──────────────────┘     │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐     │
│  │   SEO        │  │   UI         │  │   POI            │     │
│  │              │  │              │  │                  │     │
│  │  • JsonLd    │  │  • Button    │  │  • Map           │     │
│  │  • Schema    │  │  • Card      │  │  • Markers       │     │
│  │              │  │  • Dialog    │  │                  │     │
│  │              │  │  • 60+ more  │  │                  │     │
│  └──────────────┘  └──────────────┘  └──────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                │
│                                                                 │
│  ┌──────────────────────────┐  ┌────────────────────────────┐  │
│  │   Content (JSON)         │  │   Messages (i18n)          │  │
│  │                          │  │                            │  │
│  │  content/                │  │  messages/                 │  │
│  │  ├── capsules/*.json     │  │  ├── en.json               │  │
│  │  ├── poi/*.json          │  │  ├── he.json               │  │
│  │  └── faq.json            │  │  └── fr.json               │  │
│  │                          │  │                            │  │
│  │  • 7 Capsules            │  │  • Navigation              │  │
│  │  • 6 POIs                │  │  • Features                │  │
│  │  • 10 FAQs               │  │  • Booking UI              │  │
│  └──────────────────────────┘  └────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   UTILITY LAYER                                 │
│                                                                 │
│  lib/                                                           │
│  ├── simplebooking.ts    → Build booking URLs, track events    │
│  ├── schema.ts           → Generate JSON-LD structured data    │
│  └── utils.ts            → General utilities (cn, etc.)        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  EXTERNAL INTEGRATIONS                          │
│                                                                 │
│  ┌──────────────────┐  ┌───────────────────┐  ┌────────────┐  │
│  │  SimpleBooking   │  │  Google Analytics │  │  Pexels    │  │
│  │                  │  │                   │  │            │  │
│  │  • Booking URL   │  │  • Page views     │  │  • Images  │  │
│  │  • Parameters    │  │  • Events         │  │  • Stock   │  │
│  │  • Redirect      │  │  • Conversions    │  │    photos  │  │
│  └──────────────────┘  └───────────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### 1. User Visits Homepage

```
User → https://theopodhotel.com
  ↓
Middleware detects no locale
  ↓
Redirects to /he (default)
  ↓
Loads app/[locale]/page.tsx
  ↓
Fetches content/capsules/*.json
  ↓
Loads messages/he.json
  ↓
Renders homepage with Hebrew content
  ↓
Injects JSON-LD (Organization, WebSite schemas)
```

### 2. User Books a Capsule

```
User clicks "Book Now" on O Tight capsule
  ↓
BookingWidget opens
  ↓
User selects:
  • Check-in: 2025-10-15
  • Check-out: 2025-10-17
  • Adults: 2
  ↓
Widget calls buildSimpleBookingUrl()
  ↓
Generates URL:
  https://www.simplebooking.it/ibe2/hotel/9240?
  lang=HE&cur=ILS&checkin=2025-10-15&checkout=2025-10-17
  &adults=2&rooms=1&utm_source=website&utm_medium=booking_widget
  ↓
Fires GA4 event: begin_checkout
  ↓
Opens URL in new tab
  ↓
Fires GA4 event: outbound_click
  ↓
User completes booking on SimpleBooking
```

### 3. User Switches Language

```
User clicks LocaleSwitcher
  ↓
Selects "English"
  ↓
Component gets current path: /he/capsules/o-tight
  ↓
Constructs new path: /en/capsules/o-tight
  ↓
Navigates to /en/capsules/o-tight
  ↓
Middleware sets locale cookie
  ↓
Page re-renders with English content
  ↓
Loads messages/en.json
  ↓
Updates HTML lang="en" and dir="ltr"
```

### 4. Search Engine Crawls Site

```
Googlebot visits /en/capsules/o-tight
  ↓
Receives pre-rendered HTML (SSG)
  ↓
Finds structured data:
  • Product schema (capsule)
  • Offer schema (price, availability)
  • BreadcrumbList schema
  • ImageObject schemas
  ↓
Parses hreflang tags:
  • /he/capsules/o-tight (Hebrew)
  • /en/capsules/o-tight (English)
  • /fr/capsules/o-tight (French)
  ↓
Indexes page with rich snippets
  ↓
Displays in search with:
  • Star ratings (aggregated)
  • Price
  • Availability
```

## Component Hierarchy

```
RootLayout (app/layout.tsx)
  └── LocaleLayout (app/[locale]/layout.tsx)
      ├── Header
      │   ├── Logo
      │   ├── Navigation
      │   └── LocaleSwitcher
      ├── Main Content
      │   └── Page (varies by route)
      │       ├── Homepage
      │       │   ├── Hero Section
      │       │   ├── Features Grid
      │       │   ├── Capsules Carousel
      │       │   │   └── CapsuleCard × 6
      │       │   ├── Location Section
      │       │   └── Testimonials
      │       │
      │       ├── Capsules Listing
      │       │   └── CapsuleCard × 7
      │       │
      │       ├── Capsule Detail
      │       │   ├── Gallery
      │       │   ├── Specifications
      │       │   ├── Amenities Grid
      │       │   ├── BookingWidget (sticky)
      │       │   │   ├── DatePicker (check-in)
      │       │   │   ├── DatePicker (check-out)
      │       │   │   ├── GuestSelector
      │       │   │   └── BookButton
      │       │   └── FAQ Accordion
      │       │
      │       ├── FAQ Page
      │       │   └── Accordion × 10
      │       │
      │       ├── Contact Page
      │       │   ├── Contact Form
      │       │   ├── Contact Info
      │       │   └── Google Map
      │       │
      │       └── Hotel Page
      │           ├── Services Grid
      │           ├── Location Info
      │           └── Accessibility Statement
      ├── Footer
      │   ├── Contact Info
      │   ├── Quick Links
      │   ├── Social Media
      │   └── Legal Links
      └── Toaster (notifications)
```

## State Management

### No Global State Library
- Next.js App Router (server components by default)
- Client components marked with "use client"
- Local state with useState where needed
- URL state for filters/locale
- SessionStorage for booking criteria

### Client-Side State
```typescript
// BookingWidget.tsx
const [checkin, setCheckin] = useState<Date>();
const [checkout, setCheckout] = useState<Date>();
const [adults, setAdults] = useState<string>("1");

// LocaleSwitcher.tsx
const pathname = usePathname(); // URL state
```

### Server-Side Data
```typescript
// All page components are async server components
async function getCapsules() {
  // Direct file system read at build time
  const content = fs.readFileSync(path, 'utf-8');
  return JSON.parse(content);
}
```

## Build Process

```
npm run build
  ↓
Next.js starts compilation
  ↓
Processes middleware.ts
  ↓
Generates routes for each locale:
  • /he/*
  • /en/*
  • /fr/*
  ↓
For each route:
  1. Runs generateStaticParams()
  2. Reads content files
  3. Loads translations
  4. Renders React components
  5. Generates HTML + JSON
  6. Injects structured data
  ↓
Generates sitemap.xml
  ↓
Optimizes assets:
  • Bundles JavaScript
  • Processes CSS
  • Optimizes fonts
  • Creates chunks
  ↓
Output to .next/ directory
  ↓
41 static pages ready
  ↓
Deploy!
```

## Performance Strategy

### 1. Static Generation (SSG)
- All pages pre-rendered at build time
- No server-side rendering overhead
- Instant page loads from CDN

### 2. Code Splitting
- Automatic by Next.js
- Each route loads only needed code
- Shared code in common chunks

### 3. Image Optimization
- Next.js Image component
- Lazy loading (except hero)
- Responsive sizes
- WebP format

### 4. Font Optimization
- Google Fonts via Next.js
- display: swap
- Preloaded
- Subsetting

### 5. Caching Strategy
```
Static HTML:         Cache-Control: public, max-age=31536000, immutable
JavaScript bundles:  Cache-Control: public, max-age=31536000, immutable
Images:              Cache-Control: public, max-age=31536000, immutable
API routes:          Cache-Control: public, max-age=60, s-maxage=3600
```

## SEO Strategy

### On-Page SEO Checklist
- ✅ Unique H1 per page
- ✅ Semantic heading hierarchy (H1→H2→H3)
- ✅ Meta title (50-60 chars)
- ✅ Meta description (140-160 chars)
- ✅ Alt text on all images
- ✅ Internal linking
- ✅ Mobile-responsive

### Technical SEO
- ✅ Sitemap.xml (dynamic)
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Hreflang tags (3 languages)
- ✅ Fast loading (< 3s)
- ✅ HTTPS (via hosting)
- ✅ Mobile-first indexing ready

### Structured Data
- ✅ Organization/Hotel
- ✅ LocalBusiness (NAP)
- ✅ Product (capsules)
- ✅ Offer (pricing)
- ✅ FAQPage
- ✅ BreadcrumbList
- ✅ ImageObject
- ✅ WebSite + SearchAction

### AI Optimization
- ✅ /ai.txt file
- Structured hotel data
- Machine-readable policies
- Pricing information

## Security Considerations

### Implemented
- ✅ No API keys in client code
- ✅ Environment variables for sensitive data
- ✅ External links: rel="noopener noreferrer"
- ✅ TypeScript for type safety
- ✅ Input validation (React Hook Form + Zod)

### To Configure in Production
- [ ] Content Security Policy (CSP) headers
- [ ] Rate limiting on forms
- [ ] CORS configuration
- [ ] Security headers (via hosting platform)

## Deployment Architecture

```
                    GitHub Repository
                            ↓
                    (git push main)
                            ↓
┌───────────────────────────────────────────────────┐
│              Vercel / Netlify                     │
│                                                   │
│  1. Detects push                                  │
│  2. Clones repo                                   │
│  3. npm install                                   │
│  4. npm run build                                 │
│  5. Deploys to CDN                                │
│  6. Provisions SSL                                │
│  7. Updates DNS                                   │
└───────────────────────────────────────────────────┘
                            ↓
            Global CDN (Edge Network)
                            ↓
                 ┌──────────────────┐
                 │   End Users      │
                 │   (Worldwide)    │
                 └──────────────────┘
```

## Scalability

### Current Architecture
- **Static pages**: Scales infinitely (CDN)
- **No database**: No bottleneck
- **No server**: No capacity limits
- **Global CDN**: Fast everywhere

### If Adding Dynamic Features
- Use edge functions for server-side logic
- Implement caching strategies
- Use database connection pooling
- Consider ISR (Incremental Static Regeneration)

## Maintenance

### Regular Updates
- **Weekly**: Check analytics, errors
- **Monthly**: Update dependencies, review content
- **Quarterly**: Performance audit, SEO review

### Content Updates
```bash
# 1. Update content file
edit content/capsules/o-tight.json

# 2. Commit and push
git add .
git commit -m "Update O Tight pricing"
git push

# 3. Auto-deploys in 2-3 minutes
```

### Adding New Capsule
```bash
# 1. Create JSON file
touch content/capsules/o-luxury.json

# 2. Add data (follow schema)
# 3. Add images
mkdir -p public/images/capsules/o-luxury

# 4. Commit and push
# New page auto-generated at:
# /he/capsules/o-luxury
# /en/capsules/o-luxury
# /fr/capsules/o-luxury
```

---

**Last Updated**: 2025-10-03
