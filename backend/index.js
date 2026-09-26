const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "backend running."
  });
});

app.listen(PORT, () => {
  console.log(`NIQAT backend running on http://localhost:${PORT}`);
});