// ============================================================================
// DEFAULT DATA
// ============================================================================
import {
  Briefcase, Zap, MonitorPlay, Trophy
} from 'lucide-react';

const DEFAULT_CONFIG = {
  profile: {
    name: "Roushan Kumar",
    title: "Expert Tally Accounting Teacher & Educator",
    bio: "Helping students master Tally with practical accounting skills and real industry insights.",
    avatar: "/me/avatar.jpeg",
    phone: "919812345678"
  },
  hero: {
    title: "Become a Skilled Tally Professional",
    subtitle: "Comprehensive Tally training for beginners to advanced users — GST, payroll, inventory & more.",
    ctaText: "View Courses",
    image: "/me/hero.jpeg"
  },
  stats: { students: "7000+", experience: "8+ Years", placements: "95%+" },
  social: {
    instagram: "https://instagram.com/roushantally",
    youtube: "https://youtube.com/roushantally",
    linkedin: "https://linkedin.com/in/roushankumar"
  },
  sections: {
    hero: true,
    stats: true,
    about: true,
    features: true,
    services: true,
    gallery: true,
    faq: true,
    feedback: true,
    cta: true
  }
};

const FEATURES_LIST = [
  { icon: MonitorPlay, title: "Live & Recorded", desc: "Access high-quality lectures anytime." },
  { icon: Briefcase, title: "100% Job Assistance", desc: "Land your dream job with interview prep." },
  { icon: Trophy, title: "Industry Recognized", desc: "Certificates that add real value to CV." },
  { icon: Zap, title: "Practical Training", desc: "Work on real company data, not theory." }
];

// Reusable Input CSS for Admin Panel (Ensures Dark Mode Visibility)
const inputClass = "w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors";

export {DEFAULT_CONFIG, FEATURES_LIST, inputClass};