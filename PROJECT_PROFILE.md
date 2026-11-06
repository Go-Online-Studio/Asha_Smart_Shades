# Asha Smart Shades — Project and Company Profile

This document is a reusable context brief for AI assistants, designers, developers, content writers, and other collaborators working on this website. It describes what is currently represented in the repository; it is not a substitute for confirming business, legal, product, or deployment facts with the company.

## How an AI should use this profile

- Treat details explicitly marked **Code-backed** as facts represented by the current website implementation, not necessarily independently verified facts about the legal entity or real-world business.
- Treat **Needs confirmation** items as unknown. Do not invent answers or present assumptions as facts.
- Marketing copy, partner logos, product specifications, guarantees, dates, and performance claims in the site have not been independently validated. Confirm them before repeating them in public-facing content.
- Preserve the brand name **Asha Smart Shades** and the architectural shading niche unless the user directs otherwise. The repository name mentions “Asha_RehanInternational,” but the implemented website consistently presents Asha Smart Shades.
- Keep recommendations grounded in the existing React + TypeScript + Vite implementation unless a migration or different stack is explicitly requested.
- Do not add made-up prices, certifications, project references, customer endorsements, service guarantees, legal policies, or contact details.

## 1. Project intake

| Field | Current project information |
|---|---|
| Business / website name | **Asha Smart Shades** (code-backed brand). Structured data also lists **Asha Industries** as an alternate name; the legal/business relationship needs confirmation. |
| Tagline / positioning | “Architectural Tension Systems & Intelligent Exterior Shading. Engineered for precision, crafted for elegance.” (footer positioning). Other site copy describes bespoke architectural shading and high-performance tension systems. |
| Industry / niche | Custom architectural shading and outdoor structures: retractable awnings, glazed and fabric canopies, tensile membranes, gazebos, and umbrellas. |
| Primary goal | Generate consultation and project inquiries through phone, WhatsApp, and the contact brief. This is inferred from the prominent calls to action and contact flow. |
| Target audience | Architects and designers, luxury homeowners, commercial property owners/operators, hospitality venues, and industrial/commercial estates. These audiences are identified in site copy; exact buyer personas are not documented. |
| Primary location / service area | Workshop address is in Makarpura GIDC / Vadsar, Vadodara, Gujarat, India. Site copy says work is undertaken across Gujarat and for significant commercial projects nationwide. Confirm actual service coverage before making commitments. |
| Languages / locales | English-only implementation is evident (`index.html` uses `lang="en"`). No locale selector or translation system was found. Indian contact details and location indicate an India-focused presentation; `en-IN` is a reasonable proposed locale, not a configured locale. |
| Canonical production domain | `https://www.ashasmartshades.com` appears in the LocalBusiness structured data. It is the intended domain in code; live ownership, availability, and production status are unverified. |
| Preferred domain variant | `www` is used in the structured-data URL. No redirect or canonical-link configuration was found, so the preferred production variant should be confirmed and configured consistently. |
| Requested / current tech stack | **Current:** React 19, TypeScript, Vite 6, Tailwind CSS 4, React Router 7. Uses Swiper, Fancybox, GSAP/ScrollTrigger, and Lucide icons in the implementation. |
| Hosting platform | **Unknown.** Vite builds a static frontend to `dist`; hosting provider, server configuration, and SPA route fallback behavior are not specified in the repository. |
| Site type | Multi-page, client-rendered marketing and product-information website (React single-page application with browser routes). Not an e-commerce checkout site. |
| Required pages / routes | `/`, `/about`, `/faq`, `/blog`, `/blog/:id`, `/contact`, `/products/:productId`. Product routes cover the four categories below. Unknown routes are redirected by the page components rather than showing a dedicated 404 page. |
| Primary conversion actions | Book/request a consultation; submit an inquiry through WhatsApp; call the business; email the business; open map directions. Product pages also provide a WhatsApp inquiry CTA. |
| Forms and data handling | Contact form validates name, phone, product interest, and message in the browser, then composes a WhatsApp message addressed to `+91 95747 20006`. It does not submit to a server or database. The email form in `Newsletter.tsx` prevents normal submission and has no visible provider/backend; that component is not rendered by the current route tree. |
| Analytics / tracking | No analytics or advertising-tracking integration was found in the application source. Confirm whether an external hosting/tag manager adds any. |
| Integrations | WhatsApp links, `tel:` phone links, `mailto:` email links, Google Maps directions/embed, Google Fonts. No CRM, booking platform, payment provider, or CMS integration was found. |
| Assets provided | Local logo files, product and project photography/graphics, desktop/mobile banner images, product galleries, blog images, and partner-logo images under `public/images/`. One FAQ image is loaded from Unsplash. |
| Content status | Existing English marketing copy and product/FAQ/blog content are present. Some may be illustrative or unverified; validate claims and replace generic/template-style blog article body copy before treating it as authoritative. |
| Compliance notes | No privacy, cookie, terms, or accessibility statement pages were found. No cookie-consent flow was found. Applicable privacy, cookie, consumer, accessibility, and other legal requirements need review based on actual analytics, data collection, and deployment. |

