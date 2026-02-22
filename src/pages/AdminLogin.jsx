import { useState } from "react";
import {
  Lock, Mail
} from 'lucide-react';
import { inputClass } from "../../config";
import {
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail, signOut
} from 'firebase/auth';


// ============================================================================
// COMPONENTS: ADMIN UI
// ============================================================================

const AdminLogin = ({ onSuccess, onBack, showNotification, auth }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      showNotification("Welcome to Teacher Panel!");
      onSuccess();
    } catch (err) {
      showNotification("Login failed. Check credentials.", "error");
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      // check existing methods for this email
      const methods = await fetchSignInMethodsForEmail(auth, email);
      console.log(methods)

      // allow only if email/password account already exists
      if (methods.includes("password")) {
        showNotification("Welcome to Teacher Panel!");
        onSuccess();
      } else {
        // ❌ Not registered with email/password
        await signOut(auth);
        showNotification("You are not authorized", "error");
      }

    } catch (err) {
      console.log(err);
      showNotification("Google Sign-In failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4">
      <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl shadow-xl p-10 space-y-8 border border-slate-200 dark:border-slate-800">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Teacher Portal</h2>
          <p className="text-slate-500 text-sm">Secure access for instructors.</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="Email Address" required />
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} className={inputClass} placeholder="Password" required />
          <button disabled={loading} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Login with Email'}
          </button>
        </form>

        {/* <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">Or</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
        </div>

        <button onClick={handleGoogleLogin} className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-3 transition-colors">
          <Mail size={18} /> Continue with Google
        </button> */}

        <button onClick={onBack} className="w-full text-center text-slate-500 font-medium hover:text-slate-900 dark:hover:text-white transition-colors mt-4">← Return to Website</button>
      </div>
    </div>
  );
};

export default AdminLogin;