# The O Pod Hotel - Website

Modern, multilingual website for The O Pod Hotel in Tel Aviv. Built with Next.js 13, TypeScript, Tailwind CSS, and optimized for conversion and SEO.

## Project Overview

This is a production-ready website featuring:
- **Multilingual support** (Hebrew, English, French) with next-intl
- **Modern pod hotel booking** with SimpleBooking integration
- **Ultra-SEO optimized** with structured data (JSON-LD)
- **Mobile-first responsive design**
- **Accessible** (WCAG 2.2 AA compliant)
- **High performance** (Lighthouse 90+ target)

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Internationalization**: next-intl
- **Booking Integration**: SimpleBooking API

## Project Structure

```
/
├── app/
│   ├── [locale]/                    # Localized routes
│   │   ├── layout.tsx              # Locale-specific layout
│   │   ├── page.tsx                # Homepage
│   │   ├── capsules/               # Capsules listing & details
│   │   ├── hotel/                  # Hotel info page
│   │   ├── experience-tel-aviv/    # City guide
│   │   ├── faq/                    # FAQ page
│   │   └── contact/                # Contact page
│   ├── layout.tsx                  # Root layout
│   └── sitemap.ts                  # Dynamic sitemap
├── components/
│   ├── booking/                    # Booking widget
│   ├── capsules/                   # Capsule cards & galleries
│   ├── layout/                     # Header, Footer, LocaleSwitcher
│   ├── seo/                        # SEO components (JsonLd)
│   └── ui/                         # shadcn/ui components
├── content/
│   ├── capsules/                   # Capsule data (JSON)
│   ├── poi/                        # Points of interest
│   └── faq.json                    # FAQ content
├── lib/
│   ├── simplebooking.ts           # SimpleBooking integration
│   ├── schema.ts                   # Structured data helpers
│   ├── i18n.ts                     # i18n configuration
│   └── utils.ts                    # Utility functions
├── messages/                       # Translation files
│   ├── en.json
│   ├── he.json
│   └── fr.json
├── public/
│   ├── images/                     # Static images
│   ├── robots.txt                  # SEO robots file
│   └── ai.txt                      # AI Engine Optimization
├── middleware.ts                   # i18n middleware
└── i18n.ts                        # i18n config
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (copy `.env.local`):

```env
SIMPLEBOOKING_BASE_URL=https://www.simplebooking.it/ibe2/hotel/9240
DEFAULT_CURRENCY=ILS
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Build

```bash
npm run build
npm run start
```

### Type Check

```bash
npm run typecheck
```

## Features

### 1. Multilingual (i18n)

- **Default locale**: Hebrew (`he`)
- **Available locales**: Hebrew (`he`), English (`en`), French (`fr`)
- Routes are automatically prefixed: `/he`, `/en`, `/fr`
- Language switcher in header
- RTL support for Hebrew

### 2. Booking Integration

The booking widget collects:
- Check-in / Check-out dates
- Number of adults, children, rooms
- Selected capsule type (optional)

When user clicks "Book Now", the system:
1. Tracks event in GA4 (`begin_checkout`, `outbound_click`)
2. Builds SimpleBooking URL with all parameters
3. Opens booking in new tab
4. Saves criteria to sessionStorage

**SimpleBooking URL Format:**
```
https://www.simplebooking.it/ibe2/hotel/9240?lang=EN&cur=ILS&checkin=2025-10-15&checkout=2025-10-17&adults=2&rooms=1&utm_source=website&utm_medium=booking_widget&utm_campaign=direct
```

### 3. Content Management

All content is stored in JSON files under `/content`:

- **Capsules**: `/content/capsules/*.json`
- **POIs**: `/content/poi/*.json`
- **FAQ**: `/content/faq.json`

To add a new capsule:
1. Create JSON file in `/content/capsules/`
2. Follow the schema (see existing files)
3. Rebuild the site

### 4. SEO & Structured Data

Every page includes:
- Unique `<title>` and `<meta description>`
- Open Graph tags
- Canonical URLs
- Hreflang tags (automatic via next-intl)
- JSON-LD structured data:
  - `Organization` / `Hotel`
  - `WebSite` with `SearchAction`
  - `BreadcrumbList`
  - `Product` / `HotelRoom` + `Offer`
  - `FAQPage`
  - `ImageObject`