## 2. Company, services, and positioning

### Business summary

The website presents Asha Smart Shades as a Vadodara-based provider of bespoke exterior shading and architectural tension systems. The offer combines design/consultation, site measurement, custom CAD estimates, product selection, and installation-oriented solutions for residential and commercial environments.

### Product families represented in the site

1. **Retractable Awnings** — described as folding-arm and potentially motorized shading, with fabric options and optional smart controls in site copy.
2. **Glazed & Fabric Canopies** — entrance and outdoor canopies using glass or fabric and custom frameworks.
3. **Tensile Membranes** — large-span membrane structures and sculptural tension forms.
4. **Gazebos & Umbrellas** — outdoor garden, residential, and hospitality shading structures.

These are the website's advertised categories. Exact product availability, configurations, materials, and installation scope should be confirmed with the business.

### Services and differentiators represented in site copy

- Site measurement and design consultation.
- Custom CAD estimates / preliminary models.
- Bespoke design for residential, commercial, hospitality, and industrial use.
- Architectural integration, outdoor comfort, weather protection, and visual design.
- References to professional installation and coverage across Gujarat / India.

Claims about engineering capabilities, weather performance, material grades, smart-home compatibility, warranty, and lifespan appear in the website content and FAQs. Do not treat those claims as validated technical specifications or contractual terms without business confirmation.

### Business contact details in current code

- **Address:** 48, GIDC Rd, Makarpura GIDC, Vadsar, Vadodara, Gujarat 390010, India.
- **Phone / WhatsApp:** +91 95747 20006.
- **Email:** Contact@Ashasmartshades.Com (case-insensitive as an email address; verify it is monitored).
- **Listed availability:** Sunday–Friday, 8:00 AM–5:00 PM; architectural consultations by appointment. Confirm timezone, holiday schedule, and accuracy before publishing elsewhere.
- **Map:** Google Maps directions link and embedded map are present on the contact page.

## 3. Brand, theme, and design system

| Design field | Current implementation |
|---|---|
| Reference website / theme | No external reference site is documented. |
| Design mood | Premium, architectural, editorial, modern, and engineering-led (inferred from copy, photography, typography, and layouts). |
| Brand personality | Bespoke, precise, elegant, engineered, premium (inferred; not an official brand guide). |
| Primary color | Brand blue `#2a6fdd`. |
| Secondary color | Brand green `#17be74`. |
| Accent colors | Dark `#0b0301`; charcoal `#1a1a1a`; supporting gray `#bbbbbb`; light background `#f5f5f4`. Some sections also use custom pale green `#b8d7c9`. |
| Heading font | Playfair Display (Google Fonts). |
| Body font | Inter (Google Fonts). |
| Image style | Supplied architectural/product photography, including responsive desktop/mobile banners, product galleries, and partner logos. |
| Layout / interaction style | Full-width visual hero slides, large editorial headings, image-led product sections, galleries/carousels, FAQ accordions, responsive navigation, and floating phone/WhatsApp actions. |

Color values and font families above are read from `src/index.css` and `index.html`; design mood/personality are descriptive interpretations, not confirmed brand-guide language.

## 4. Pages and user journeys

