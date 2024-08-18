// Function to check if user is logged in
function checkLoginStatus() {
    const username = localStorage.getItem('username');
    const loggedIn = username !== null;

    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    if (loggedIn) {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';
    } else {
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
    }
}

// Run the check on page load
window.onload = checkLoginStatus;
