import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import FAQSection from '@/components/FAQSection';
import Testimonials from '@/components/Testimonials';
import ArticlesSection from '@/components/ArticlesSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <FAQSection />
      <Testimonials />
      <ArticlesSection />
      <CTASection />
    </main>
  );
}
