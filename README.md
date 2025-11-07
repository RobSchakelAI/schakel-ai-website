# Schakel AI Website

A bilingual (Dutch/English) website for Schakel AI, a Dutch AI consultancy focused on delivering peace of mind and measurable results through AI solutions.

## Features

- **🌍 Bilingual Support**: Dutch (primary) and English
- **🤖 AI View Mode**: Machine-readable content optimized for AI assistants and scrapers
- **🌓 Dark/Light Theme**: Automatic theme switching with user preference
- **📧 Contact Form**: Integrated with MailerSend for reliable email delivery
- **♿ Accessibility**: WCAG AA compliant with semantic HTML and ARIA labels
- **⚡ Performance**: Optimized with Vite, lazy loading, and static generation

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for accessible component primitives
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management

### Backend
- **Express.js** for API endpoints
- **MailerSend** for transactional emails
- **Node.js 20** runtime

### Design System
- **Colors**: Mint (#6EBFAA), Teal (#2C9880), Purple (#4b37bd)
- **Typography**: Inter (body), DM Sans (headlines)
- **Accessibility**: WCAG AA compliant

## Development

### Prerequisites
- Node.js 20+
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/RobSchakelAI/schakel-ai-website.git
cd schakel-ai-website
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file (or use Replit Secrets)
MAILERSEND_API_KEY=your_api_key
MAILERSEND_FROM_EMAIL=noreply@schakel.ai
MAILERSEND_TO_EMAIL=info@schakel.ai
```

4. Start development server:
```bash
npm run dev
```

The app will be available at http://localhost:5000

### Development Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run check` - TypeScript type checking

## Project Structure

```
schakel-ai-website/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts (Language, Theme)
│   │   ├── lib/           # Utilities and helpers
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main app component
│   └── index.html         # HTML entry point
├── server/                 # Backend Express server
│   ├── routes.ts          # API routes
│   ├── index.ts           # Server entry point
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
├── DEPLOYMENT.md          # Deployment guide
└── package.json
```

## Deployment

This website uses a split deployment architecture:
- **Frontend**: Deployed on **Vercel** for optimal CDN performance
- **Backend**: Deployed on **Railway** for API endpoints

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed step-by-step instructions.

### Quick Deploy Summary

**Backend (Railway)**:
1. Deploy from GitHub to Railway
2. Add environment variables: `MAILERSEND_API_KEY`, `MAILERSEND_FROM_EMAIL`, `MAILERSEND_TO_EMAIL`
3. Copy your Railway URL

**Frontend (Vercel)**:
1. Deploy from GitHub to Vercel
2. Set `VITE_API_URL` to your Railway URL
3. Configure custom domain (schakel.ai)

### Environment Variables

**Railway (Backend)**:
- `NODE_ENV=production`
- `MAILERSEND_API_KEY` - MailerSend API token
- `MAILERSEND_FROM_EMAIL` - Verified sender email
- `MAILERSEND_TO_EMAIL` - Contact form recipient email

**Vercel (Frontend)**:
- `VITE_API_URL` - Railway backend URL (e.g., https://your-app.up.railway.app)

## Features in Detail

### AI View Mode

Special mode that presents content in a machine-readable format optimized for AI assistants and scrapers:
- Structured JSON-LD metadata
- Table of contents for navigation
- Semantic HTML with proper headings
- Plain text alternative to visual content

Toggle AI View with the button in the header.

### Contact Form

Secure contact form with:
- **Optional fields**: name, company, email, phone, message (all fields optional)
- **Two form locations**: Main page bottom + popup overlay
- Client-side validation (Zod + React Hook Form)
- Server-side validation
- Email delivery via MailerSend
- Error handling and user feedback
- Beautiful branded email templates with conditional field rendering

### Internationalization

Context-based i18n system supporting:
- Dutch (nl) - Primary language
- English (en) - Secondary language

Language files located in `client/src/lib/i18n/`

## Company Information

**Schakel AI B.V.**
- Address: Coolsingel 65, 3012 AC Rotterdam
- Email: info@schakel.ai
- KVK: 98312529
- BTW: NL868441119B01

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
- Create an issue on GitHub
- Email: info@schakel.ai
- Website: https://schakel.ai
