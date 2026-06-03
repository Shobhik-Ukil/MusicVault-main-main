const currentUser =
localStorage.getItem(
    "username"
);

if(!currentUser){

    window.location.href =
    "setup.html";
}

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("reviewForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const album = document.getElementById("album").value;
    const artist = document.getElementById("artist").value;
    const genre = document.getElementById("genre").value;
    const rating = Number(document.getElementById("rating").value);
    const reviewer = localStorage.getItem("username");
    const review = document.getElementById("review").value;

    try {

        await addDoc(
            collection(db, "reviews"),
            {
                album,
                artist,
                genre,
                rating,
                reviewer,
                review,
                createdAt: serverTimestamp()
            }
        );

        showToast("Review submitted!");

        form.reset();

    } catch (err) {

        console.error(err);

        alert("Error submitting review");

    }

});

function showToast(message){

    const toast =
    document.createElement(
        "div"
    );

    toast.className =
    "toast";

    toast.innerHTML =

    `
    <i class="fa-solid fa-circle-check"></i>

    ${message}
    `;

    document.body
    .appendChild(toast);

    setTimeout(()=>{

        toast.classList.add(
            "show"
        );

    },100);

    setTimeout(()=>{

        toast.classList.remove(
            "show"
        );

        setTimeout(()=>{

            toast.remove();

        },400);

    },2500);
}


const profileText =
document.getElementById(
    "profileText"
);

if(profileText){

    profileText.textContent =
    currentUser;
}

import { signOut }
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { auth }
from "./firebase.js";

const logoutBtn =
document.getElementById(
    "logoutBtn"
);

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        async()=>{

            const confirmLogout =
            confirm(
                "Logout?"
            );

            if(confirmLogout){

                await signOut(
                    auth
                );

                localStorage.clear();

                window.location.href =
                "setup.html";
            }

        }
    );
}