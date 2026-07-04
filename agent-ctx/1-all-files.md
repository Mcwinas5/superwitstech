# Task 1-10: Admin pages, chatbot, unsubscribe, sitemap, robots, 404

## Files Created/Modified

### Modified
- `src/app/api/audit-requests/route.ts` — Added GET endpoint with admin auth, pagination, and search filtering (by name, email, businessName)

### Created (8 files)
1. **`src/app/admin/page.tsx`** — Admin login page with centered card, "Superwits tech" logo, password input, amber login button, error handling, redirects to /admin/dashboard on success
2. **`src/app/admin/dashboard/page.tsx`** — Full admin dashboard: auth check, 5 stat cards (Total/New/Contacted/Converted/Do Not Contact), debounced search bar, data table with colored status badges, business type badges, mailto/wa.me links, status dropdown (PATCH), CSV export, back links
3. **`src/app/admin/analytics/page.tsx`** — Analytics placeholder with auth check, "Performance Analytics" heading, "being rebuilt" message, back link to dashboard
4. **`src/app/unsubscribe/[token]/page.tsx`** — Server component: looks up AuditRequest by unsubscribeToken, marks as unsubscribed or shows already/error state, centered card with icon, dark styling
5. **`src/app/sitemap.ts`** — Generates sitemap XML with 7 URLs and metadata
6. **`src/app/robots.ts`** — Robots config: allow /, disallow /admin/ and /api/, sitemap reference
7. **`src/app/not-found.tsx`** — 404 page with large amber "404", Navigation + Footer components, back to home button
8. **`src/components/chatbot/QualifyingChatbot.tsx`** — Matching original: 5 qualifying questions, fixed bottom-right modal (w-96, h-600px), white bg, dark gradient header with progress, bot messages on left (white card with border), user messages on right (amber bg), loading dots, auto-close after completion, uses fetch API (not tRPC)

## Design System
- Dark navy (#07122A) backgrounds, card bg (#0F1F3D), amber (#D97706) accents, text (#F1F5F9), muted (#94A3B8), border (#1A3260)
- Syne headings, Inter body, DM Mono labels

## Lint Status
All new files pass lint with zero errors. Existing errors are in the upload/ reference directory only.