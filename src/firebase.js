import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAuuAZzXebMaLh52q9ilBg4psaVL_j0Qq0",
  authDomain: "neonadeuli-64a1f.firebaseapp.com",
  databaseURL: "https://neonadeuli-64a1f-default-rtdb.firebaseio.com",
  projectId: "neonadeuli-64a1f",
  storageBucket: "neonadeuli-64a1f.appspot.com",
  messagingSenderId: "407013470573",
  appId: "1:407013470573:web:409a32551eeb6cb52c2a64",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export default database;
