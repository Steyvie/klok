// Function to update time and date
function updateTime() {
  const now = new Date();

  // Format time without seconds
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const timeString = now.toLocaleTimeString("nl-NL", timeOptions);
  document.getElementById("time").textContent = timeString;

  // Format date in Dutch
  const dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const dateString = now.toLocaleDateString("nl-NL", dateOptions);
  document.getElementById("date").textContent = dateString;
}

// Function to fetch agenda from GitHub
async function fetchAgenda() {
  try {
    // Replace these with your actual details
    const username = "Steyvie";
    const repoName = "klok";
    const branch = "main"; // or 'master' if you're using that

    // Alternative URL format that might work better
    const url = `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/agenda.txt?t=${Date.now()}`;

    // Debugging - log the URL we're trying to fetch
    console.log("Fetching agenda from:", url);

    const response = await fetch(url);

    if (response.ok) {
      const text = await response.text();
      document.getElementById("agenda").textContent = text;
    } else {
      console.error(
        "Failed to fetch agenda:",
        response.status,
        response.statusText,
      );
      document.getElementById("agenda").textContent =
        "Kon agenda niet laden (fout: " + response.status + ")";
    }
  } catch (error) {
    console.error("Error fetching agenda:", error);
    document.getElementById("agenda").textContent =
      "Fout bij laden agenda: " + error.message;
  }
}

// Update time immediately and then every minute
updateTime();
setInterval(updateTime, 60000);

// Fetch agenda immediately and then every second
fetchAgenda();
setInterval(fetchAgenda, 1000);
