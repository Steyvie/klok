// Configuration for custom text
let customText = "Have a wonderful day!";

function setCustomText(text) {
    customText = text;
    document.getElementById('custom-text').textContent = customText;
}

function updateTime() {
    const now = new Date();
    
    // Format time (HH:MM)
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;
    
    // Format Dutch date (vrijdag 6 juni 2025)
    const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };
    const dateStr = now.toLocaleDateString('nl-NL', options);
    document.getElementById('date').textContent = dateStr;
    
    // Update custom text
    document.getElementById('custom-text').textContent = customText;
}

// Update immediately and then every minute
updateTime();
setInterval(updateTime, 60000);
