//changeVido function

var videoIndex = 0;
var videos = [
    "assets/video/History/video1.mp4",
    "assets/video/History/video2.mp4",
    "assets/video/History/video3.mp4",
    "assets/video/History/video4.mp4",
    "assets/video/History/video5.mp4",
    "assets/video/History/video6.mp4"
];

var titles = [
    "Malaysia's Bujang Valley: Southeast Asia's oldest civilisation", 
    "Malacca Sultanate Palace Museum", 
    "St. Paul's Hill & A Famosa & Stadthuys",
    "Kuala Lumpur Railway Station",
    "National Mosque",
    "Petronas Towers"
];

function changeVideo(direction) {
    videoIndex += direction;
    if (videoIndex < 0) {
        videoIndex = videos.length - 1;
    } else if (videoIndex >= videos.length) {
        videoIndex = 0;
    }
    var videoPlayer = document.getElementById("videoPlayer");
    var videoTitle = document.getElementById("videoTitle");

    videoPlayer.src = videos[videoIndex];
    videoTitle.textContent = titles[videoIndex];

    videoPlayer.play();
}

//backToTop function
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let backToTop = document.getElementById("backToTop");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
}

document.getElementById("backToTop").addEventListener("click", function(event){
    event.preventDefault();
    document.documentElement.scrollTop = 0;
});

//getWeather function
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather('Kedah,MY', 'weather-bujang'); 
    fetchWeather('Malacca,MY', 'weather-malacca'); 
    fetchWeather('Malacca,MY', 'weather-stpauls-afamosa'); 
    fetchWeather('Malacca,MY', 'weather-stadthuys');
    fetchWeather('Kuala Lumpur,MY', 'weather-klrailway');
    fetchWeather('Kuala Lumpur,MY', 'weather-mosque-towers'); 
});

function fetchWeather(city, elementId) {
    let apiKey = '34484595200f23f11404118a9e976ddb'; 
    let link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(link)
        .then(res => res.json())
        .then(json => {
            if (json.cod === 200) {
                let temperature = json.main.temp;
                let weatherInfo = `<p>Temperature: ${temperature} °C</p>`;
                document.getElementById(elementId).innerHTML = weatherInfo;
            } else {
                console.error('City not found or API error:', json.message);
                document.getElementById(elementId).innerHTML = '<p>Weather data not available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById(elementId).innerHTML = '<p>Error fetching weather data.</p>';
        });
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