// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getIdToken, GoogleAuthProvider } from "firebase/auth";
// import {getMessaging,getToken,onMessage} from "firbase/messaging";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// import {getToken}from "firbase/messaging"
const firebaseConfig = {

 

  apiKey: "AIzaSyD1jCOG-Oe-AmW1H9_Twk000o4ET1dya7w",

 

  authDomain: "groceryapp-4ea3f.firebaseapp.com",

 

  projectId: "groceryapp-4ea3f",

 

  storageBucket: "groceryapp-4ea3f.appspot.com",

 

  messagingSenderId: "962946943978",

 

  appId: "1:962946943978:web:bc36440336baa19d3d0093",

 

  measurementId: "G-6CWNBK39FV"

 
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
const messaging = getMessaging(app);

const VITE_APP_VAPID_KEY =
  "BJI5SMHO5f0dw5YarPEcqyoOhV26VfsDl6JYKP-PDYYKL74YobmdyJz0V5TzNFa06YlxnNhpUpVvWTIJmn-f6UQ";
console.log(VITE_APP_VAPID_KEY, "VITE_APP_VAPID_KEY/////////////");

// export async function generateToken() {
//   const permission = await Notification.requestPermission();

//   if (permission === "granted") {
//     const token = await getToken(messaging, {
//       vapidKey: VITE_APP_VAPID_KEY,
//     });

//     if (token) {
//       console.log("current token for client: ", token);
//       localStorage.setItem("deviceToken", token);
//       return token;
//     } else {
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//     }
//     console.log("Token generated : ", token);
//   } else if (permission === "denied") {
//     alert("You denied for the notification");
//   }
// }
export async function generateToken() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: VITE_APP_VAPID_KEY,
    });

    if (token) {
      console.log("current token for client: ", token);
      localStorage.setItem("deviceToken", token);
      return token;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
    console.log("Token generated : ", token);
  } else if (permission === "denied") {
    alert("You denied for the notification");
  }
}
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
