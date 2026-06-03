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

const profileContainer =
document.getElementById(
    "profileContainer"
);

const params =
new URLSearchParams(
    window.location.search
);

let username =
params.get("user");

if(!username){

    username =
    localStorage.getItem(
        "username"
    );
}

async function loadProfile(){

    const snapshot =
    await getDocs(
        collection(db,"reviews")
    );

    const reviews =
    [];

    snapshot.forEach(doc=>{

        reviews.push(
            doc.data()
        );

    });

    const userReviews =
    reviews.filter(

    r =>

    r.reviewer
    ?.toLowerCase()

    ===

    username
    ?.toLowerCase()

);

    if(userReviews.length===0){

        profileContainer.innerHTML =

        `
        <h1>User not found</h1>
        `;

        return;

    }

    const average =

    (
        userReviews.reduce(
            (sum,r)=>sum+r.rating,
            0
        )

        /

        userReviews.length

    ).toFixed(1);

    profileContainer.innerHTML =

    `

    <div class="profile-header">

        <div class="profile-avatar">

            ${username[0].toUpperCase()}

        </div>

        <div>

            <h1>

                ${username}

            </h1>

            <p>

                Community Reviewer

            </p>

        </div>

    </div>

    <div class="stats">

        <div class="stat-card">

            <h3>

                ${userReviews.length}

            </h3>

            <p>

                Reviews

            </p>

        </div>

        <div class="stat-card">

            <h3>

                ${average}

            </h3>

            <p>

                Avg Rating

            </p>

        </div>

    </div>

    <h2 class="section-title">

        Albums Reviewed

    </h2>

    <div class="reviews-grid">

    ${
        userReviews.map(review=>`

        <div class="review-card">

            <div class="review-header">

                <div>

                    <div class="album-title">

                        ${review.album}

                    </div>

                    <div class="artist-name">

                        ${review.artist}

                    </div>

                </div>

                <div class="rating-badge">

                    ${review.rating}

                </div>

            </div>

            <p class="review-text">

                ${review.review}

            </p>

            <div class="review-footer">

                <span class="genre-tag">

                    ${review.genre}

                </span>

                <span>

                    Reviewer

                </span>

            </div>

        </div>

        `).join("")}

    </div>

    `;

}

loadProfile();

const profileLink =
document.getElementById(
    "profileLink"
);



profileLink.href =

`profile.html?user=${encodeURIComponent(
    currentUser
)}`;

const profileText =
document.getElementById(
    "profileText"
);

if(profileText){

    profileText.textContent =
    currentUser;
}

const logoutBtn =
document.getElementById(
    "logoutBtn"
);

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        ()=>{

            const confirmLogout =
            confirm(
                "Logout?"
            );

            if(confirmLogout){

                localStorage.clear();

                window.location.href =
                "setup.html";
            }

        }
    );
}
