/* ========================================
   MOBILE MENU
======================================== */

const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


/* Close mobile menu
   after clicking a link
*/

const navLinks =
    document.querySelectorAll("nav a");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});



/* ========================================
   DARK / LIGHT MODE
======================================== */

const themeToggle =
    document.getElementById("theme-toggle");


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");


    if (
        document.body.classList.contains("light")
    ) {

        themeToggle.textContent = "🌙";

    } else {

        themeToggle.textContent = "☀";

    }

});



/* ========================================
   TYPING EFFECT
======================================== */

const typingText =
    document.getElementById("typing-text");


const roles = [

    "IT Engineer & Developer",

    "Python Developer",

    "Web Developer",

    "AI Enthusiast"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;

        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (
                roleIndex >= roles.length
            ) {

                roleIndex = 0;

            }

        }

    }


    const speed =
        deleting ? 50 : 100;


    setTimeout(
        typeEffect,
        speed
    );

}


typeEffect();



/* ========================================
   SKILL BAR ANIMATION
======================================== */

const skillProgress =
    document.querySelectorAll(
        ".skill-progress"
    );


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const width =
                        entry.target.dataset.width;

                    entry.target.style.width =
                        width;

                }

            });

        },
        {
            threshold: 0.5
        }
    );


skillProgress.forEach(bar => {

    skillObserver.observe(bar);

});



/* ========================================
   CONTACT FORM
======================================== */

const contactForm =
    document.getElementById(
        "contact-form"
    );


const formStatus =
    document.getElementById(
        "form-status"
    );


contactForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const formData = {

            name:
                document.getElementById(
                    "name"
                ).value,

            email:
                document.getElementById(
                    "email"
                ).value,

            message:
                document.getElementById(
                    "message"
                ).value

        };


        formStatus.textContent =
            "Sending...";


        try {

            const response =
                await fetch(
                    "http://127.0.0.1:5000/api/contact",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                formData
                            )

                    }
                );


            const result =
                await response.json();


            if (response.ok) {

                formStatus.textContent =
                    result.message;

                contactForm.reset();

            } else {

                formStatus.textContent =
                    result.error ||
                    "Something went wrong.";

            }


        } catch (error) {

            formStatus.textContent =
                "Backend is not running.";

        }

    }
);