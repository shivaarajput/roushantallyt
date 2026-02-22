const AboutSection = ({ config }) => (
  <section id="about" className="py-24 px-4 bg-slate-50 dark:bg-slate-900">
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/3 flex-shrink-0">
          <img src={config.profile.avatar} alt={config.profile.name} className="w-48 h-48 lg:w-72 lg:h-72 rounded-full object-cover mx-auto shadow-lg border-4 border-slate-100 dark:border-slate-700 bg-slate-200" />
        </div>
        <div className="lg:w-2/3 space-y-6">
          <div className="inline-block px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-sm font-bold text-blue-700 dark:text-blue-300">About the Instructor</div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">{config.profile.name}</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">{config.profile.title}</p>
          <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{config.profile.bio}</p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;