const CtaSection = ({ phone }) => (
  <section className="py-20 px-4 bg-blue-600 dark:bg-blue-900 text-center">
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-4xl md:text-5xl font-black text-white">Ready to Start Your Career?</h2>
      <p className="text-blue-100 text-xl max-w-2xl mx-auto">Join the community of successful professionals today. Limited seats available for the next batch.</p>
      <button onClick={() => window.open(`https://wa.me/${phone}`, '_blank')} className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors">
        Join Now on WhatsApp
      </button>
    </div>
  </section>
);

export default CtaSection;