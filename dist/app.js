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

// getDocs = functions that uses getDocs from firebase
const querySnapshot = await getDocs(collection(db, "covid-test"));
export function viewTest(){
  querySnapshot.forEach((doc) => {
    document.getElementById("cardSection").innerHTML+=`
      <div>
        <div>
          <h5>${doc.data().location}</h5>
          <p>${doc.data().new_case}</p>
        </div>
      </div>`      
  });
  
}

// GetAllDataOnce - function that Get All Data in first load. mostly use in Realtime Database
export function GetAllDataOnce(){
  db.collection("covid-test").get().then((querySnapshot)=>{
      var results = [];
      querySnapshot.forEach(doc => {
        results.push(doc.data());
      });
      
      AddAllItemsToTheTable(results);
  });
}

// GetAllDataOnce - function that gets all data in realtime
export function GetAllDataRealtime(){
      var results = [];
      querySnapshot.forEach(doc => {
        results.push(doc.data());
      });
      AddAllItemsToTheTable(results);
}

var num = 0;
var tbody = document.getElementById('tbody1');

// AddItemToTable - function that creates rows and appends data to the table
function AddItemToTable(idNo,iso_code,location,date, newCase, newDeath){
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  var td6 = document.createElement('td');
  var td7 = document.createElement('td');

  td1.style.display = "none";
  td1.innerHTML = idNo;
  td2.innerHTML = iso_code;
  td3.innerHTML = location;
  td4.innerHTML = date.toDate().toDateString();
  td5.innerHTML = newCase;
  td6.innerHTML = newDeath;
  td7.innerHTML = "<button type='button'; onclick='deleteRow(this);'>" + "Edit" + "</button><button type='button'>" + "Delete" + "</button>"
// onclick='productDelete(this);'

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  trow.appendChild(td7);

  tbody.appendChild(trow);
}

//AddAllItemsToTheTable - function that gets the data from firestore database then add it to the table
function AddAllItemsToTheTable(ResultDocsList){
  console.log(ResultDocsList);
  tbody.innerHTML="";
  ResultDocsList.forEach(element => {
    AddItemToTable(element.idNo,element.iso_code,element.location, element.date, element.new_case, element.new_death)
  });
}

//addDataBtnClicked - function for Add Button when clicked
export async function addDataBtnClicked(iso_code,location,date,new_case,new_death){
  //addDoc - builtin function from firestore that adds data to firestore database
  await addDoc(collection(db, "covid-test"), {
    iso_code: iso_code,
    location: location,
    date: new Date(date),
    new_case: new_case,
    new_death: new_death  });

  alert('Result added succesfully!');
  refreshPage();
}

// refreshPage - function that refreshes page
function refreshPage() {
  window.location.reload(false);
}

// convert date string to timestamp
const toTimestamp = (strDate) => {
  const dt = DateTime.parse(strDate);
  return dt / 1000;
};


// function deleteRow(el) {
//   if(!confirm("Are you sure you want to delete?")) return;
  
//   var tbl = el.parentNode.parentNode.parentNode;
//   var row = el.parentNode.parentNode.rowIndex;

//   tbl.deleteRow(row);

// }
