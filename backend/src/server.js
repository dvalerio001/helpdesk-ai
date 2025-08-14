import "dotenv/config"; // loads .env before importing anything that reads process.env
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});