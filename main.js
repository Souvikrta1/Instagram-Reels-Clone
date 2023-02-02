const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBUdoks0DRGjgbHXVTXCbbAQ0Qpr4uyUnA",
    authDomain: "reels-pro.firebaseapp.com",
    projectId: "reels-pro",
    storageBucket: "reels-pro.appspot.com",
    messagingSenderId: "100087925963",
    appId: "1:100087925963:web:a8e5829695f485f9fa9f4e"
})

let data = localStorage.getItem('data');
let dataLog = JSON.parse(data);

const db = firebaseApp.firestore();

window.onload = () =>{
    if(!dataLog){
        window.location.href = "login.html"
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
    })).then(()=>{
        setTimeout(()=>{
            window.location.href="index.html";
        },5000)
    })
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
                                    <button class="like"><i class="fa-solid fa-heart like"></i><p class="like-length${ele.id}">${ele.like.length}</p></button>
                                    <button class="comment"><i class="fa-regular fa-comment comment"></i></button>
                                    <button class="show-comment"><i class="fa-solid fa-message show-comment"></i></button>
                                    <button class="share-link"><i class="fa-solid fa-share share-link"></i></button>
                                    <video class="reels-play" src='${ele.url}'></video>
                                </li>`
                                
        })
        
        const likeBtn = document.querySelectorAll(".like");

        likeBtn.forEach((ele)=>{
            let idCheck = ele.parentElement.parentElement.getAttribute("id");
            check(idCheck,ele)
        })
        const reelsPlay = document.querySelectorAll(".reels-play");
        for(let i=0;i<reelsPlay.length;i++){
            let timer = setTimeout(()=>{
                reelsPlay[i].play();
                reelsPlay[i-1].pause();
            },(i)*15000)
        }
    })
}

const logOut = document.querySelector("#log-out")
logOut.addEventListener("click",()=>{
    localStorage.clear();
    window.location.href = "login.html"
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
        commentArea.style.display = 'none';
    } else if(e.target.classList.contains("share-link")){
        let vId = e.target.parentElement.parentElement.getAttribute("id");
        getLink(vId)
    }  else if(e.target.classList.contains("reels-play")){
        if(e.target.paused){
            e.target.play();
        } else {
            e.target.pause();
        }
    }
})


const clicker = document.querySelector("#click");
        const userNameMsg = document.querySelector(".user-msg")
        setInterval(()=>{
            window.scrollBy({top:window.innerHeight,behavior:"smooth"});
        },15000)



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
            const likeBtnn = document.querySelector(`.like-length${ele.id}`);
            console.log(likeBtnn);
            likeBtnn.innerHTML = liker.length;
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
            const likeBtnn = document.querySelector(`.like-length${ele.id}`);
            likeBtnn.innerHTML = liker.length;
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

let getLink = (vId) =>{
    db.collection('link')
    .get()
    .then((data)=>{
        rawData = (data.docs.map((item) =>{
            return {...item.data(),id:item.id}
        }))
        rawData.forEach((ele)=>{
            if(ele.id == vId){
                prompt("Copy The Link To Share",ele.url)
            }
        })
    })
}