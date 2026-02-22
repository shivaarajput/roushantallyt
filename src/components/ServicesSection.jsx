import { useState } from "react";
import {
  ExternalLink, BookOpen
} from 'lucide-react';


const ServicesSection = ({ services, config }) => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section id="courses" className="py-24 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Our Courses</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Comprehensive accounting and taxation mastery.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow flex flex-col">
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <BookOpen size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8 flex-1 leading-relaxed">{service.description}</p>

              <div className="space-y-4 mt-auto">
                {service.syllabus && service.syllabus.length > 0 && (
                  <button onClick={() => setActiveModal(service)} className="w-full py-3 border border-slate-300 dark:border-slate-600 rounded-lg font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    View Syllabus
                  </button>
                )}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{service.price}</span>
                  <button onClick={() => window.open(`https://wa.me/${config.profile.phone}?text=I am interested in ${service.title}`, '_blank')} className="font-bold text-slate-900 dark:text-white flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Enroll <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{activeModal.title}</h3>
              <button onClick={() => setActiveModal(null)} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white"><X size={20} /></button>
            </div>
            <ul className="space-y-3">
              {activeModal.syllabus?.map((topic, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-medium text-slate-700 dark:text-slate-300">
                  <Check className="text-green-500" size={20} /> {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;