const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let songs = [
  {
    id: 1,
    judul: "Langit Jingga",
    artis: "Senandung",
    album: "Sore di Kota",
    tahunRilis: 2024,
    durasiDetik: 214
  },
  {
    id: 2,
    judul: "Malam Berdua",
    artis: "Senandung",
    album: "Cerita Malam",
    tahunRilis: 2023,
    durasiDetik: 198
  },
  {
    id: 3,
    judul: "Pulang",
    artis: "Ruang Senja",
    album: "Perjalanan",
    tahunRilis: 2022,
    durasiDetik: 245
  }
];

app.get("/", (req, res) => {
  res.json({
    nama: "Dzikri Cahayadi Alamsyah",
    nim: "2428240126",
    topik: 15,
    kategori: "Musik",
    resource: "Lagu"
  });
});

app.get("/songs", (req, res) => {
  const artis = req.query.artis;

  if (artis) {
    const hasil = songs.filter(
      (song) => song.artis.toLowerCase() === artis.toLowerCase()
    );

    return res.json({
      data: hasil
    });
  }

  res.json({
    data: songs
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});