**Validate structured data:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 5. Performance Optimization

- Next.js Image optimization
- Static site generation (SSG) where possible
- Font optimization (Google Fonts with display: swap)
- Lazy loading images
- Preconnect to external domains

**Target Metrics:**
- LCP < 2.0s
- CLS < 0.1
- INP < 200ms
- Lighthouse Score: 90+

### 6. Accessibility

- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation
- Focus indicators
- Color contrast AA compliant
- Skip links
- Alt text for all images

### 7. Analytics

Google Analytics 4 events tracked:
- `page_view` (automatic)
- `view_item_list` (capsules listing)
- `select_item` (capsule detail)
- `begin_checkout` (booking widget)
- `outbound_click` (SimpleBooking redirect)

Configure GA4 ID in `.env.local`.

## Color Palette

Based on "Urban-Coastal Minimal Luxury":

```css
--sand: #F5EFE7
--bone-white: #FAFAF7
--light-wood: #D8C3A5
--turquoise-sea: #2EC4B6
--matte-black: #1C1C1C
--soft-gold: #C9A227 (accent)
```

## Typography

- **Body text**: Inter (via Google Fonts)
- **Headings**: Manrope (via Google Fonts)
- **Line height**: 150% (body), 120% (headings)

## Deployment

### Vercel (Recommended)

1. Connect your Git repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Other Platforms

Works on any platform supporting Next.js:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Self-hosted with Node.js

## Environment Variables

Required:
- `SIMPLEBOOKING_BASE_URL` - SimpleBooking hotel URL
- `DEFAULT_CURRENCY` - Default currency (ILS, USD, EUR)

Optional:
- `NEXT_PUBLIC_GA4_ID` - Google Analytics 4 ID
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID

## Content Guidelines

### Writing Style

- **Tone**: Warm, direct, minimalist
- **Voice**: Active, welcoming
- **Length**: Concise but informative
- **Language**: Simple, accessible

### SEO Best Practices

1. **Title tags**: 50-60 characters
2. **Meta descriptions**: 140-160 characters
3. **H1**: One per page, include primary keyword
4. **H2-H6**: Hierarchical, descriptive
5. **Alt text**: Descriptive, include context
6. **Internal linking**: Connect related pages

### Images

- **Format**: WebP (with fallback)
- **Dimensions**: Responsive, multiple sizes
- **Alt text**: Required, descriptive
- **Loading**: Lazy (except hero/LCP images)
- **Source**: Pexels stock photos or original

## Testing Checklist

### Pre-Launch QA

- [ ] All pages load without errors
- [ ] Mobile responsive (320px - 2560px)
- [ ] All links work
- [ ] Forms submit correctly
- [ ] Booking widget redirects properly
- [ ] Language switcher works
- [ ] Images load correctly
- [ ] No console errors
- [ ] Lighthouse score 90+ (mobile)
- [ ] Accessibility: WAVE tool passes
- [ ] Structured data validates
- [ ] Sitemap generates correctly
- [ ] Robots.txt allows crawling
- [ ] Hreflang tags present
- [ ] GA4 events fire

### Browser Testing

- Chrome
- Firefox
- Safari
- Edge
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Troubleshooting

### Issue: i18n routes not working

**Solution**: Check middleware.ts configuration and ensure locales match in all config files.

### Issue: Images not loading

**Solution**: Verify Next.js image configuration in `next.config.js` and check image paths.

### Issue: Booking widget not redirecting

**Solution**: Check `SIMPLEBOOKING_BASE_URL` environment variable and browser console for errors.

### Issue: Build fails

**Solution**: Run `npm run typecheck` to identify TypeScript errors.

## Contributing

When adding features:
1. Follow existing code patterns
2. Maintain accessibility standards
3. Add appropriate structured data
4. Test on mobile devices
5. Update this README if needed

## Support

For technical issues or questions:
- Email: dev@theopodhotel.com
- Documentation: This README

## License

Proprietary - The O Pod Hotel

---

**Built with care for The O Pod Hotel, Tel Aviv**
