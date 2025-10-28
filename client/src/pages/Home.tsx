import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OutcomesSwitchboard from '@/components/OutcomesSwitchboard';
import ApproachTimeline from '@/components/ApproachTimeline';
import About from '@/components/About';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <Hero />
        <div id="outcomes">
          <OutcomesSwitchboard />
        </div>
        <div id="approach">
          <ApproachTimeline />
        </div>
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
