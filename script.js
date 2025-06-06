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
    // Replace with your GitHub username and repository name
    const response = await fetch(
      "https://raw.githubusercontent.com/Steyvie/klok/refs/heads/main/agenda.txt" +
        new Date().getTime(),
    );

    if (response.ok) {
      const text = await response.text();
      document.getElementById("agenda").textContent = text;
    } else {
      document.getElementById("agenda").textContent = "Geen agenda gevonden";
    }
  } catch (error) {
    console.error("Error fetching agenda:", error);
    document.getElementById("agenda").textContent = "Fout bij laden agenda";
  }
}

// Update time immediately and then every minute
updateTime();
setInterval(updateTime, 60000);

// Fetch agenda immediately and then every second
fetchAgenda();
setInterval(fetchAgenda, 1000);
