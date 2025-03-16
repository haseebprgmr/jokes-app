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

// Event listener for the "Generate Joke" button
document.getElementById("generate-joke").addEventListener("click", () => {
  // Get the selected mood and situation
  const mood = document.getElementById("mood").value;
  const situation = document.getElementById("situation").value;

  // Fetch and display a joke
  fetchJoke(mood, situation);
});
