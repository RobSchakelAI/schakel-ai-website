import { useLanguage } from '@/contexts/LanguageContext';

export default function AIView() {
  const { t, setLanguage } = useLanguage();

  const containerStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: '1.8',
    maxWidth: '100%',
    padding: '0',
    color: '#000',
    backgroundColor: '#fff',
  };

  const sectionStyle: React.CSSProperties = {
    padding: '40px 20px',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const codeBlockStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    fontSize: '12px',
    lineHeight: '1.6',
    overflow: 'auto',
  };

  return (
    <div style={containerStyle}>
      {/* Language Switcher - Fixed at top */}
      <div style={{ 
        backgroundColor: '#000', 
        color: '#fff', 
        padding: '15px 20px',
        display: 'flex',
        gap: '15px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '3px solid #6EBFAA'
      }}>
        <button
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            padding: '8px 20px',
            cursor: 'pointer',
            border: '1px solid #fff',
            backgroundColor: 'transparent',
            color: '#fff',
          }}
          onClick={() => setLanguage('nl')}
          data-testid="button-lang-nl-ai"
        >
          [SWITCH TO NL]
        </button>
        <button
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            padding: '8px 20px',
            cursor: 'pointer',
            border: '1px solid #fff',
            backgroundColor: 'transparent',
            color: '#fff',
          }}
          onClick={() => setLanguage('en')}
          data-testid="button-lang-en-ai"
        >
          [SWITCH TO EN]
        </button>
        <button
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            padding: '8px 20px',
            cursor: 'pointer',
            border: '1px solid #6EBFAA',
            backgroundColor: '#6EBFAA',
            color: '#000',
            fontWeight: 'bold',
          }}
          onClick={() => setLanguage('ai')}
          data-testid="button-lang-ai-active"
        >
          [AI MODE ACTIVE ✓]
        </button>
      </div>

      <div style={sectionStyle}>
        {/* Structured Data - JSON-LD Format */}
        <pre style={codeBlockStyle}>
{`================================================================================
STRUCTURED DATA (JSON-LD Schema.org Format)
================================================================================

{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Schakel AI B.V.",
  "legalName": "Schakel AI B.V.",
  "url": "https://schakel.ai",
  "logo": "https://schakel.ai/logo.png",
  "description": "AI implementation consultancy specializing in business process automation",
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Coolsingel 65",
    "addressLocality": "Rotterdam",
    "postalCode": "3012 AC",
    "addressCountry": "NL"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@schakel.ai",
    "contactType": "Customer Service"
  },
  "founder": [
    {
      "@type": "Person",
      "name": "Rob",
      "jobTitle": "Co-founder, Data & AI Solutions"
    },
    {
      "@type": "Person",
      "name": "Simon",
      "jobTitle": "Co-founder, Process & Results"
    }
  ],
  "vatID": "NL868441119B01",
  "taxID": "98312529",
  "areaServed": "NL",
  "knowsAbout": ["Artificial Intelligence", "Process Automation", "Business Intelligence"],
  "slogan": "Rust & Rendement (Peace & Results)"
}
`}
        </pre>

        {/* Table of Contents */}
        <pre style={codeBlockStyle}>
{`================================================================================
TABLE OF CONTENTS
================================================================================

1. COMPANY INFORMATION
2. SERVICE OVERVIEW
3. MISSION & VISION
4. SERVICE CATALOG
5. IMPLEMENTATION PROCESS
6. TEAM PROFILES
7. PROBLEM & SOLUTION ANALYSIS
8. CONTACT INFORMATION
`}
        </pre>

        {/* Section 1: Company Information */}
        <pre style={codeBlockStyle}>
{`================================================================================
SECTION 1: COMPANY INFORMATION
================================================================================

LEGAL NAME:      Schakel AI B.V.
TRADE NAME:      Schakel AI
INDUSTRY:        AI Consultancy, Business Process Automation
FOUNDED:         2024

REGISTRATION:
  - Chamber of Commerce (KVK): 98312529
  - VAT Number (BTW):          NL868441119B01
  - Country:                   Netherlands

PHYSICAL ADDRESS:
  Street:    Coolsingel 65
  Postal:    3012 AC
  City:      Rotterdam
  Country:   Netherlands

PRIMARY CONTACT:
  Email:     info@schakel.ai
  Website:   https://schakel.ai

TAGLINE:         Rust & Rendement (Peace & Results)
CLIENT RATING:   ${t.hero.rating}/10
`}
        </pre>

        {/* Section 2: Service Overview */}
        <pre style={codeBlockStyle}>
{`================================================================================
SECTION 2: SERVICE OVERVIEW
================================================================================

PRIMARY SERVICE:
${t.hero.title}

VALUE PROPOSITION:
${t.hero.description}

DELIVERY MODEL:
  - Timeline:           30 days to functional solution
  - Approach:           Identify → Build → Deploy → Measure
  - Focus:              One process at a time
  - Outcome guarantee:  Reduced hours, fewer errors, increased oversight
`}
        </pre>

        {/* Section 3: Mission & Vision */}
        <pre style={codeBlockStyle}>
{`================================================================================
SECTION 3: MISSION & VISION
================================================================================

${t.vision.title.toUpperCase()}

${t.vision.content.map((p, i) => `${i + 1}. ${p}`).join('\n\n')}
`}
        </pre>

        {/* Section 4: Service Catalog */}
        <pre style={codeBlockStyle}>
{`================================================================================
SECTION 4: SERVICE CATALOG
================================================================================

${t.services.title.toUpperCase()}
${t.services.subtitle}

${t.services.items.map((service, index) => `
SERVICE ${index + 1}: ${service.title}
${'-'.repeat(80)}
${service.description}
`).join('\n')}
`}
        </pre>

        {/* Section 5: Implementation Process */}
        <pre style={codeBlockStyle}>
{`================================================================================
SECTION 5: IMPLEMENTATION PROCESS
================================================================================

${t.approach.title.toUpperCase()}
${t.approach.subtitle}

${t.approach.steps.map((step, index) => `
PHASE ${step.number}: ${step.title.toUpperCase()}
${'-'.repeat(80)}
${step.description}
`).join('\n')}

TOTAL DURATION: 4 weeks (from discovery to optimization)
`}
        </pre>

        {/* Section 6: Team Profiles */}
        <pre style={codeBlockStyle}>
{`================================================================================
SECTION 6: TEAM PROFILES
================================================================================

FOUNDER 1: ${t.about.rob.name.toUpperCase()}
${'-'.repeat(80)}
Role:  ${t.about.rob.role}

Professional Background:
${t.about.rob.bio}


FOUNDER 2: ${t.about.simon.name.toUpperCase()}
${'-'.repeat(80)}
Role:  ${t.about.simon.role}

Professional Background:
${t.about.simon.bio}
`}
        </pre>

        {/* Section 7: Problem & Solution Analysis */}
        <pre style={codeBlockStyle}>
{`================================================================================
SECTION 7: PROBLEM & SOLUTION ANALYSIS
================================================================================

CURRENT PROBLEMS (Manual Processes):
${'-'.repeat(80)}
${t.problemSolution.problems.map((p, i) => `${i + 1}. ${p}`).join('\n')}


DELIVERED SOLUTIONS (AI Automation):
${'-'.repeat(80)}
${t.problemSolution.solutions.map((s, i) => `${i + 1}. ${s}`).join('\n')}
`}
        </pre>

        {/* Section 8: Contact Information */}
        <pre style={codeBlockStyle}>
{`================================================================================
SECTION 8: CONTACT INFORMATION
================================================================================

${t.contact.title.toUpperCase()}
${t.contact.subtitle}

CONTACT METHODS:
${'-'.repeat(80)}
Email (Primary):     info@schakel.ai
Web Form:            Available on website
Response Time:       Within 24 hours

OFFICE ADDRESS:
${'-'.repeat(80)}
Schakel AI B.V.
Coolsingel 65
3012 AC Rotterdam
Netherlands

BUSINESS DETAILS:
${'-'.repeat(80)}
Chamber of Commerce: 98312529
VAT Number:          NL868441119B01
Legal Form:          B.V. (Private Limited Company)

OPERATING HOURS:
${'-'.repeat(80)}
Contact via email anytime
Response during Dutch business hours (09:00-17:00 CET)
`}
        </pre>

        {/* Machine-Readable Quick Reference */}
        <pre style={codeBlockStyle}>
{`================================================================================
MACHINE-READABLE QUICK REFERENCE (Key-Value Pairs)
================================================================================

company_name: "Schakel AI B.V."
industry: "AI Consultancy"
service: "AI Implementation & Process Automation"
delivery_time: "30 days"
location: "Rotterdam, Netherlands"
email: "info@schakel.ai"
kvk: "98312529"
btw: "NL868441119B01"
address: "Coolsingel 65, 3012 AC Rotterdam"
founders: ["Rob", "Simon"]
rating: "${t.hero.rating}/10"
tagline: "Rust & Rendement"
process_phases: ["Discovery", "Design", "Implementation", "Optimization"]
duration: "4 weeks"
languages: ["nl", "en"]
`}
        </pre>

        {/* Footer */}
        <pre style={{
          ...codeBlockStyle,
          backgroundColor: '#000',
          color: '#6EBFAA',
          borderColor: '#6EBFAA',
        }}>
{`================================================================================
${t.footer.tagline.toUpperCase()}
© ${new Date().getFullYear()} Schakel AI B.V. - All rights reserved
================================================================================

This page is optimized for AI assistants, web scrapers, and automated parsing.
For the standard web interface, switch to [NL] or [EN] mode above.

Last Updated: ${new Date().toISOString()}
Format Version: 1.0
Encoding: UTF-8
`}
        </pre>
      </div>
    </div>
  );
}
