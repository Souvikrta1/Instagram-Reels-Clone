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

const recovery = document.querySelector("#recover");


const showPassword = document.querySelector(".recovered");
const search = document.querySelector("#search");
const security = document.querySelector("label");

search.addEventListener("click",()=>{
    question();
})



recovery.addEventListener("click",()=>{
    recoverFunc();
})

const recoverFunc = () =>{
    const recoveryEmail= document.querySelector("#email").value;
    const recoveryAns = document.querySelector("#answer").value;
    let rawData;
    db.collection('users')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        rawData.forEach(ele =>{
            if(ele.email == recoveryEmail && ele.answer == recoveryAns){
                console.log("yes")
                showPassword.innerText = `Your Password is : ${ele.password}`
            }
        })  
    })
}

const question = () =>{
    const recoveryEmail= document.querySelector("#email").value;
    let rawData;
    db.collection('users')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        rawData.forEach(ele =>{
            if(ele.email == recoveryEmail){
                security.innerHTML = `${ele.select}`
            }
        })  
    })
}