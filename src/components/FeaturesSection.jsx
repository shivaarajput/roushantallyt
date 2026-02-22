
import { FEATURES_LIST } from '../../config';

const FeaturesSection = () => (
  <section className="py-24 px-4 bg-white dark:bg-slate-950">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Why Choose Us?</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">More than just education; we provide a career path.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES_LIST.map((feat, i) => (
          <div key={i} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors">
            <div className="w-14 h-14 bg-blue-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
              <feat.icon size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{feat.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;