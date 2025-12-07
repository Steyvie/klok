function updateClock() {
    const now = new Date();
    
    // 1. Update Time (HH:MM)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}`;

    // 2. Update Date (Dutch Format)
    // We construct this manually to ensure exact capitalization: "Zondag 5 December 2025"
    const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    
    const dayName = days[now.getDay()];
    const dayNum = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();

    const dateString = `${dayName} ${dayNum} ${monthName} ${year}`;
    document.getElementById('date').innerText = dateString;
}

// 3. Remote Message System
let currentMessage = "";

async function fetchMessage() {
    try {
        // We add ?t=... to prevent the browser from using an old cached version
        const response = await fetch('message.txt?t=' + new Date().getTime());
        if (response.ok) {
            const text = await response.text();
            
            // Only update the DOM if the message has actually changed
            if (text.trim() !== currentMessage) {
                currentMessage = text.trim();
                const msgElement = document.getElementById('message');
                
                // Fade out, change text, fade in
                msgElement.style.opacity = 0;
                setTimeout(() => {
                    msgElement.innerText = currentMessage;
                    msgElement.style.opacity = 1;
                }, 500);
            }
        }
    } catch (error) {
        console.error("Could not fetch message:", error);
    }
}

// Start everything
updateClock();
setInterval(updateClock, 1000); // Update time every second
fetchMessage(); // Fetch immediately on load
setInterval(fetchMessage, 30000); // Check for new message every 30 seconds
