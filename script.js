// Tenor API Key (replace with your own API key)
const TENOR_API_KEY = "AIzaSyB2dXadXR_aHSdOhsqYYWqi0TWEZb9RkjY";

// Function to fetch a joke from the JokeAPI
async function fetchJoke(mood, situation) {
  const jokeText = document.getElementById("joke-text");

  // Map mood to JokeAPI categories
  const categoryMap = {
    happy: "Any",
    sad: "Miscellaneous",
    angry: "Pun",
    silly: "Any",
    excited: "Dark",
  };

  // Get the category based on the selected mood
  const category = categoryMap[mood] || "Any";

  // Construct the API URL
  const url = `https://v2.jokeapi.dev/joke/${category}?type=single`;

  try {
    // Fetch joke from the API
    const response = await fetch(url);
    const data = await response.json();

    // Check if the joke is available
    if (data.joke) {
      // Add situation to the joke if provided
      if (situation) {
        jokeText.textContent = `${data.joke} (${situation})`;
      } else {
        jokeText.textContent = data.joke;
      }
    } else {
      jokeText.textContent = "No joke found. Try again!";
    }
  } catch (error) {
    // Handle errors (e.g., network issues)
    jokeText.textContent = "Failed to fetch a joke. Please check your connection.";
    console.error(error);
  }
}

// Function to fetch a random meme from Tenor
async function fetchRandomMeme() {
  const memeContainer = document.getElementById("meme-container");

  // Random search terms for variety
  const searchTerms = ["funny meme", "random meme", "hilarious meme", "reaction meme"];
  const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

  // Construct the Tenor API URL to fetch 1 random meme
  const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
    randomTerm
  )}&key=${TENOR_API_KEY}&limit=3`;

  try {
    // Fetch meme from the API
    const response = await fetch(url);
    const data = await response.json();

    // Clear previous meme
    memeContainer.innerHTML = "";

    // Check if a meme is available
    if (data.results.length > 0) {
      const memeUrl = data.results[0].media_formats.gif.url;
      memeContainer.innerHTML = `<img src="${memeUrl}" alt="${randomTerm}" class="meme-image">`;
    } else {
      memeContainer.innerHTML = "<p>No meme found. Try again!</p>";
    }
  } catch (error) {
    // Handle errors (e.g., network issues)
    memeContainer.innerHTML = "<p>Failed to fetch a meme. Please check your connection.</p>";
    console.error(error);
  }
}

// Event listener for the "Generate Joke" button
document.getElementById("generate-joke").addEventListener("click", () => {
  // Get the selected mood and situation
  const mood = document.getElementById("mood").value;
  const situation = document.getElementById("situation").value;

  // Fetch and display a joke
  fetchJoke(mood, situation);

  // Fetch and display a random meme
  fetchRandomMeme();
});
