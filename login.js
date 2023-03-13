const overlay = document.querySelector(".overlay");

const overlayView = () =>{
    let overlayImg = ["Reels-pic.jpg","overlay1.jpg","overlay 2.jpg","th.jpg"];

    overlay.setAttribute('src',overlayImg[Math.floor(Math.random() * overlayImg.length)]);
}

setInterval(()=>{
    overlayView();
},4000);

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

const signIn = () =>{
    const email = document.getElementById("username").value;
    const password =document.getElementById("password").value;
    let rawData;
    db.collection('users')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        let count = 0;
        rawData.forEach(ele =>{
            if(ele.password == password && ele.email == email){
                count++;
                localStorage.clear();
                localStorage.setItem('data',JSON.stringify(ele));
                window.location.href = "index.html";
            }
        })
        if(count == 0){
            alert("Invalid Username/Password");
        }
    })
}

const login = document.getElementById("log-in");
login.addEventListener("click",()=>{
    signIn();
})


window.onload = () =>{
    let data = localStorage.getItem('data');
    let dataLog = JSON.parse(data);
    if(dataLog){
        window.location.href = "index.html"
    }
}

const forgot = document.querySelector("#forgot-password");

forgot.addEventListener('click',()=>{
    window.location.href = "forgot.html"
})
