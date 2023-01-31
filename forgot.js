const firebaseApp = firebase.initializeApp({
   apiKey: "AIzaSyBUdoks0DRGjgbHXVTXCbbAQ0Qpr4uyUnA",
    authDomain: "reels-pro.firebaseapp.com",
    projectId: "reels-pro",
    storageBucket: "reels-pro.appspot.com",
    messagingSenderId: "100087925963",
    appId: "1:100087925963:web:a8e5829695f485f9fa9f4e"
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
