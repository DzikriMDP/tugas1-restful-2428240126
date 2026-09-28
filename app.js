const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    nama: "Dzikri Cahayadi Alamsyah",
    nim: "2428240126",
    topik: 15,
    kategori: "Musik",
    resource: "Lagu"
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});