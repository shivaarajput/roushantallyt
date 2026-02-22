
const HeroSection = ({ config }) => (
  <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 bg-slate-50 dark:bg-slate-900 relative">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span> Admissions Open {new Date().getFullYear()}
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
          {config.hero.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
          {config.hero.subtitle}
        </p>
        <button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all">
          {config.hero.ctaText}
        </button>
      </div>
      <div>
        <img src={config.hero.image} alt="Hero" className="w-full rounded-3xl shadow-2xl object-cover aspect-[4/3] bg-slate-200 dark:bg-slate-800 border-8 border-white dark:border-slate-800" />
      </div>
    </div>
  </section>
);

export default HeroSection;