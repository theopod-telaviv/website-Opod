# Project Structure - The O Pod Hotel

## Directory Overview

```
the-o-pod-hotel/
│
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Locale-based routing
│   │   ├── capsules/            # Capsules listing & detail pages
│   │   │   ├── [slug]/          # Dynamic capsule detail page
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx         # Capsules listing
│   │   ├── contact/             # Contact page
│   │   │   └── page.tsx
│   │   ├── faq/                 # FAQ page
│   │   │   └── page.tsx
│   │   ├── hotel/               # Hotel info page
│   │   │   └── page.tsx
│   │   ├── layout.tsx           # Locale-specific layout (Header/Footer)
│   │   └── page.tsx             # Homepage
│   ├── globals.css              # Global styles & CSS variables
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Root redirect to default locale
│   └── sitemap.ts               # Dynamic sitemap generation
│
├── components/                   # React components
│   ├── booking/
│   │   └── BookingWidget.tsx    # Main booking interface
│   ├── capsules/
│   │   └── CapsuleCard.tsx      # Capsule display card
│   ├── layout/
│   │   ├── Header.tsx           # Site header with navigation
│   │   ├── Footer.tsx           # Site footer
│   │   └── LocaleSwitcher.tsx   # Language switcher dropdown
│   ├── seo/
│   │   └── JsonLd.tsx           # Structured data component
│   └── ui/                      # shadcn/ui components
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── ... (50+ UI components)
│
├── content/                      # Content data (JSON)
│   ├── capsules/                # Capsule data files
│   │   ├── o-tight.json
│   │   ├── o-dreamy.json
│   │   ├── o-dreamy-sea-view.json
│   │   ├── o-snug.json
│   │   ├── o-snug-sea-view.json
│   │   ├── o-comfy.json
│   │   └── o-grand.json
│   ├── poi/                     # Points of interest
│   │   ├── jaffa.json
│   │   ├── beach.json
│   │   ├── carmel-market.json
│   │   ├── neve-tzedek.json
│   │   ├── rothschild.json
│   │   └── sarona.json
│   └── faq.json                 # FAQ content
│
├── lib/                         # Utility functions
│   ├── simplebooking.ts         # SimpleBooking API integration
│   ├── schema.ts                # Structured data helpers
│   └── utils.ts                 # General utilities
│
├── messages/                    # i18n translation files
│   ├── en.json                  # English translations
│   ├── he.json                  # Hebrew translations
│   └── fr.json                  # French translations
│
├── public/                      # Static assets
│   ├── images/                  # Image assets
│   │   ├── capsules/           # Capsule photos
│   │   ├── poi/                # POI photos
│   │   └── hero/               # Hero images
│   ├── robots.txt              # Search engine directives
│   └── ai.txt                  # AI Engine Optimization
│
├── hooks/                       # Custom React hooks
│   └── use-toast.ts            # Toast notification hook
│
├── .env.local                   # Environment variables (not in git)
├── i18n.ts                      # i18n configuration
├── middleware.ts                # Next.js middleware (locale routing)
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Main documentation
├── QA_CHECKLIST.md             # Quality assurance checklist
└── PROJECT_STRUCTURE.md         # This file
```

## Key Files Explained

### Configuration Files

#### `next.config.js`
- Configures Next.js
- Integrates next-intl plugin
- Sets up image optimization domains

#### `tailwind.config.ts`
- Tailwind CSS configuration
- Custom color palette
- Font family definitions
- shadcn/ui integration

#### `tsconfig.json`
- TypeScript compiler options
- Path aliases (@/ for root)

#### `middleware.ts`
- Handles locale-based routing
- Redirects to appropriate language
- Sets locale cookie

#### `i18n.ts`
- Configures next-intl
- Defines available locales
- Sets default locale
- Loads translation messages

### Application Files

#### `app/[locale]/layout.tsx`
- Wraps all localized pages
- Includes Header and Footer
- Provides i18n context
- Sets HTML lang and dir attributes

#### `app/[locale]/page.tsx`
- Homepage
- Hero section with video
- Featured capsules grid
- Testimonials
- Location info

#### `app/[locale]/capsules/page.tsx`
- Lists all available capsules
- Filtering by occupancy/features
- Links to detail pages

#### `app/[locale]/capsules/[slug]/page.tsx`
- Dynamic capsule detail page
- Gallery, amenities, specs
- Booking widget
- FAQ specific to capsule
- Structured data (Product/Offer)

### Components

#### `components/booking/BookingWidget.tsx`
- Collects booking criteria
- Date pickers (check-in/out)
- Guest selectors (adults/children)
- Room counter
- Builds SimpleBooking URL
- Tracks GA4 events
- Opens booking in new tab

#### `components/layout/Header.tsx`
- Sticky navigation
- Logo and brand
- Main menu
- Language switcher
- Mobile menu toggle
- CTA button

#### `components/layout/Footer.tsx`
- Contact information
- Quick links
- Social media
- Legal links
- Copyright

#### `components/layout/LocaleSwitcher.tsx`
- Dropdown menu
- Switches between he/en/fr
- Preserves current page path

