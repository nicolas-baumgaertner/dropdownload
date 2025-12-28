const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);
app.use(express.static(path.join(__dirname, "public")));

app.get("/download", (req, res) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl,
    userAgent: req.headers["user-agent"] || "unknown"
  };

  const line = JSON.stringify(logEntry);

  console.log(line); // 👈 DAS ist der Key für Railway Logs
  fs.appendFileSync("download.log", line + "\n");

  res.download(
    path.join(__dirname, "pdf", "beispiel.pdf"),
    "beispiel.pdf"
  );
});
