const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAwCsatTla6vIrW__r2aR7DYJ6Euve_Of4",
    authDomain: "reels-12345.firebaseapp.com",
    projectId: "reels-12345",
    storageBucket: "reels-12345.appspot.com",
    messagingSenderId: "11330518083",
    appId: "1:11330518083:web:3b44fa7b0101ed1cc4a8f6"
})

let data = localStorage.getItem('data');
let dataLog = JSON.parse(data);

const db = firebaseApp.firestore();

window.onload = () =>{
    if(!dataLog){
        window.location.href = "/HTML/login.html"
    }
    const profile = document.querySelector(".username");
    profile.innerHTML = dataLog.username;
    mainShow();
}

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
        db.collection('link')
        .add({
            url : url,
            username : dataLog.username,
            like : [],
            comment : []
        })
    }))
})

let reels = document.querySelector(".reels-container");

const commentArea = document.querySelector(".user-msg");
let mainShow = () =>{
    let rawData;
    db.collection('link')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        rawData.forEach(ele =>{
            reels.innerHTML += `<li class="reel-data" id="${ele.id}">
                                    <p class="userView"><i class="fa-solid fa-user"></i> ${ele.username}</p>
                                    <button class="like"><i class="fa-solid fa-heart like"></i>${ele.like.length}</button>
                                    <button class="comment"><i class="fa-regular fa-comment comment"></i></button>
                                    <button class="show-comment"><i class="fa-solid fa-message show-comment"></i></button>
                                    <video class="reels-play" src='${ele.url}' controls></video>
                                </li>`
                                
        })
        
        const likeBtn = document.querySelectorAll(".like");

        likeBtn.forEach((ele)=>{
            let idCheck = ele.parentElement.parentElement.getAttribute("id");
            check(idCheck,ele)
        })

        const reelsPlay = document.querySelectorAll(".reels-play");
        console.log(reelsPlay)
        
    })
}

const logOut = document.querySelector("#log-out")
logOut.addEventListener("click",()=>{
    localStorage.clear();
    window.location.href = "/HTML/login.html"
}) 

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("like")){
        let vId = e.target.parentElement.parentElement.getAttribute("id");
        if(e.target.style.color == "red"){
            disLike(vId);
            e.target.style.color = "white";
        } else {
            plusLike(vId);
            e.target.style.color= "red";
        }
    }
    else if(e.target.classList.contains('comment')){
        let vId = e.target.parentElement.parentElement.getAttribute("id");
        commentPlus(vId);
        
    }
    else if(e.target.classList.contains("show-comment")){
        commentArea.style.display = "flex";
        let vId = e.target.parentElement.parentElement.getAttribute("id");
        showComment(vId);
        
    } else if(e.target.classList.contains("close-msg")){
        commentArea.style.display = 'none'
    }
})



const plusLike = (vId) =>{
    db.collection('link')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        
    rawData.forEach((ele)=>{
        if(ele.id == vId){
            console.log(ele)
            let liker = [];
            let count = 0;
            ele.like.forEach((e)=>{
                liker.push(e);
                if(e == dataLog.username){
                    count++;
                }
            })
            if(count == 0){
                liker.push(dataLog.username)
            }
            console.log(count)
            db.collection('link').doc(`${ele.id}`)
            .update({
                like : liker
            })
        }
    })
})
}


const disLike = (vId) =>{
    db.collection('link')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        
    rawData.forEach((ele)=>{
        if(ele.id == vId){
            let liker = [];
            ele.like.forEach((e,i)=>{
                if(e == dataLog.username){
                    ele.like.splice(i,1);
                }
            })
            ele.like.forEach((e)=>{
                liker.push(e);
            })
            db.collection('link').doc(`${ele.id}`)
            .update({
                like : liker
            })
        }
    })

})
}



let check = (idCheck,element)=>{
    db.collection('link')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        rawData.forEach(ele =>{
        ele.like.forEach((e)=>{
                if(e == dataLog.username){
                    if(ele.id == idCheck){
                        element.style.color = 'red'
                    }
                }
        })                     
        })
    })
}

let commentPlus = (vId) =>{
    db.collection('link')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        
    rawData.forEach((ele)=>{
        if(ele.id == vId){
            let commenter = [];
            ele.comment.forEach((e)=>commenter.push(e))
            let message = prompt("Write Your Comment","");
            commenter.push(`${dataLog.username}:${message}`)
            db.collection('link').doc(`${ele.id}`)
            .update({
                    comment : commenter
            })
        }
    })
})
}

const clicker = document.querySelector("#click");
const userNameMsg = document.querySelector(".user-msg")
setInterval(()=>{
    window.scrollBy({top:window.innerHeight,behavior:"smooth"});
},20000)



let showComment = (vId) =>{
    db.collection('link')
    .get()
    .then((data)=>{
        let rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        let nameDisplay=[];
        rawData.forEach((ele)=>{
            if(ele.id == vId){
                ele.comment.forEach((e)=>{
                    nameDisplay.push(e.split(":"))
                })
            }
        })
        nameDisplay = nameDisplay.flat();
        userNameMsg.innerHTML = `<button class="close-msg">X</button>`;
        nameDisplay.forEach((element,index)=>{
            if(index%2 == 0){
                userNameMsg.innerHTML += `<p class="user-msg-name">${element}</p>`
            } else {
                userNameMsg.innerHTML += `<p class="user-msg-text">${element}</p>`
            }
            
        })
    })
}

