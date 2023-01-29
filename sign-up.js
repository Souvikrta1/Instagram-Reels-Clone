const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAwCsatTla6vIrW__r2aR7DYJ6Euve_Of4",
    authDomain: "reels-12345.firebaseapp.com",
    projectId: "reels-12345",
    storageBucket: "reels-12345.appspot.com",
    messagingSenderId: "11330518083",
    appId: "1:11330518083:web:3b44fa7b0101ed1cc4a8f6"
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

