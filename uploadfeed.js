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

const appId = "default-app-id"; // change if different

const feedbackData = [
{
name: "Mohi Sharma",
rating: 5,
status: "approved",
avatar: "",
message: "Thank you for being an exceptional teacher! A teacher who makes learning an adventure and education a joy. My experience of tally class is so good and I learnt so many new things.",
},

{
name: "Aryan",
rating: 5,
status: "approved",
avatar: "",
message: "Raushan sir teaches Tally very well and he has good experience in teaching field. His teaching method is simple and practical.",
},

{
name: "Manish Kumar",
rating: 5,
status: "approved",
avatar: "",
message: "Roshan Sir has long experience in teaching field. He teaches tally so easily and clears all doubts in class itself. Best teacher for accounting.",
},

{
name: "Sonu Sanskar",
rating: 5,
status: "approved",
avatar: "",
message: "I have no words to thank Sir. You explained each and every step in detail. We learnt a lot under your guidance. You are the best teacher of Tally.",
},

{
name: "Shruti Kumari",
rating: 5,
status: "approved",
avatar: "",
message: "Your expertise and patience in explaining complex concepts have been invaluable. You uplift confidence of students and create strong learning environment.",
},

{
name: "Vinay Raj",
rating: 5,
status: "approved",
avatar: "",
message: "You have a talent for breaking down complex concepts into easy understanding. Real world examples help a lot. Best teacher of my life.",
},

{
name: "Rahul Kumar",
rating: 5,
status: "approved",
avatar: "",
message: "You are the best teacher in tally. Thank you for being an exceptional teacher. I am very thankful to Raushan sir.",
}
];

async function uploadFeedbacks() {

const ref = collection(db, "artifacts", appId, "public", "data", "feedbacks");

for (const f of feedbackData) {
  await addDoc(ref, {
    name: f.name,
    message: f.message,
    rating: f.rating,
    status: "approved",
    avatar: f.avatar,
    createdAt: serverTimestamp()
  });

  console.log("uploaded:", f.name);
}

console.log("🔥 uploaded to artifacts path");
}

uploadFeedbacks();