// Function to update time and date
function updateTime() {
  const now = new Date();

  // Format time (HH:MM)
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  document.getElementById("time").textContent = `${hours}:${minutes}`;

  // Format Dutch date (e.g., "Vrijdag 6 juni 2025")
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const dutchDate = now.toLocaleDateString("nl-NL", options);
  document.getElementById("date").textContent = dutchDate;
}

// Function to fetch text from repository
async function fetchRepoText() {
  try {
    // Replace with your actual repository file URL
    const response = await fetch(
      "https://raw.githubusercontent.com/Steyvie/klok/refs/heads/main/agenda.txt",
    );
    if (response.ok) {
      const text = await response.text();
      document.getElementById("repo-text").textContent = text;
    } else {
      document.getElementById("repo-text").textContent =
        "Kon het tekstbestand niet laden.";
    }
  } catch (error) {
    console.error("Error fetching text:", error);
    document.getElementById("repo-text").textContent =
      "Fout bij het ophalen van tekst.";
  }
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);

// Fetch repo text immediately and then every minute
fetchRepoText();
setInterval(fetchRepoText, 60000);
