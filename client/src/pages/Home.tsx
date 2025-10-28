import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <Hero />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
