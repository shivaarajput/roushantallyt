import { useState, useEffect } from 'react';
import { auth, db, appId } from "../firebase";
import {
  signInWithCustomToken, onAuthStateChanged, signOut
} from 'firebase/auth';
import {
  collection, doc, setDoc, addDoc, updateDoc, deleteDoc,
  onSnapshot, serverTimestamp
} from 'firebase/firestore';

import {
  X, Check, Loader2
} from 'lucide-react';

import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

import { DEFAULT_CONFIG } from '../config';




// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // Added to prevent login page flashes
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname === '/admin' ? 'admin_login' : 'public');
  const [darkMode, setDarkMode] = useState(() => {
    // first check saved preference
    const saved = localStorage.getItem("theme");

    if (saved) {
      return saved === "dark";
    }

    // otherwise use system preference
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // App Data States

  const [siteConfig, setSiteConfig] = useState(DEFAULT_CONFIG);
  const [services, setServices] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [leads, setLeads] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [notification, setNotification] = useState(null);

  // Path Routing Listener
  useEffect(() => {
    const handlePathChange = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setCurrentRoute(isAdminAuth ? 'admin_dashboard' : 'admin_login');
      } else {
        setCurrentRoute('public');
      }
    };
    window.addEventListener('popstate', handlePathChange);
    // Don't call handlePathChange here if auth is still loading, let Auth effect handle initial route
    if (!authLoading) handlePathChange();
    return () => window.removeEventListener('popstate', handlePathChange);
  }, [isAdminAuth, authLoading]);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // save whenever user changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    // optional: add class to body
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Firebase Auth Setup (Persistent Login Verification)
  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        try { await signInWithCustomToken(auth, __initial_auth_token); } catch (e) { console.error(e); }
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Auto-detect Teacher/Admin if logged in via Email or Google
      if (currentUser && currentUser.email) {
        setIsAdminAuth(true);
        if (window.location.pathname === '/admin') {
          setCurrentRoute('admin_dashboard'); // Go straight to dashboard!
        }
      } else {
        setIsAdminAuth(false);
        if (window.location.pathname === '/admin') {
          setCurrentRoute('admin_login');
        }
      }
      setAuthLoading(false); // Auth resolved, safe to render UI
    });
    return () => unsubscribe();
  }, []);

  // Secure Data Loading (Runs independently of Auth state for public viewers)
  useEffect(() => {
    const configRef = doc(db, 'artifacts', appId, 'public', 'data', 'config', 'main');
    const unsubConfig = onSnapshot(configRef, (docSnap) => {
      if (docSnap.exists()) {
        setSiteConfig(prev => ({ ...prev, ...docSnap.data() }));
      } else {
        setDoc(configRef, DEFAULT_CONFIG, { merge: true }).catch(() => { });
      }
    }, (err) => console.error("Config fetch error:", err));

    const collections = ['services', 'faqs', 'feedbacks', 'leads', 'gallery'];
    const unsubs = collections.map(col => {
      return onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', col), (snapshot) => {
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        if (col === 'services') setServices(data);
        if (col === 'faqs') setFaqs(data);
        if (col === 'feedbacks') setFeedbacks(data);
        if (col === 'leads') setLeads(data);
        if (col === 'gallery') setGallery(data);
      }, (err) => console.error(`Fetch error for ${col}:`, err));
    });

    return () => {
      unsubConfig();
      unsubs.forEach(unsub => unsub());
    };
  }, []);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDataAction = async (collectionName, action, data, id) => {
    try {
      const ref = collection(db, 'artifacts', appId, 'public', 'data', collectionName);

      // Clean data to prevent Firebase "undefined" silent failures
      const cleanData = data ? JSON.parse(JSON.stringify(data)) : null;

      if (action === 'add') {
        const docRef = await addDoc(ref, { ...cleanData, createdAt: serverTimestamp() });

        // ⭐ custom success messages
        if (collectionName === "feedbacks") {
          showNotification("Thank you! Your feedback is awaiting approval.");
        }
        else if (collectionName === "gallery") {
          showNotification("Photo added to gallery successfully.");
        }
        else if (collectionName === "courses") {
          showNotification("Course created successfully.");
        }
        else {
          showNotification("Added successfully!");
        }

        return docRef.id;
      }

      else if (action === 'update') {
        await updateDoc(doc(ref, id), cleanData);

        if (collectionName === "feedbacks") {
          showNotification("Feedback updated.");
        } else {
          showNotification("Updated successfully!");
        }
      }

      else if (action === 'delete') {
        await deleteDoc(doc(ref, id));

        if (collectionName === "feedbacks") {
          showNotification("Feedback removed.");
        } else if (collectionName === "gallery") {
          showNotification("Photo deleted.");
        } else {
          showNotification("Deleted successfully!");
        }
      }
    } catch (e) {
      console.error("Action error:", e);
      showNotification("Action failed. Check permissions.", "error");
      throw e; // Re-throw to ensure calling components handle the error state
    }
  };

  const handleAdminLogout = async () => {
    await signOut(auth);
    setIsAdminAuth(false);
    navigateTo('/');
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Prevent routing flash by holding render until Auth is verified
  if (authLoading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'dark bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <h2 className="text-xl font-bold">Loading Platform...</h2>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'dark' : ''} font-sans antialiased text-slate-900 dark:text-slate-100`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">

        {/* Global Notification Toast */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl transform transition-all duration-300 animate-in fade-in slide-in-from-top-4 font-medium flex items-center gap-2 ${notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-600 text-white'}`}>
            {notification.type === 'error' ? <X size={18} /> : <Check size={18} />}
            {notification.msg}
          </div>
        )}

        {/* Route Management */}
        {currentRoute === 'public' && (
          <Home
            config={siteConfig} services={services} feedbacks={feedbacks} faqs={faqs} gallery={gallery}
            onAction={handleDataAction} darkMode={darkMode} toggleDarkMode={toggleDarkMode} navigateTo={navigateTo}
          />
        )}

        {currentRoute === 'admin_login' && (
          <AdminLogin
            onSuccess={() => { setIsAdminAuth(true); navigateTo('/admin'); }}
            onBack={() => navigateTo('/')}
            showNotification={showNotification}
            auth={auth}
          />
        )}

        {currentRoute === 'admin_dashboard' && (
          <AdminDashboard
            config={siteConfig} services={services} feedbacks={feedbacks} faqs={faqs} leads={leads} gallery={gallery}
            onSaveConfig={async (newConfig) => {
              try {
                const cleanConfig = JSON.parse(JSON.stringify(newConfig));
                await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'main'), cleanConfig, { merge: true });
                showNotification("Settings Saved Successfully!");
              } catch (err) {
                console.error("Save config error:", err);
                showNotification("Error saving settings.", "error");
              }
            }}
            onAction={handleDataAction} onLogout={handleAdminLogout}
            darkMode={darkMode} toggleDarkMode={toggleDarkMode}
          />
        )}
      </div>
    </div>
  );
}
