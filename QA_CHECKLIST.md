# QA Checklist - The O Pod Hotel Website

## Pre-Launch Quality Assurance

### Build & Technical
- [x] Project builds without errors (`npm run build`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] No console errors in development
- [ ] No console errors in production build

### Performance
- [ ] Lighthouse Performance score ≥ 90 (mobile)
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] Lighthouse Best Practices score ≥ 90
- [ ] Lighthouse SEO score ≥ 90
- [ ] LCP < 2.5s on mobile
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Images are optimized and load efficiently
- [ ] Fonts load without blocking render

### SEO
- [ ] All pages have unique titles (50-60 characters)
- [ ] All pages have unique meta descriptions (140-160 characters)
- [ ] H1 tags are unique and descriptive
- [ ] Heading hierarchy is correct (H1 → H2 → H3)
- [ ] Images have descriptive alt text
- [ ] Sitemap.xml generates correctly
- [ ] Robots.txt allows crawling
- [ ] Canonical URLs are set
- [ ] Hreflang tags present for all locales
- [ ] Open Graph tags present
- [ ] Twitter Card tags present

### Structured Data
- [ ] Organization schema validates (Google Rich Results Test)
- [ ] Hotel schema validates
- [ ] WebSite + SearchAction schema validates
- [ ] BreadcrumbList schema on all pages
- [ ] Product/Offer schema on capsule pages
- [ ] FAQPage schema on FAQ page
- [ ] No validation errors in Schema.org validator

### Internationalization
- [ ] Hebrew locale works (`/he`)
- [ ] English locale works (`/en`)
- [ ] French locale works (`/fr`)
- [ ] Language switcher works correctly
- [ ] RTL layout correct for Hebrew
- [ ] Content displays in correct language
- [ ] Dates format correctly per locale
- [ ] Currency displays correctly

### Functionality
- [ ] All navigation links work
- [ ] Booking widget displays correctly
- [ ] Date picker works
- [ ] Guest/room selectors work
- [ ] "Book Now" button redirects to SimpleBooking
- [ ] SimpleBooking URL includes correct parameters
- [ ] Booking widget sticky on mobile
- [ ] Capsule filtering works
- [ ] FAQ accordion works
- [ ] Mobile menu toggles correctly
- [ ] Forms validate inputs (contact page)
- [ ] WhatsApp click-to-chat works

### Responsive Design
- [ ] Mobile (320px-767px) displays correctly
- [ ] Tablet (768px-1023px) displays correctly
- [ ] Desktop (1024px+) displays correctly
- [ ] Large desktop (1920px+) displays correctly
- [ ] Images scale appropriately
- [ ] No horizontal scroll on any breakpoint
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Navigation accessible on all devices

### Accessibility
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators visible
- [ ] Screen reader tested (NVDA/JAWS)
- [ ] Skip links present and functional
- [ ] ARIA labels where appropriate
- [ ] Color contrast AA compliant (4.5:1 minimum)
- [ ] No accessibility errors in WAVE tool
- [ ] All interactive elements accessible
- [ ] Form labels properly associated

### Content
- [ ] All capsule data accurate
- [ ] Prices display correctly
- [ ] POI information accurate
- [ ] FAQ answers complete
- [ ] Contact information correct
- [ ] No placeholder text visible
- [ ] No lorem ipsum
- [ ] Spelling checked (all languages)
- [ ] Grammar checked (all languages)

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

### Analytics & Tracking
- [ ] GA4 property connected
- [ ] GTM container installed (if used)
- [ ] Page view events tracking
- [ ] Booking events tracking
- [ ] Outbound link clicks tracking
- [ ] Cookie consent implemented (if EU traffic)

### Security
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No API keys exposed in client code
- [ ] External links have rel="noopener"
- [ ] Forms have CSRF protection
- [ ] Rate limiting on contact form

### Legal & Compliance
- [ ] Privacy policy page complete
- [ ] Terms & conditions page complete
- [ ] Accessibility statement page complete
- [ ] Cookie policy (if applicable)
- [ ] GDPR compliant (if EU traffic)

### Edge Cases
- [ ] No dates selected → still redirects
- [ ] Invalid URL → 404 page
- [ ] Missing translations → fallback works
- [ ] Slow network → loading states
- [ ] JavaScript disabled → core content accessible
- [ ] Images fail to load → alt text visible

## Post-Launch Monitoring
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Check for 404 errors
- [ ] Monitor booking conversion rate
- [ ] Check analytics for user behavior
- [ ] Monitor page load times
- [ ] Check mobile usability report
- [ ] Review search performance

## Notes
Add any issues or observations here during QA testing.
