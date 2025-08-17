const fs = require("fs");
if (fs.existsSync("dist/index.html")) {
  fs.copyFileSync("dist/index.html", "dist/404.html");
  console.log("Created 404.html for SPA routing.");
}
