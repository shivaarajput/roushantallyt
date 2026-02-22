import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCI4qRrEhAUM1b-847fnBMLXi4XYunhRtw",
  authDomain: "first-react-57599.firebaseapp.com",
  databaseURL: "https://first-react-57599-default-rtdb.firebaseio.com",
  projectId: "first-react-57599",
  storageBucket: "first-react-57599.firebasestorage.app",
  messagingSenderId: "815591185148",
  appId: "1:815591185148:web:4f8c140ea9c91cababd579"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const galleryData = [
  { caption: "Tally Class Students", category: "Students", url: "/gallery/image01.jpg" },
  { caption: "Accounting Practice", category: "Students", url: "/gallery/image02.jpg" },
  { caption: "GST Workshop", category: "Events", url: "/gallery/image03.jpg" },
  { caption: "Institute Event", category: "Events", url: "/gallery/image04.jpg" },
  { caption: "Computer Lab", category: "Campus", url: "/gallery/image05.jpg" },
  { caption: "Training Room", category: "Campus", url: "/gallery/image06.jpg" },
  { caption: "Students Batch", category: "Students", url: "/gallery/image07.jpg" },
  { caption: "Live Practice", category: "Students", url: "/gallery/image08.jpg" },
  { caption: "Seminar", category: "Events", url: "/gallery/image09.jpg" },
  { caption: "Certification Day", category: "Events", url: "/gallery/image10.jpg" },
  { caption: "Main Campus", category: "Campus", url: "/gallery/image11.jpg" },
  { caption: "Reception", category: "Campus", url: "/gallery/image12.jpg" },
  { caption: "Student Training", category: "Students", url: "/gallery/image13.jpg" },
  { caption: "Doubt Class", category: "Students", url: "/gallery/image14.jpg" },
  { caption: "Annual Event", category: "Events", url: "/gallery/image15.jpg" },
  { caption: "Guest Lecture", category: "Events", url: "/gallery/image16.jpg" },
  { caption: "Classroom", category: "Campus", url: "/gallery/image17.jpg" },
  { caption: "Computer Section", category: "Campus", url: "/gallery/image18.jpg" },
  { caption: "Tally Practice", category: "Students", url: "/gallery/image19.jpg" },
  { caption: "Batch Study", category: "Students", url: "/gallery/image20.jpg" },
  { caption: "Workshop", category: "Events", url: "/gallery/image21.jpg" },
  { caption: "Prize Distribution", category: "Events", url: "/gallery/image22.jpg" },
  { caption: "Institute Building", category: "Campus", url: "/gallery/image23.jpg" },
  { caption: "Training Center", category: "Campus", url: "/gallery/image24.jpg" },
  { caption: "Happy Students", category: "Students", url: "/gallery/image25.jpg" }
];

async function uploadGallery() {
  for (const item of galleryData) {
   await addDoc(collection(db, "artifacts", "default-app-id", "public", "data", "gallery"), {
      caption: item.caption,
      category: item.category,
      url: item.url,
      createdAt: serverTimestamp()
    });
    console.log("Uploaded:", item.caption);
  }

  console.log("🔥 All gallery uploaded");
}

uploadGallery();