# 🚀 Roushan Tally Academy Website

Modern responsive website for **Tally & Accounting Institute** with admin panel, gallery, courses, and feedback system.

🌐 **Live Site:** [https://roushantallyt.vercel.app/](https://roushantallyt.vercel.app/)

---

## ✨ Features

* 🎓 Courses management (Admin panel)
* 🖼️ Gallery with categories & fullscreen preview
* ⭐ Student feedback & approval system
* 📊 Dynamic content from Firebase
* 🌙 Dark / Light mode
* 📱 Fully responsive (mobile + desktop)
* 🔗 Hash navigation (#gallery, #courses etc)
* 🔥 Modern UI with Tailwind CSS
* ☁️ Firebase backend (Firestore + Auth)
* 🚀 Deployed on Vercel

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS
* Lucide Icons

**Backend**

* Firebase Firestore
* Firebase Authentication

**Hosting**

* Vercel

---

## 📁 Project Structure

```
src/
 ├─ components/
 │   ├─ Navbar.jsx
 │   ├─ GallerySection.jsx
 │   ├─ CoursesSection.jsx
 │   ├─ FeedbackSection.jsx
 │
 ├─ admin/
 │   ├─ AdminPanel.jsx
 │
 ├─ firebase.js
 ├─ App.jsx
 └─ main.jsx
```

---

## ⚙️ Installation & Setup

Clone repository:

```
git clone https://github.com/shivaarajput/roushantallyt.git
cd roushantallyt
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Build for production:

```
npm run build
```

---

## 🔥 Firebase Setup

Create a file:

```
src/firebase.js
```

Add your Firebase config:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER",
  appId: "YOUR_APPID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

---

## 🧠 Admin Panel Features

Admin can:

* Add courses
* Upload gallery images
* Approve feedback
* Update website content
* Manage sections visibility

---

## 📸 Social Preview Setup

Add preview image:

```
public/preview.jpg
```

Recommended size:

```
1200 × 630 px
```

This will show when sharing website on WhatsApp, Facebook & LinkedIn.

---

## 🚀 Deployment

Build project:

```
npm run build
```

Deploy easily on:

* Vercel (recommended)
* Netlify
* Firebase Hosting

---

## 👨‍💻 Author

**Shivam Kumar**
Developer

---

## ⭐ Support

If you like this project:

Give ⭐ on GitHub and share with others!
