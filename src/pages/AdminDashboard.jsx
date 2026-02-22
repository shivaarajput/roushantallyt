import { useState, useEffect } from "react";
import {
  LayoutDashboard, User, FileText, MessageSquare, LogOut, Menu, Trash2, Zap, Lock, ImageIcon, HelpCircle
} from 'lucide-react';
import { inputClass } from "../../config";



const AdminDashboard = ({ config, services, feedbacks, faqs, leads, gallery, onSaveConfig, onAction, onLogout, darkMode, toggleDarkMode }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [localConfig, setLocalConfig] = useState(config);
  const [newItem, setNewItem] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setLocalConfig(config), [config]);

  const tabs = [
    { id: 'content', label: 'Page Content', icon: LayoutDashboard },
    { id: 'profile', label: 'Instructor Profile', icon: User },
    { id: 'services', label: 'Courses', icon: FileText },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'feedback', label: 'Reviews', icon: MessageSquare, badge: feedbacks.filter(f => f.status === 'pending').length },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'leads', label: 'Leads', icon: Zap }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden relative">

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">

          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <aside className="relative w-72 bg-white dark:bg-slate-900 h-full shadow-xl flex flex-col">

            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h1 className="text-lg font-bold flex items-center gap-2">
                <Lock className="text-blue-600" size={18} />
                TeacherPanel
              </h1>
              <button onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition ${activeTab === tab.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon size={18} />
                    {tab.label}
                  </div>
                  {tab.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 font-medium hover:bg-red-50 transition"
              >
                <LogOut size={18} />
                Secure Logout
              </button>
            </div>

          </aside>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col">

        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <Lock className="text-blue-600" />
            TeacherPanel
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${activeTab === tab.id
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon size={18} />
                {tab.label}
              </div>
              {tab.badge > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={18} />
            Secure Logout
          </button>
        </div>

      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-20">

          <div className="flex items-center gap-3">

            {/* Hamburger (mobile only) */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>

            <h2 className="text-lg md:text-xl font-bold capitalize text-slate-900 dark:text-white">
              {activeTab.replace("_", " ")}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {['content', 'profile'].includes(activeTab) && (
              <button
                onClick={() => onSaveConfig(localConfig)}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>

        </header>

        <div className="p-8 max-w-4xl mx-auto pb-32">

          {/* CONTENT TAB */}
          {activeTab === 'content' && (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="font-bold text-lg border-b border-slate-200 dark:border-slate-800 pb-4 text-slate-900 dark:text-white">Hero Section (Home Page)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Main Headline</label>
                  <input type="text" value={localConfig.hero.title} onChange={e => setLocalConfig({ ...localConfig, hero: { ...localConfig.hero, title: e.target.value } })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Subtitle</label>
                  <textarea value={localConfig.hero.subtitle} onChange={e => setLocalConfig({ ...localConfig, hero: { ...localConfig.hero, subtitle: e.target.value } })} className={inputClass} rows="3" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Hero Image URL (Paste link to any image)</label>
                  <input type="url" value={localConfig.hero.image} onChange={e => setLocalConfig({ ...localConfig, hero: { ...localConfig.hero, image: e.target.value } })} className={`${inputClass} font-mono text-sm`} placeholder="https://..." />
                  {localConfig.hero.image && <img src={localConfig.hero.image} alt="Preview" className="mt-4 w-64 h-40 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />}
                </div>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="font-bold text-lg border-b border-slate-200 dark:border-slate-800 pb-4 text-slate-900 dark:text-white">Instructor Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input type="text" value={localConfig.profile.name} onChange={e => setLocalConfig({ ...localConfig, profile: { ...localConfig.profile, name: e.target.value } })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">WhatsApp Phone (No spaces)</label>
                  <input type="text" value={localConfig.profile.phone} onChange={e => setLocalConfig({ ...localConfig, profile: { ...localConfig.profile, phone: e.target.value } })} className={inputClass} placeholder="919876543210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Professional Title</label>
                <input type="text" value={localConfig.profile.title} onChange={e => setLocalConfig({ ...localConfig, profile: { ...localConfig.profile, title: e.target.value } })} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Biography</label>
                <textarea value={localConfig.profile.bio} onChange={e => setLocalConfig({ ...localConfig, profile: { ...localConfig.profile, bio: e.target.value } })} className={inputClass} rows="5" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Profile Photo URL</label>
                <input type="url" value={localConfig.profile.avatar} onChange={e => setLocalConfig({ ...localConfig, profile: { ...localConfig.profile, avatar: e.target.value } })} className={`${inputClass} font-mono text-sm`} placeholder="https://..." />
                {localConfig.profile.avatar && <img src={localConfig.profile.avatar} alt="Preview" className="mt-4 w-24 h-24 object-cover rounded-full border border-slate-200 dark:border-slate-700" />}
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Add New Course</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="Course Title" onChange={e => setNewItem({ ...newItem, title: e.target.value })} value={newItem.title || ''} className={inputClass} />
                  <input type="text" placeholder="Price (e.g., ₹999)" onChange={e => setNewItem({ ...newItem, price: e.target.value })} value={newItem.price || ''} className={inputClass} />
                </div>
                <textarea placeholder="Short Description" onChange={e => setNewItem({ ...newItem, description: e.target.value })} value={newItem.description || ''} className={inputClass} rows="2" />
                <textarea placeholder="Syllabus Topics (Comma separated)" onChange={e => setNewItem({ ...newItem, syllabus: e.target.value.split(',') })} value={newItem.syllabus?.join(',') || ''} className={inputClass} rows="2" />
                <button onClick={() => { if (newItem.title) { onAction('services', 'add', newItem); setNewItem({}); } }} className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-lg font-medium">Create Course</button>
              </div>

              <h3 className="font-bold text-lg px-2 text-slate-900 dark:text-white">Manage Courses</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map(s => (
                  <div key={s.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 relative">
                    <button onClick={() => onAction('services', 'delete', null, s.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    <h4 className="font-bold pr-8 mb-2 text-slate-900 dark:text-white">{s.title}</h4>
                    <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold px-2 py-1 rounded text-sm mb-3">{s.price}</span>
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Add Photo via URL</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="Caption" onChange={e => setNewItem({ ...newItem, caption: e.target.value })} value={newItem.caption || ''} className={inputClass} />
                  <select onChange={e => setNewItem({ ...newItem, category: e.target.value })} value={newItem.category || 'Students'} className={inputClass}>
                    <option value="Students">Students</option>
                    <option value="Events">Events</option>
                    <option value="Campus">Campus</option>
                  </select>
                </div>
                <input type="url" placeholder="Direct Image URL (https://...)" onChange={e => setNewItem({ ...newItem, url: e.target.value })} value={newItem.url || ''} className={`${inputClass} font-mono text-sm`} />
                <button onClick={() => { if (newItem.url) { onAction('gallery', 'add', { ...newItem, category: newItem.category || 'Students' }); setNewItem({}); } }} className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-lg font-medium">Add to Gallery</button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery.map(img => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-200 dark:border-slate-800 bg-slate-100">
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <p className="text-white text-xs font-bold truncate mb-2">{img.caption}</p>
                      <button onClick={() => onAction('gallery', 'delete', null, img.id)} className="self-end bg-red-500 text-white p-1.5 rounded-md hover:bg-red-600"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FEEDBACK TAB */}
          {activeTab === 'feedback' && (
            <div className="space-y-12">
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-3 text-slate-900 dark:text-white">Pending Approvals <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">{feedbacks.filter(f => f.status === 'pending').length}</span></h3>
                <div className="grid gap-4">
                  {feedbacks.filter(f => f.status === 'pending').map(f => (
                    <div key={f.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-yellow-300 dark:border-yellow-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-slate-900 dark:text-white">{f.name}</span>
                          <span className="text-yellow-600 dark:text-yellow-500 text-xs font-bold">{f.rating} Stars</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">"{f.message}"</p>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                        <button onClick={() => onAction('feedbacks', 'update', { status: 'approved' }, f.id)} className="flex-1 md:flex-none px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors">Approve</button>
                        <button onClick={() => onAction('feedbacks', 'delete', null, f.id)} className="flex-1 md:flex-none px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-red-100 hover:text-red-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors">Reject</button>
                      </div>
                    </div>
                  ))}
                  {feedbacks.filter(f => f.status === 'pending').length === 0 && (
                    <div className="text-center py-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500">No pending reviews.</div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Approved Reviews</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {feedbacks.filter(f => f.status === 'approved').map(f => (
                    <div key={f.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center group">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{f.name}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">"{f.message}"</p>
                      </div>
                      <button onClick={() => onAction('feedbacks', 'delete', null, f.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LEADS TAB */}
          {activeTab === 'leads' && (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Student Inquiries</h3>
              {leads.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No leads yet.</div>
              ) : leads.map(l => (
                <div key={l.id} className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{l.name}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{l.phone}</p>
                    <p className="text-xs text-slate-400 mt-1">{l.createdAt?.toDate().toLocaleString()}</p>
                  </div>
                  <button onClick={() => window.open(`https://wa.me/${l.phone}`, '_blank')} className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    Message on WhatsApp
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* FAQ TAB */}
          {activeTab === 'faq' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Add FAQ</h3>
                <input type="text" placeholder="Question" onChange={e => setNewItem({ ...newItem, question: e.target.value })} value={newItem.question || ''} className={inputClass} />
                <textarea placeholder="Answer" onChange={e => setNewItem({ ...newItem, answer: e.target.value })} value={newItem.answer || ''} className={`${inputClass} mt-4`} rows="3" />
                <button onClick={() => { if (newItem.question) { onAction('faqs', 'add', newItem); setNewItem({}); } }} className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-lg font-medium">Add FAQ</button>
              </div>
              <div className="space-y-4">
                {faqs.map(f => (
                  <div key={f.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 relative group">
                    <button onClick={() => onAction('faqs', 'delete', null, f.id)} className="absolute top-5 right-5 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    <h4 className="font-bold text-slate-900 dark:text-white pr-8 mb-1">{f.question}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;