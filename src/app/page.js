import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
