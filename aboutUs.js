// Face Animation
function setupFaceAnimation(elementId, imageSrc, hoverImageSrc) {
    const face = document.getElementById(elementId);
    face.classList.add('face-animation');

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => reject(new Error(`Image failed to load: ${src}`));
            img.src = src;
        });
    }

    Promise.all([loadImage(imageSrc), loadImage(hoverImageSrc)]).then(() => {
        face.src = imageSrc;
        face.addEventListener("mouseover", function() {
            this.src = hoverImageSrc;
        });
        face.addEventListener("mouseout", function() {
            this.src = imageSrc;
        });
    }).catch(error => {
        console.error(error.message);
        face.src = 'path/to/placeholder-image.png'; // Use a placeholder image if loading fails
    });
}

setupFaceAnimation("jiaGuanFace", "assets/Picture/About US/jiaguanface.png", "assets/Picture/About US/jiaguanface2.png");
setupFaceAnimation("cheeHoeFace", "assets/Picture/About US/cheehoeface.png", "assets/Picture/About US/cheehoeface2.png");
setupFaceAnimation("weiNingFace", "assets/Picture/About US/weiningface.jpg", "assets/Picture/About US/weiningface2.jpg");
setupFaceAnimation("keanYangFace", "assets/Picture/About US/keanyangface.jpg", "assets/Picture/About US/keanyangface2.jpg");

// Back to Top Button Functionality
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let backToTop = document.getElementById("backToTop");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
}

 // Function to check if user is logged in
 function checkLoginStatus() {
    const username = localStorage.getItem('username');
    const loggedIn = username !== null; 

    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    if (loggedIn) {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'inline';
     } else {
        loginLink.style.display = 'inline';
        logoutLink.style.display = 'none';
    }
    }

// Run the check on page load
window.onload = checkLoginStatus;