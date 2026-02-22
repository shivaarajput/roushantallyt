// ============================================================================
// COMPONENTS: PUBLIC WEBSITE
// ============================================================================
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import FeedbackSection from '../components/FeedbackSection';
import FaqSection from '../components/FaqSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

const Home = ({ config, services, feedbacks, faqs, gallery, onAction, darkMode, toggleDarkMode, navigateTo }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        {config.sections.hero && <HeroSection config={config} />}
        {config.sections.stats && <StatsSection stats={config.stats} />}
        {config.sections.about && <AboutSection config={config} />}
        {config.sections.features && <FeaturesSection />}
        {config.sections.services && <ServicesSection services={services} config={config} />}
        {config.sections.gallery && <GallerySection gallery={gallery} />}
        {config.sections.feedback && <FeedbackSection feedbacks={feedbacks} onAction={onAction} />}
        {config.sections.faq && <FaqSection faqs={faqs} />}
        {config.sections.cta && <CtaSection phone={config.profile.phone} />}
      </main>
      <Footer config={config} onAction={onAction} navigateTo={navigateTo} />
    </div>
  );
};

export default Home;