import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSolution from '@/components/ProblemSolution';
import Stats from '@/components/Stats';
import Vision from '@/components/Vision';
import ServicesGrid from '@/components/ServicesGrid';
import ApproachTimeline from '@/components/ApproachTimeline';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import ExpandingCTA from '@/components/ExpandingCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <Hero />
        <ProblemSolution />
        <Vision />
        <ServicesGrid />
        <Stats />
        <div id="approach">
          <ApproachTimeline />
        </div>
        <Testimonials />
        <About />
        <ExpandingCTA />
      </main>
      <Footer />
    </div>
  );
}
