
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyAaCRjgYot_lJcq9SLDNPAEQDXcOEovVC8",
        authDomain: "tfginfo-be99f.firebaseapp.com",
        projectId: "tfginfo-be99f",
        storageBucket: "tfginfo-be99f.appspot.com",
        messagingSenderId: "914764176098",
        appId: "1:914764176098:web:3b41c1ac1fea4646201cbb",
        measurementId: "G-75GT6N3VGE"
      };
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
   