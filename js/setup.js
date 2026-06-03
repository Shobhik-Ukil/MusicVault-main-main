import { auth }
from "./firebase.js";

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form =
document.getElementById(
    "authForm"
);

const toggleBtn =
document.getElementById(
    "toggleMode"
);

const submitBtn =
document.getElementById(
    "submitBtn"
);

let isLogin =
false;

toggleBtn.addEventListener(
    "click",
    ()=>{

        isLogin =
        !isLogin;

        if(isLogin){

            submitBtn.textContent =
            "Login";

            toggleBtn.textContent =
            "Need account? Sign Up";

        }

        else{

            submitBtn.textContent =
            "Sign Up";

            toggleBtn.textContent =
            "Already have account? Login";
        }
    }
);

form.addEventListener(
    "submit",
    async(e)=>{

        e.preventDefault();

        const username =

        document
        .getElementById(
            "username"
        )
        .value
        .trim();

        const password =

        document
        .getElementById(
            "password"
        )
        .value;

        const fakeEmail =

        `${username}@musicvault.app`;

        try{

            if(isLogin){

                await
                signInWithEmailAndPassword(

                    auth,
                    fakeEmail,
                    password
                );

            }

            else{

                await
                createUserWithEmailAndPassword(

                    auth,
                    fakeEmail,
                    password
                );
            }

            localStorage.setItem(
                "username",
                username
            );

            window.location.href =
            "index.html";

        }

        catch(error){

            alert(
                error.message
            );
        }

    }
);