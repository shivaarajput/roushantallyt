const StatsSection = ({ stats }) => (
  <section className="py-12 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <p className="text-4xl lg:text-5xl font-black text-blue-600 dark:text-blue-400">{value}</p>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{key}</p>
        </div>
      ))}
      <div className="space-y-2">
        <p className="text-4xl lg:text-5xl font-black text-blue-600 dark:text-blue-400">4.9/5</p>
        <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Rating</p>
      </div>
    </div>
  </section>
);

export default StatsSection;