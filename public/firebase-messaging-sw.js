// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );

// const defaultConfig = {
//   apiKey: "AIzaSyA57ATfewo20uHosQhU_8xLqzQH4nHWguk",
//   authDomain: "video-calling-4152f.firebaseapp.com",
//   projectId: "video-calling-4152f",
//   storageBucket: "video-calling-4152f.appspot.com",
//   messagingSenderId: "351423523016",
//   appId: "1:351423523016:web:2bcf6073502754d9abddfd",
//   measurementId: "G-4GHVBR33LF",
//   // apiKey: true,
//   // authDomain: true,
//   // projectId: true,
//   // storageBucket: true,
//   // messagingSenderId: true,
//   // appId: true,
//   // measurementId: true,
// };
// firebase.initializeApp(defaultConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//     console.log(payload,'backgroundpayload')
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     // icon: payload.data.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const defaultConfig = {
  apiKey: "AIzaSyA57ATfewo20uHosQhU_8xLqzQH4nHWguk",
  authDomain: "video-calling-4152f.firebaseapp.com",
  projectId: "video-calling-4152f",
  storageBucket: "video-calling-4152f.appspot.com",
  messagingSenderId: "351423523016",
  appId: "1:351423523016:web:2bcf6073502754d9abddfd",
  measurementId: "G-4GHVBR33LF",
};

firebase.initializeApp(defaultConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    // icon: payload.data.icon, // Use if you have an icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
