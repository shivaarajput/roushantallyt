import { useState } from "react";
import {
  ExternalLink, Lock, Instagram, Youtube, Linkedin, Facebook, Twitter
} from 'lucide-react';

// Helper for dynamic social icons
const getSocialIcon = (platform) => {
  const p = platform.toLowerCase();
  if (p.includes('insta')) return <Instagram size={20} />;
  if (p.includes('you')) return <Youtube size={20} />;
  if (p.includes('link')) return <Linkedin size={20} />;
  if (p.includes('face')) return <Facebook size={20} />;
  if (p.includes('twit') || p.includes('x')) return <Twitter size={20} />;
  return <ExternalLink size={20} />;
};

const Footer = ({ config, onAction, navigateTo }) => {
  const [lead, setLead] = useState({ name: '', phone: '' });

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">S</div>
            <span className="font-bold text-2xl text-white">Shiva_</span>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-slate-300">Master accounting with industry experts. Transform your career with practical knowledge.</p>
          <div className="flex gap-4 pt-4">
            {Object.entries(config.social).map(([platform, url]) => url && (
              <a key={platform} href={url} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800 dark:bg-slate-900 border border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors" aria-label={platform}>
                {getSocialIcon(platform)}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 dark:bg-slate-900 p-8 rounded-2xl border border-slate-700">
          <h3 className="text-white font-bold text-xl mb-6">Request a Call Back</h3>
          <form onSubmit={(e) => { e.preventDefault(); onAction('leads', 'add', lead); setLead({ name: '', phone: '' }); }} className="space-y-4">
            <input type="text" placeholder="Your Name" value={lead.name} onChange={e => setLead({ ...lead, name: e.target.value })} className="w-full px-5 py-4 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 transition-colors" required />
            <input type="tel" placeholder="Phone Number" value={lead.phone} onChange={e => setLead({ ...lead, phone: e.target.value })} className="w-full px-5 py-4 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 transition-colors" required />
            <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors">Submit Request</button>
          </form>
        </div>
      </div>
      <div className="text-center flex justify-between items-center max-w-7xl mx-auto border-t border-slate-800 pt-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} Tally Teacher. All rights reserved.</p>

        {/* Hidden Admin Access Trigger */}
        <button onClick={() => navigateTo('/admin')} className="p-2 text-slate-700 hover:text-slate-400 transition-colors" title="Teacher Login">
          <Lock size={16} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;