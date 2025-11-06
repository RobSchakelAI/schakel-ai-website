import { useLanguage } from '@/contexts/LanguageContext';

export default function AIView() {
  const { t, setLanguage } = useLanguage();

  const containerStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: '1.6',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    color: '#000',
    backgroundColor: '#fff',
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: '2px solid #000',
    paddingBottom: '20px',
    marginBottom: '40px',
  };

  const langSwitcherStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '14px',
    padding: '5px 15px',
    cursor: 'pointer',
    border: '1px solid #000',
    backgroundColor: '#fff',
    color: '#000',
  };

  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#000',
    color: '#fff',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '60px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '40px',
  };

  const h1Style: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textTransform: 'uppercase',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    marginTop: '30px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    marginTop: '20px',
  };

  const pStyle: React.CSSProperties = {
    marginBottom: '15px',
    whiteSpace: 'pre-wrap',
  };

  const listStyle: React.CSSProperties = {
    marginBottom: '15px',
    paddingLeft: '20px',
  };

  const contactInfoStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    marginTop: '20px',
    border: '1px solid #ddd',
  };

  return (
    <div style={containerStyle}>
      {/* Header with language switcher */}
      <div style={headerStyle}>
        <div style={langSwitcherStyle}>
          <button
            style={buttonStyle}
            onClick={() => setLanguage('nl')}
            data-testid="button-lang-nl-ai"
          >
            [NL]
          </button>
          <button
            style={buttonStyle}
            onClick={() => setLanguage('en')}
            data-testid="button-lang-en-ai"
          >
            [EN]
          </button>
          <button
            style={activeButtonStyle}
            onClick={() => setLanguage('ai')}
            data-testid="button-lang-ai-active"
          >
            [AI] ✓
          </button>
        </div>
        <h1 style={h1Style}>SCHAKEL AI - AI IMPLEMENTATION CONSULTANCY</h1>
        <p style={pStyle}>
          Company: Schakel AI B.V.{'\n'}
          Location: Coolsingel 65, 3012 AC Rotterdam, Netherlands{'\n'}
          Email: info@schakel.ai{'\n'}
          KVK: 98312529{'\n'}
          BTW: NL868441119B01
        </p>
      </div>

      {/* Hero Section */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.hero.preTitle}</h2>
        <h1 style={h1Style}>{t.hero.title}</h1>
        <p style={pStyle}>{t.hero.description}</p>
        <p style={pStyle}>
          Client Rating: {t.hero.rating}
        </p>
      </section>

      {/* Vision Section */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.vision.title}</h2>
        {t.vision.content.map((paragraph, index) => (
          <p key={index} style={pStyle}>{paragraph}</p>
        ))}
      </section>

      {/* Services Section */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.services.title}</h2>
        <p style={pStyle}>{t.services.subtitle}</p>
        <ul style={listStyle}>
          {t.services.items.map((service, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <h3 style={h3Style}>{service.title}</h3>
              <p style={pStyle}>{service.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Approach Section */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.approach.title}</h2>
        <p style={pStyle}>{t.approach.subtitle}</p>
        <ul style={listStyle}>
          {t.approach.steps.map((step, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <h3 style={h3Style}>STEP {step.number}: {step.title}</h3>
              <p style={pStyle}>{step.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Team Section */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.about.title}</h2>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={h3Style}>{t.about.rob.name}</h3>
          <p style={pStyle}><strong>{t.about.rob.role}</strong></p>
          <p style={pStyle}>{t.about.rob.bio}</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={h3Style}>{t.about.simon.name}</h3>
          <p style={pStyle}><strong>{t.about.simon.role}</strong></p>
          <p style={pStyle}>{t.about.simon.bio}</p>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.problemSolution.problemTitle}</h2>
        <ul style={listStyle}>
          {t.problemSolution.problems.map((problem, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{problem}</li>
          ))}
        </ul>

        <h2 style={{ ...h2Style, marginTop: '30px' }}>{t.problemSolution.solutionTitle}</h2>
        <ul style={listStyle}>
          {t.problemSolution.solutions.map((solution, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{solution}</li>
          ))}
        </ul>
      </section>

      {/* Contact Section */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.contact.title}</h2>
        <p style={pStyle}>{t.contact.subtitle}</p>
        <div style={contactInfoStyle}>
          <p style={pStyle}>
            CONTACT METHOD: Email{'\n'}
            ADDRESS: info@schakel.ai{'\n'}
            {'\n'}
            POSTAL ADDRESS:{'\n'}
            Schakel AI B.V.{'\n'}
            Coolsingel 65{'\n'}
            3012 AC Rotterdam{'\n'}
            Netherlands{'\n'}
            {'\n'}
            BUSINESS REGISTRATION:{'\n'}
            KVK: 98312529{'\n'}
            BTW: NL868441119B01
          </p>
        </div>
      </section>

      {/* Footer */}
      <section style={{ marginTop: '60px', paddingTop: '20px', borderTop: '2px solid #000' }}>
        <p style={pStyle}>
          {t.footer.tagline}{'\n'}
          © {new Date().getFullYear()} Schakel AI B.V.{'\n'}
          All rights reserved.
        </p>
      </section>

      {/* AI-specific metadata */}
      <section style={{ marginTop: '40px', backgroundColor: '#f5f5f5', padding: '20px', border: '1px solid #ddd' }}>
        <h3 style={h3Style}>MACHINE-READABLE METADATA</h3>
        <pre style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
{`{
  "company": "Schakel AI B.V.",
  "services": ["AI Implementation", "Process Automation", "Customer Service AI", "Workflow Automation"],
  "location": "Rotterdam, Netherlands",
  "contact": {
    "email": "info@schakel.ai",
    "address": "Coolsingel 65, 3012 AC Rotterdam",
    "kvk": "98312529",
    "btw": "NL868441119B01"
  },
  "founders": ["Rob", "Simon"],
  "delivery_time": "30 days",
  "approach": ["Discovery", "Design", "Implementation", "Optimization"],
  "rating": "9.2/10"
}`}
        </pre>
      </section>
    </div>
  );
}
