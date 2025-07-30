const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// 🔧 CHANGE THIS to your next event's date and time in UTC
// Example: August 15, 2025 @ 3:00 PM EST = 19:00 UTC
const targetDate = new Date(Date.UTC(2025, 7, 15, 19, 0, 0)); // (months are 0-based)

// 📢 Tip: Use https://www.worldtimebuddy.com/ to convert your local time to UTC

app.get("/", (req, res) => {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    return res.send("The event has already started!");
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let response = "";

  if (days > 0) response += `${days}d `;
  if (hours > 0 || days > 0) response += `${hours}h `;
  response += `${minutes}m ${seconds}s`;

  res.send(response.trim());
});

app.listen(port, () => {
  console.log("Countdown API running...");
});
