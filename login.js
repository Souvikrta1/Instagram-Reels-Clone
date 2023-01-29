const overlay = document.querySelector(".overlay");

const overlayView = () =>{
    let overlayImg = ["/Files/Reels-pic.jpg","/Files/overlay1.jpg","/Files/overlay 2.jpg","/Files/th.jpg"];

    overlay.setAttribute('src',overlayImg[Math.floor(Math.random() * overlayImg.length)]);
}

setInterval(()=>{
    overlayView();
},4000);

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