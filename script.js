// script.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed in:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorMessage);
        });
}

async function fetchAnimeData(query) {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await response.json();
    return data.data;
}

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.querySelector('#search-input');
    const searchButton = document.querySelector('#search-button');
    const animeGrid = document.querySelector('.anime-grid');

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        const animeData = await fetchAnimeData(query);

        animeGrid.innerHTML = '';

        animeData.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.classList.add('anime-card');

            const img = document.createElement('img');
            img.src = anime.images.jpg.image_url;
            img.alt = anime.title;

            const title = document.createElement('h3');
            title.textContent = anime.title;

            const description = document.createElement('p');
            description.textContent = anime.synopsis;

            const watchButton = document.createElement('button');
            watchButton.textContent = 'Watch Now';
            watchButton.addEventListener('click', () => {
                alert('Watching anime...');
            });

            animeCard.appendChild(img);
            animeCard.appendChild(title);
            animeCard.appendChild(description);
            animeCard.appendChild(watchButton);

            animeGrid.appendChild(animeCard);
        });
    });
});