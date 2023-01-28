const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAy8ThfDcxKGFTsFaa6YK-SuRQ75BprKyk",
    authDomain: "insta-reels-79019.firebaseapp.com",
    projectId: "insta-reels-79019",
    storageBucket: "insta-reels-79019.appspot.com",
    messagingSenderId: "719535708155",
    appId: "1:719535708155:web:040bab3c91c7eb5f951d5e"
})

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const register = (e) => {
    const email = e.target.email.value;
    const fullName = e.target.fullName.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    auth.createUserWithEmailAndPassword(email,password,fullName,username).then((res)=>{
        console.log(res.user)
    }).catch((err) =>{
        console.log(err.code);
        console.log(err.message)
    })
}

const signed = document.getElementById("sign-up-form");

signed.addEventListener("submit",(e)=>{
    e.preventDefault();
    register(e);
    saveData(e);
    
})

const saveData = (e) =>{
    const email = e.target.email.value;
    const fullName = e.target.fullName.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    db.collection('users')
    .add({
        fullName : fullName,
        email:email,
        password:password,
        username : username,
        log : "true"
    })
    .then((docRef)=>{
        console.log("Document written with ID: ",docRef.id);
        window.location.href = "/index.html";
    })
    .catch((error)=>{
        console.log("Error adding document: ",error)
    })
}

