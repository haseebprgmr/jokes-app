// Giphy API Key (replace with your own API key)
const GIPHY_API_KEY = "AIzaSyB2dXadXR_aHSdOhsqYYWqi0TWEZb9RkjY";

// Function to fetch a joke from the JokeAPI
async function fetchJoke(mood, situation) {
  const jokeText = document.getElementById("joke-text");

  // Map mood to JokeAPI categories
  const categoryMap = {
    happy: "Any",
    sad: "Miscellaneous",
    angry: "Pun",
    silly: "Programming",
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

// Function to fetch a meme from Giphy based on mood
async function fetchMeme(mood) {
  const memeContainer = document.getElementById("meme-container");

  // Map mood to Giphy search terms
  const moodMap = {
    happy: "happy meme",
    sad: "sad meme",
    angry: "angry meme",
    silly: "silly meme",
    excited: "excited meme",
  };

  // Get the search term based on the selected mood
  const searchTerm = moodMap[mood] || "funny meme";

  // Construct the Giphy API URL
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
    searchTerm
  )}&limit=1`;

  try {
    // Fetch meme from the API
    const response = await fetch(url);
    const data = await response.json();

    // Check if a meme is available
    if (data.data.length > 0) {
      const memeUrl = data.data[0].images.fixed_height.url;
      memeContainer.innerHTML = `<img src="${memeUrl}" alt="${searchTerm}" class="meme-image">`;
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

  // Fetch and display a meme
  fetchMeme(mood);
});
