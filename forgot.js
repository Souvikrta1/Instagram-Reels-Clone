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
