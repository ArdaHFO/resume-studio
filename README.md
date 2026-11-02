<p align="center">
  <img src="app/icon.png" width="112" alt="CSPARK application icon" />
</p>

<h1 align="center">CSPARK CV Builder</h1>

<p align="center"><strong>Shape your experience. Prepare your next application.</strong></p>
<p align="center">A CV editor and career workspace with AI-assisted tailoring, job search and application tracking.</p>

<p align="center">
  <strong>English</strong> · <a href="README.tr.md">Türkçe</a><br />
  <a href="#run-locally"><strong>Run locally</strong></a> ·
  <a href="#inside-the-workspace">Explore the features</a> ·
  <a href="https://github.com/ArdaHFO/CV1/issues">Report an issue</a>
</p>

---

Build a CV, compare versions for different roles, explore job listings, and keep applications in one workspace. The `CV1` repository uses the **CSPARK** product identity found in the application metadata. Its interface includes form-based editing, three CV templates, AI suggestions, browser printing and share links.

**This is a development-stage web application.** Several integrations require external accounts, while parts of the editor and version history use browser-local storage. Source-backed features below describe the implementation, not a claim that every deployed workflow has been validated.

## Get started

| Requirement | Repository setup |
| --- | --- |
| Runtime | Node.js 20.9.0 or newer |
| Package manager | npm and the committed lockfile |
| Accounts and data | Supabase project with Auth and the supplied SQL schema |
| Main AI service | Groq API key for the configured Llama 3.3 model |
| Optional services | Apify job sources, Stripe billing and Resend reminders |

1. Complete the local setup and create an account through the application.
2. Create a CV or import a supported document, then edit personal details, experience, education and skills.
3. Choose a template, review AI suggestions where configured, and use the print or sharing workflow.
4. Search for roles and record application progress in the career dashboard.

## Inside the workspace

- **Structured CV editing.** Separate forms cover personal information, experience, education, skills and custom sections.
- **Three presentation styles.** Modern, Azurill and Academic templates provide different layouts. The Academic path includes LaTeX generation and editing helpers.
- **AI-assisted writing.** Groq-backed routes support CV optimization, cover letters, section improvement, reviews and keyword extraction.
- **Document import.** Upload routes extract PDF and Word content, then use AI to populate the structured CV.
- **Job discovery.** LinkedIn, Workday and CareerOne source adapters use Apify actors when their tokens are configured.
- **Application and version history.** Dashboard views track applications, job-related optimizations and CV snapshots.
- **Printing and sharing.** Prepare a printable HTML version, create share links and access QR functionality.

AI suggestions should preserve the applicant's actual experience. A generated match score or revised paragraph is guidance, not a verified hiring outcome.

## Repository preview

This existing image is stored in the repository and illustrates the CV dashboard. It is not a fresh capture or a verification of the current deployment.

<p align="center">
  <img src="public/dashboard.png" width="900" alt="CV dashboard with a CV count, default CV and editable CV cards" />
</p>

## Run locally

The lockfile records **Next.js 16.1.6** and **React 19.2.3**. The project also uses TypeScript, Tailwind CSS 4, Supabase and Zustand.

```bash
git clone https://github.com/ArdaHFO/CV1.git
cd CV1
npm ci
```

Create `.env.local` in the repository root:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_public_key
SUPABASE_SERVICE_ROLE_KEY=your_server_only_service_role_key
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Keep service-role and provider keys server-side and outside version control.

For a fresh Supabase project, review and apply the SQL in [supabase/migrations](supabase/migrations/) in filename order. Both `009_` files are present and use overlapping `ADD COLUMN IF NOT EXISTS` statements. The repository does not include a Supabase CLI project configuration, so do not assume a one-command migration workflow. Configure Auth redirect URLs for `http://localhost:3000/auth/callback`, and configure Google OAuth if using that sign-in option.

Add only the integrations you intend to use:

| Variables | Purpose |
| --- | --- |
| `APIFY_API_TOKEN` | LinkedIn job actor |
| `APIFY_WORKDAY_TOKEN` | Workday job actor |
| `APIFY_CAREERONE_TOKEN` | CareerOne job actor |
| `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Checkout integration |
| `RESEND_API_KEY` | Scheduled reminder emails |

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). To check and build the application in a configured development environment:

```bash
npm run lint
npm run build
npm start
```

These commands are provided for development. They were not executed for this documentation update.

## AI and data flow

The current [main AI route](app/api/ai/route.ts) and dedicated optimization, cover-letter and improvement routes call [Groq helpers](lib/ai/groq.ts) with `llama-3.3-70b-versatile`.

The repository also retains [OpenAI helpers](lib/ai/openai.ts), [Gemini helpers](lib/ai/gemini.ts) and [historical Gemini notes](GEMINI_INTEGRATION.md). Their presence does not make them the active provider for the main route.

Supabase handles account and database operations. The current editor saves CV content to `localStorage`, and [version history](lib/version-history.ts) also stores snapshots in that browser. Do not assume these local snapshots are synchronized across devices.

## Validation and current limits

This documentation was checked against source, package metadata and the existing preview asset. No build, authenticated browser flow, database migration or paid-service request was executed.

- Job search can return mock listings when its integrations are unavailable. Inspect the response's `source` field.
- Job-specific optimization can return `fallback: true`. CV import may return an empty structured template when AI parsing is unavailable.
- The PDF route returns HTML. The editor opens a browser print dialog, where the user can save a PDF. It is not a server-side PDF rendering service.
- The LaTeX path uses project-specific parsing and rendering helpers. It is not a general TeX compilation environment.
- Browser-local CV content and version history can be lost when site data is cleared.
- No automated test script or CI workflow is included in the inspected tree. Billing, sharing, imports and reminders need integration validation in the intended deployment.

## Project map

```text
app/                  Pages, CV editor, sharing views and API routes
features/editor/      Forms, CV templates and LaTeX helpers
components/           Shared interface components
lib/                  AI, Auth, Supabase, database and local history helpers
supabase/migrations/  SQL schema and feature migrations
public/               Existing brand and interface assets
types/                Shared TypeScript data types
```

## Documentation and contributions

- [Database migrations](supabase/migrations/)
- [Main AI API](app/api/ai/route.ts) · [Job search adapters](app/api/jobs/search/route.ts)
- [CV import](app/api/cv/upload/route.ts) · [Print preparation](app/api/pdf/route.ts)
- [Historical Gemini integration notes](GEMINI_INTEGRATION.md)
- [Issues and feature requests](https://github.com/ArdaHFO/CV1/issues)

Include the affected route, template, provider configuration and steps to reproduce an issue. Use synthetic CV examples instead of personal application data. Pull requests should distinguish local UI checks from database or service integration checks.

## License and credits

No standalone license file is included in this repository. This documentation does not add or change licensing terms. Existing CSPARK assets, package notices and third-party rights are retained.

