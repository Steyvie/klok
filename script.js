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
    const username = "Steyvie";
    const repoName = "klok";
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}/contents/agenda.txt`;

    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const content = atob(data.content); // Decode base64
      document.getElementById("agenda").textContent = content;
    } else {
      document.getElementById("agenda").textContent =
        "Kon agenda niet laden via API";
    }
  } catch (error) {
    document.getElementById("agenda").textContent =
      "API fout: " + error.message;
  }
}

// Update time immediately and then every minute
updateTime();
setInterval(updateTime, 60000);

// Fetch agenda immediately and then every second
fetchAgenda();
setInterval(fetchAgenda, 1000);
