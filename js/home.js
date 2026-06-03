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


const reviewsContainer =
document.getElementById("reviewsContainer");

const searchInput =
document.getElementById("searchInput");

const artistFilter =
document.getElementById("artistFilter");

const genreFilter =
document.getElementById("genreFilter");

const reviewerFilter =
document.getElementById("reviewerFilter");

const ratingFilter =
document.getElementById("ratingFilter");

let allReviews = [];

async function loadReviews(){

    const snapshot =
    await getDocs(
        collection(db,"reviews")
    );

    allReviews = [];

    snapshot.forEach(doc=>{

        allReviews.push({
            id:doc.id,
            ...doc.data()
        });

    });

    updateStats();

    populateFilters();

    renderReviews(allReviews);

}

function updateStats(){

    document.getElementById(
        "totalReviews"
    ).textContent =
    allReviews.length;

    const users =
    new Set(
        allReviews.map(
            r=>r.reviewer
        )
    );

    document.getElementById(
        "totalUsers"
    ).textContent =
    users.size;

    const albums =
    new Set(
        allReviews.map(
            r=>r.album
        )
    );

    document.getElementById(
        "totalAlbums"
    ).textContent =
    albums.size;

}

function populateFilters(){

    const artists =
    [...new Set(
        allReviews.map(
            r=>r.artist
        )
    )];

    const genres =
    [...new Set(
        allReviews.map(
            r=>r.genre
        )
    )];

    const reviewers =
    [...new Set(
        allReviews.map(
            r=>r.reviewer
        )
    )];

    artists.forEach(artist=>{

        const option =
        document.createElement("option");

        option.value = artist;
        option.textContent = artist;

        artistFilter.appendChild(option);

    });

    genres.forEach(genre=>{

        const option =
        document.createElement("option");

        option.value = genre;
        option.textContent = genre;

        genreFilter.appendChild(option);

    });

    reviewers.forEach(reviewer=>{

        const option =
        document.createElement("option");

        option.value = reviewer;
        option.textContent = reviewer;

        reviewerFilter.appendChild(option);

    });

}

function renderReviews(reviews){

    reviewsContainer.innerHTML = "";

    if(reviews.length===0){

        reviewsContainer.innerHTML =
        `
        <h2>No reviews found.</h2>
        `;

        return;
    }

    reviews.forEach(review=>{

        const card =
        document.createElement("div");

        card.className =
        "review-card";

        card.innerHTML = `

        <div class="review-header">

            <div>

                <a href="album.html?album=${encodeURIComponent(review.album)}" class="album-title">

                    ${review.album}

                </a>

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

            <a
                href="profile.html?user=${encodeURIComponent(review.reviewer)}"
                class="profile-link">

                ${review.reviewer}

            </a>

            <span class="genre-tag">

                ${review.genre}

            </span>

        </div>

        `;

        reviewsContainer.appendChild(card);

    });

}

function applyFilters(){

    let filtered =
    [...allReviews];

    const search =
    searchInput.value
    .toLowerCase();

    const artist =
    artistFilter.value;

    const genre =
    genreFilter.value;

    const reviewer =
    reviewerFilter.value;

    const rating =
    ratingFilter.value;

    if(search){

        filtered =
        filtered.filter(r=>

            r.album
            .toLowerCase()
            .includes(search)

        );

    }

    if(artist){

        filtered =
        filtered.filter(
            r=>r.artist===artist
        );

    }

    if(genre){

        filtered =
        filtered.filter(
            r=>r.genre===genre
        );

    }

    if(reviewer){

        filtered =
        filtered.filter(
            r=>r.reviewer===reviewer
        );

    }

    if(rating){

        const min =
        Number(rating);

        if(min===90){

            filtered =
            filtered.filter(
                r=>r.rating>=90
            );

        }

        else if(min===80){

            filtered =
            filtered.filter(
                r=>r.rating>=80 &&
                r.rating<90
            );

        }

        else if(min===70){

            filtered =
            filtered.filter(
                r=>r.rating>=70 &&
                r.rating<80
            );

        }

        else if(min===60){

            filtered =
            filtered.filter(
                r=>r.rating>=60 &&
                r.rating<70
            );

        }

        else{

            filtered =
            filtered.filter(
                r=>r.rating<60
            );

        }

    }

    renderReviews(filtered);

}

searchInput.addEventListener(
    "input",
    applyFilters
);

artistFilter.addEventListener(
    "change",
    applyFilters
);

genreFilter.addEventListener(
    "change",
    applyFilters
);

reviewerFilter.addEventListener(
    "change",
    applyFilters
);

ratingFilter.addEventListener(
    "change",
    applyFilters
);

loadReviews();

const profileBtn =
document.getElementById(
    "profileLink"
);

if(profileBtn){

    profileBtn.addEventListener(
        "click",
        (e)=>{

            e.preventDefault();

            window.location.href =

            `profile.html?user=${encodeURIComponent(
                currentUser
            )}`;

        }
    );
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