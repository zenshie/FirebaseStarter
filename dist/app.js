 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
 import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeH33MOxva6XNUOdOJ-KNYyApWm3lBVv8",
  authDomain: "gettingstartedwithfireba-7fca5.firebaseapp.com",
  projectId: "gettingstartedwithfireba-7fca5",
  storageBucket: "gettingstartedwithfireba-7fca5.appspot.com",
  messagingSenderId: "552884267727",
  appId: "1:552884267727:web:badb511b4867a46167a5ba",
  measurementId: "G-VXFGGR48Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const db = getFirestore(app);
console.log(app)


 // register - function that registers new users
 export function register(email,password) {
  //For new registration
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("Registration successfully!!");
    window.open("index_login.html", "_self");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage);
    alert(error);
  });
}

 // Sign in through Google account
 export function  loginGmail() {
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        
        alert(user.email+" Login successfully!!!");
        window.location.href = "homepage.html";
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        alert(errorMessage);
    });
}

// login - function that allows the user to log in the app
export function  login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert(user.email+" Login successfully!!!");
     window.location.href = "homepage.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage);
  });		  		  
}
    
// logout - function that allows the user to logs out their account  
export function logout(){
  // //----- Logout code start	  
      signOut(auth).then(() => {
          // Sign-out successful.
          console.log('Sign-out successful.');
          alert('Sign-out successful.');
          document.getElementById('logout').style.display = 'none';
          window.location.href = "index.html";
        }).catch((error) => {
          // An error happened.
          console.log('An error happened.');
        });		  		 
}