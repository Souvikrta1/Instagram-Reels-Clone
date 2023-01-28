const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAy8ThfDcxKGFTsFaa6YK-SuRQ75BprKyk",
    authDomain: "insta-reels-79019.firebaseapp.com",
    projectId: "insta-reels-79019",
    storageBucket: "insta-reels-79019.appspot.com",
    messagingSenderId: "719535708155",
    appId: "1:719535708155:web:040bab3c91c7eb5f951d5e"
})

/* <button id="log-out">Log Out</button> */

const db = firebaseApp.firestore();

// window.onload = () =>{
//     disableBack();
// }
// function disableBack(){
//     window.history.pushState(null,"",window.location.href);
//     window.onpopstate = () =>{
//         window.history.pushState(null,"",window.location.href);
//         alert("")
//     };
// }
// const readData = () =>{
//     let rawData;
//     db.collection('users')
//     .get()
//     .then((data)=>{
//         rawData = (data.docs.map((item) =>{
//             return {...item.data(),id:item.id}
//         }))
//         rawData.forEach(ele =>{
//             if(ele.log == "false"){
//                 window.location.href = "/HTML/login.html";
//             }
//         })
//     })
// }

// const updateData = () =>{
//     let rawData;
//     db.collection('users')
//     .get()
//     .then((data)=>{
//         rawData = (data.docs.map((item) =>{
//             return {...item.data(),id:item.id}
//         }))
//     db.collection('users').doc(`${rawData[0]['id']}`)
//     .update({
//         log : "false"
//     }).then(()=>{
//         window.location.href = "/HTML/login.html";
//     })
// })
// }

// const logOut = document.getElementById("log-out");

// logOut.addEventListener("click",()=>{
//     updateData();
// })


const reelsPlay = document.querySelector(".reels-play");

// reelsPlay.play();

const chooseReels = document.querySelector(".choose-reels");
const show = document.querySelector("#show-uploader");
const uploadReels = document.querySelector("#upload-reels");
const uploadProcess = document.querySelector(".progress");

const uploadArea = document.querySelector(".upload-section")


show.addEventListener("click",()=>{
    uploadArea.style.display = 'flex'
})

uploadReels.addEventListener("click",(e)=>{
    chooseReels.style.display = 'none';
    uploadReels.style.display = 'none';
    uploadProcess.style.display = 'block';
    
    let file = chooseReels.files[0];
    
    let storageRef = firebase.storage().ref('videos'+file.name)

    let task  = storageRef.put(file);

    task.on('state-changed',(snapshot)=>{
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes) *100;
        uploadProcess.innerHTML = "Upload : " + progress.toFixed() + "%";
    })
    task.then(() => storageRef.getDownloadURL().then((url) =>{
        db.collection('links')
        .add({
            url : url
        })
    }))
})

let reels = document.querySelector("#reels-container");

    let rawData;
    db.collection('links')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        rawData.forEach((ele,index) =>{
            reels.innerHTML += `<iframe class="reels-play" src='${ele.url}'></iframe>`
            console.log(reels)
        })
    })
