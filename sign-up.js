const firebaseApp = firebase.initializeApp({
     apiKey: "AIzaSyCqhNgiWAtTXTBq0on3eqsloVhHzp90rIQ",
  authDomain: "instagram-reels-9cc40.firebaseapp.com",
  projectId: "instagram-reels-9cc40",
  storageBucket: "instagram-reels-9cc40.appspot.com",
  messagingSenderId: "695960196264",
  appId: "1:695960196264:web:7d1cdd43cf34ebab2a5e9d"
})

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const register = (e) => {
    const email = e.target.email.value;
    const fullName = e.target.fullName.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const answer = e.target.answer.value;
    const select = document.querySelector("select").value;
    

    
    auth.createUserWithEmailAndPassword(email,password,fullName,username,answer,select).then((res)=>{
        console.log(res.user);
        window.location.href = "login.html";
        alert("Your Account Is Created Please Login")
    }).catch((err) =>{
        console.log(err.code);
        alert(err.message)
    })
}

const signed = document.getElementById("sign-up-form");

signed.addEventListener("submit",(e)=>{
    e.preventDefault();
    register(e);
    saveData(e);
    

    console.log(select.value)
})

const saveData = (e) =>{
    const email = e.target.email.value;
    const fullName = e.target.fullName.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const answer = e.target.answer.value;
    const select = document.querySelector("select").value;

    db.collection('users')
    .add({
        fullName : fullName,
        email:email,
        password:password,
        username : username,
        answer : answer,
        select: select
    })
    .then((docRef)=>{
        console.log("Document written with ID: ",docRef.id);
        // window.location.href = "/index.html";
    })
    .catch((error)=>{
        console.log("Error adding document: ",error)
    })
}

