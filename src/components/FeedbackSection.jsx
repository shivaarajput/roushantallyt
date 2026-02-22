import { useState, useEffect } from "react";
import {
  Star, Clock
} from 'lucide-react';

import { inputClass } from '../../config';

const FeedbackSection = ({ feedbacks, onAction }) => {
  const [form, setForm] = useState({ name: '', message: '', rating: 5, avatar: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localFeedbackIds, setLocalFeedbackIds] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('myPendingFeedbacks') || '[]');
      setLocalFeedbackIds(stored);
    } catch (e) { }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newId = await onAction('feedbacks', 'add', { ...form, status: 'pending' });
      if (newId) {
        const updatedList = [...localFeedbackIds, newId];
        setLocalFeedbackIds(updatedList);
        localStorage.setItem('myPendingFeedbacks', JSON.stringify(updatedList));
        setForm({ name: '', message: '', rating: 5, avatar: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleFeedbacks = feedbacks.filter(f => f.status === 'approved' || localFeedbackIds.includes(f.id));

  return (
    <section id="reviews" className="py-24 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto space-y-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-slate-900 dark:text-white">Student Success Stories</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleFeedbacks.length > 0 ? visibleFeedbacks.map((f) => {
            const isPending = f.status === 'pending';
            return (
              <div key={f.id} className={`bg-white dark:bg-slate-800 p-8 rounded-2xl border ${isPending ? 'border-yellow-400' : 'border-slate-200 dark:border-slate-700'} flex flex-col relative`}>

                {isPending && (
                  <div className="absolute -top-3 right-6 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock size={12} /> Pending Approval
                  </div>
                )}

                <div className="flex gap-1 text-yellow-500 mb-6">
                  {[...Array(Number(f.rating) || 5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed flex-1 italic">"{f.message}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  {f.avatar ? (
                    <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-600" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                      {f.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{f.name}</p>
                    <p className="text-sm text-slate-500">Student</p>
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className="col-span-full text-center py-12 text-slate-500 font-medium">No reviews yet. Be the first to share your experience!</div>
          )}
        </div>

        {/* Review Form */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
                <select value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} className={inputClass}>
                  <option value="5">⭐⭐⭐⭐⭐ </option>
                  <option value="4">⭐⭐⭐⭐ </option>
                  <option value="3">⭐⭐⭐ </option>
                </select>
              </div>
              <input type="url" placeholder="Profile Image URL (Optional)" value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })} className={inputClass} />
              <textarea placeholder="Write your review here..." required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} rows="4" />

              <p className="text-sm text-slate-500 text-center pb-2">Your review will be visible to you immediately and to others once approved.</p>
              <button disabled={isSubmitting} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;