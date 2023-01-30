const firebaseApp = firebase.initializeApp({
   apiKey: "AIzaSyBBnBTK2ipS9KbHrrd9fBpCBiRSaslKw3E",
    authDomain: "reels-8c3f2.firebaseapp.com",
    projectId: "reels-8c3f2",
    storageBucket: "reels-8c3f2.appspot.com",
    messagingSenderId: "554502677111",
    appId: "1:554502677111:web:97587a519c821b7b625c72"
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