| Route | Purpose / content |
|---|---|
| `/` | Brand introduction, hero carousel, about summary, featured product and project content, product-category links, image grid, blog highlights, and partner-logo section. |
| `/about` | Heritage/company narrative, workshop and engineering messaging, imagery, and partner logos. “Since 1998” appears in page copy and should be confirmed before external reuse. |
| `/products/retractable-awnings` | Product description, features, gallery, related products, FAQ, and WhatsApp inquiry CTA. |
| `/products/glazed-canopies` | Glazed and fabric canopy information, features, gallery, related products, FAQ, and WhatsApp inquiry CTA. |
| `/products/tensile-membranes` | Tensile membrane information, features, gallery, related products, FAQ, and WhatsApp inquiry CTA. |
| `/products/gazebos-umbrellas` | Gazebo and umbrella information, features, gallery, related products, FAQ, and WhatsApp inquiry CTA. |
| `/faq` | FAQ content and support CTA. |
| `/blog` | Five article cards with categories, dates, excerpts, and images. Dates currently range from June to August 2024. |
| `/blog/:id` | Shared article template. The body contains generic architectural-shading content and is substantially similar across article IDs; verify or replace it with article-specific, reviewed content. Unknown IDs redirect to `/blog`. |
| `/contact` | Workshop/contact information, business hours, WhatsApp inquiry form, and embedded Google Map. |

**Primary inquiry journey:** explore a product or project → select “Book Consultation” / a WhatsApp inquiry action → provide project/contact details → continue in WhatsApp. Phone, email, and map actions provide direct alternatives.

There is no visible pricing catalog, cart, payment flow, customer login, CMS/editorial interface, or backend account area.

## 5. Technical project notes for AI and developers

- **Entry point:** `src/main.tsx`; application routes and shared layout are in `src/App.tsx`.
- **Routing:** React Router browser routes; ensure the production web server rewrites application routes to `index.html` if direct route refreshes are required.
- **Build / run:** `npm run dev` starts Vite on port 3000; `npm run build` creates the production build; `npm run lint` runs `tsc --noEmit`.
- **Assets:** public assets are served from root-relative URLs such as `/images/...`; the source images live under `public/images/`.
- **Contact processing:** WhatsApp messages are assembled client-side. No form data persistence or backend request is implemented.
- **External dependencies/data:** Google Fonts, Google Maps, WhatsApp, and one Unsplash-hosted image are referenced by the frontend. Consider availability, privacy disclosures, consent requirements, and third-party loading behavior when deploying.
- **Structured data:** `src/App.tsx` outputs `LocalBusiness` JSON-LD with business name, alternate name, address, phone, description, URL, and coordinates. Keep it accurate and consistent with visible business details. The current HTML does not define a canonical link.
- **Metadata:** `index.html` includes an English document language, title, description, responsive viewport, font requests, and a hero-image preload. Page-specific metadata/social previews were not identified.
- **Known implementation note:** `src/components/Newsletter.tsx` currently has a submit handler that only prevents default submission and is not included in the active page tree. Do not describe newsletter signup as operational unless it is wired to a service.
- **Other implementation note:** analytics/tracking, CMS, server API, database, and persistent lead storage were not identified in the checked application code. Do not assume they exist outside the repository.

## 6. Important items to confirm with the company

1. Official/legal entity name and the relationship between **Asha Smart Shades** and **Asha Industries**.
2. Whether `https://www.ashasmartshades.com` is the live canonical domain and whether `www` is preferred.
3. Current service/install coverage, target customer segments, and whether nationwide service claims remain accurate.
4. Exact operating hours, contact email, phone/WhatsApp number, and workshop address.
5. Establishment date (“Since 1998”) and any experience/heritage claims.
6. Product materials, technical capabilities, safety/structural standards, weather ratings, smart integrations, warranties, and maintenance guidance.
7. Whether partner logos represent approved customers/partners and are authorized for use.
8. Whether the published blog entries and dates are intended as current editorial content; several article pages appear to share generic body copy.
9. Hosting provider, production URL behavior, form/lead handling needs, analytics, CRM, and any privacy/cookie obligations.
10. Approved logo/color/font brand guidelines, preferred locale(s), and accessibility target.

## 7. Repository pointers

- App routes and structured data: `src/App.tsx`
- Home page composition: `src/pages/Home.tsx`
- Product catalog content: `src/pages/ProductPage.tsx`
- Contact form and business contact details: `src/pages/Contact.tsx`
- FAQ content: `src/components/FAQ.tsx`
- Blog post metadata and article template: `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`
- Global style tokens: `src/index.css`
- Document title, description, and font loading: `index.html`
- Company logos, product imagery, and galleries: `public/images/`
