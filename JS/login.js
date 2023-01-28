const overlay = document.querySelector(".overlay");

const overlayView = () =>{
    let overlayImg = ["/Files/Reels-pic.jpg","/Files/overlay1.jpg","/Files/overlay 2.jpg","/Files/th.jpg"];

    overlay.setAttribute('src',overlayImg[Math.floor(Math.random() * overlayImg.length)]);
}

setInterval(()=>{
    overlayView();
},4000);


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

const readData = () =>{
    const email = document.getElementById("username").value;
    const password =document.getElementById("password").value;
    let rawData;
    db.collection('users')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        rawData.forEach(ele =>{
            if(ele.password == password && ele.username == email || ele.email == email){
                window.location.href = "/index.html";
                const username = document.querySelector(".username");
                username.innerHTML = ele.username;
                } else {
                    alert("wrong username/Password");
                }
        })
    })
}

const login = document.getElementById("log-in");

login.addEventListener("click",()=>{
    readData();
    
})