const overlay = document.querySelector(".overlay");

const overlayView = () =>{
    let overlayImg = ["Reels-pic.jpg","overlay1.jpg","overlay 2.jpg","th.jpg"];

    overlay.setAttribute('src',overlayImg[Math.floor(Math.random() * overlayImg.length)]);
}

setInterval(()=>{
    overlayView();
},4000);

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
        rawData.forEach(ele =>{
            if(ele.password == password && ele.email == email){
                localStorage.clear();
                localStorage.setItem('data',JSON.stringify(ele));
                window.location.href = "index.html";
            }
        })  
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
