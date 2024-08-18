document.addEventListener('DOMContentLoaded', () => {
    // Logout functionality
    if (window.location.pathname.endsWith('logout.html')) {
        // Redirect to home after 3 seconds
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 3000);
    }

    // Main logout handler
    const handleLogout = () => {
        if (window.location.pathname.endsWith('logout.html')) {
            clearStorage();
            redirectToHome();
        }
    };

    // Debounce function to limit execution rate
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    // Throttle function to control high-frequency events
    const throttle = (func, limit) => {
        let lastCall = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall >= limit) {
                lastCall = now;
                func(...args);
            }
        };
    };

    // Initialize fade-in effect for activities
    const initializeActivities = () => {
        const activities = document.querySelectorAll('.activity');

        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            activities.forEach(activity => {
                activity.classList.add('activity-hidden');
                observer.observe(activity);
            });
        } else {
            const handleScroll = throttle(() => {
                activities.forEach(activity => {
                    const rect = activity.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        activity.classList.add('fade-in');
                    }
                });
            }, 100);

            handleScroll();
            window.addEventListener('scroll', handleScroll);
        }
    };

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

    window.addEventListener('scroll', debounce(scrollFunction, 100));

    document.getElementById("backToTop").addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize functions
    handleLogout();
    initializeActivities();
});

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