#### `components/capsules/CapsuleCard.tsx`
- Displays capsule info
- Image, name, price
- Key features (sea view, accessible)
- "View Details" button
- Hover effects

#### `components/seo/JsonLd.tsx`
- Renders JSON-LD script tags
- Accepts structured data object
- Used throughout for SEO

### Library Files

#### `lib/simplebooking.ts`
- `buildSimpleBookingUrl()` - Constructs booking URL
- `trackBookingEvent()` - Fires GA4 events
- Handles locale/currency mapping
- Adds UTM parameters

#### `lib/schema.ts`
- `getOrganizationSchema()` - Hotel/business schema
- `getWebsiteSchema()` - Website + SearchAction
- `getBreadcrumbSchema()` - Breadcrumb navigation
- `getCapsuleSchema()` - Product/Offer for rooms
- `getFAQSchema()` - FAQ page schema
- All return valid JSON-LD objects

### Content Files

#### `content/capsules/*.json`
Each capsule has:
- `id`, `name`, `slug`
- `occupancy`, `bed`, `dimensions_m`
- `sea_view`, `accessible`, `balcony` flags
- `price_from` (ILS, USD, EUR)
- `amenities` array
- `images` array
- `short`, `description` (multilingual)
- `faq` (optional, multilingual)

#### `content/poi/*.json`
Each POI has:
- `id`, `title` (multilingual)
- `category` (beach, food, culture)
- `distance_min_walk`
- `lat`, `lng` coordinates
- `image` path
- `desc` (multilingual)
- `maps_url` for directions

#### `content/faq.json`
- Array of Q&A items
- Each with `q` and `a` objects
- All keys have he/en/fr translations

### Translation Files

#### `messages/{locale}.json`
Organized by namespace:
- `nav` - Navigation labels
- `hero` - Homepage hero section
- `features` - Hotel features/amenities
- `capsules` - Capsule-related text
- `booking` - Booking widget labels
- `footer` - Footer content
- `testimonials` - Reviews section
- `reassurance` - Trust badges

## Data Flow

### Booking Flow
1. User interacts with `BookingWidget`
2. Selects dates, guests, room
3. Clicks "Book Now"
4. Widget calls `buildSimpleBookingUrl()`
5. Fires GA4 event `begin_checkout`
6. Opens SimpleBooking in new tab
7. Fires GA4 event `outbound_click`

### Content Rendering
1. Page loads (e.g., `/he/capsules/o-tight`)
2. `getCapsule()` reads JSON from `content/capsules/`
3. Component receives capsule data
4. Renders with locale-specific strings
5. Injects structured data via `JsonLd`

### Locale Switching
1. User clicks `LocaleSwitcher`
2. Selects new locale
3. Component constructs new path
4. Next.js navigates to new locale
5. Middleware sets locale cookie
6. Page re-renders with new translations

## Adding New Content

### New Capsule
1. Create `/content/capsules/new-capsule.json`
2. Follow schema of existing capsules
3. Add images to `/public/images/capsules/new-capsule/`
4. Rebuild site (`npm run build`)
5. New page auto-generated at `/[locale]/capsules/new-capsule`

### New POI
1. Create `/content/poi/new-poi.json`
2. Follow schema of existing POIs
3. Add image to `/public/images/poi/`
4. Import and display in `/experience-tel-aviv` page

### New Translation
1. Add key to all files in `/messages/`
2. Use in component: `const t = useTranslations('namespace')`
3. Access: `t('key')`

## Build Output

### Production Build
```bash
npm run build
```
Generates:
- Static HTML for all pages (SSG)
- Optimized JavaScript bundles
- Sitemap.xml
- Prerendered pages for all locales

### Bundle Sizes (approximate)
- Homepage: ~91 KB First Load JS
- Capsule List: ~91 KB First Load JS
- Capsule Detail: ~158 KB First Load JS (includes booking widget)
- FAQ: ~92 KB First Load JS
- Middleware: ~58 KB

## Performance Optimizations

1. **Static Generation** - All pages pre-rendered at build
2. **Image Optimization** - Next.js Image component
3. **Font Optimization** - Google Fonts with display: swap
4. **Code Splitting** - Automatic by Next.js
5. **Tree Shaking** - Unused code removed
6. **Compression** - Gzip/Brotli in production
7. **Caching** - Static assets cached long-term

## SEO Strategy

1. **Structured Data** - Rich snippets for all page types
2. **Sitemaps** - Dynamic generation for all pages/locales
3. **Hreflang** - Automatic via next-intl
4. **Meta Tags** - Unique per page, per locale
5. **Semantic HTML** - Proper heading hierarchy
6. **Internal Linking** - Cross-links between related pages
7. **Mobile-First** - Responsive, fast on mobile
8. **AI.txt** - Machine-readable hotel info

## Maintenance

### Regular Updates
- Review and update capsule prices
- Add new capsule types
- Update FAQ with new questions
- Refresh POI information
- Update seasonal content

### Monitoring
- Google Search Console
- Google Analytics 4
- Core Web Vitals
- Booking conversion rate
- Error logs

### Content Updates
All content is in JSON files - no code changes needed for:
- Price updates
- New capsules
- FAQ additions
- POI changes
- Translation tweaks
