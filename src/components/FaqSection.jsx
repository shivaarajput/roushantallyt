import { useState } from "react";

const FaqSection = ({ faqs }) => {
  const [openId, setOpenId] = useState(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto space-y-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-slate-900 dark:text-white">Got Questions?</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button onClick={() => setOpenId(openId === faq.id ? null : faq.id)} className="w-full flex justify-between items-center p-6 text-left font-bold text-lg text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                {faq.question}
                {openId === faq.id ? <ChevronUp className="text-blue-600 dark:text-blue-400" /> : <ChevronDown className="text-slate-500" />}
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;