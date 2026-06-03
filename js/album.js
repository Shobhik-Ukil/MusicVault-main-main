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
    getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const albumContainer =
document.getElementById(
    "albumContainer"
);

const params =
new URLSearchParams(
    window.location.search
);

const albumName =
params.get("album");


// Sidebar Profile Button

const profileLink =
document.getElementById(
    "profileLink"
);

if(profileLink){

    profileLink.href =

    `profile.html?user=${encodeURIComponent(
        currentUser
    )}`;
}

async function loadAlbum(){

    const snapshot =
    await getDocs(
        collection(db,"reviews")
    );

    const reviews = [];

    snapshot.forEach(doc=>{

        reviews.push({
            id:doc.id,
            ...doc.data()
        });

    });

    const albumReviews =
    reviews.filter(

        r=>r.album
        .toLowerCase()
        ===
        albumName
        .toLowerCase()

    );

    if(albumReviews.length===0){

        albumContainer.innerHTML =

        `
        <h1>
            Album not found
        </h1>
        `;

        return;
    }

    const firstReview =
    albumReviews[0];

    const average =

    (
        albumReviews.reduce(
            (sum,r)=>
            sum+r.rating,
            0
        )

        /

        albumReviews.length

    ).toFixed(1);

    albumContainer.innerHTML =

    `

    <div class="album-header">

        <div>

            <h1 class="album-page-title">

                ${firstReview.album}

            </h1>

            <p class="album-page-artist">

                ${firstReview.artist}

            </p>

        </div>

        <div class="album-score">

            ${average}

        </div>

    </div>

    <div class="stats">

        <div class="stat-card">

            <h3>

                ${albumReviews.length}

            </h3>

            <p>

                Reviews

            </p>

        </div>

        <div class="stat-card">

            <h3>

                ${firstReview.genre}

            </h3>

            <p>

                Genre

            </p>

        </div>

    </div>

    <h2 class="section-title">

        Community Reviews

    </h2>

    <div class="reviews-grid">

    ${albumReviews.map(review => `

        <div class="review-card">

            <div class="review-header">

                <div>

                    <a
                    href="profile.html?user=${encodeURIComponent(review.reviewer)}"
                    class="profile-link">

                        ${review.reviewer}

                    </a>

                </div>

                <div class="rating-badge">

                    ${review.rating}

                </div>

            </div>

            <p class="review-text">

                ${review.review}

            </p>

        </div>

    `).join("")}

    </div>

    `;

}

loadAlbum();

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