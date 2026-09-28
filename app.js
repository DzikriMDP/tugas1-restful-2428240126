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

app.post("/songs", (req, res) => {
  const { judul, artis, album, tahunRilis, durasiDetik } = req.body;

  if (!judul || !artis || tahunRilis === undefined) {
    return res.status(400).json({
      message: "judul, artis, dan tahunRilis wajib diisi"
    });
  }

  if (typeof judul !== "string" || typeof artis !== "string") {
    return res.status(400).json({
      message: "judul dan artis harus berupa teks"
    });
  }

  if (typeof tahunRilis !== "number") {
    return res.status(400).json({
      message: "tahunRilis harus berupa angka"
    });
  }

  if (album !== undefined && typeof album !== "string") {
    return res.status(400).json({
      message: "album harus berupa teks"
    });
  }

  if (durasiDetik !== undefined && typeof durasiDetik !== "number") {
    return res.status(400).json({
      message: "durasiDetik harus berupa angka"
    });
  }

  const newSong = {
    id: songs.length > 0 ? songs[songs.length - 1].id + 1 : 1,
    judul: judul,
    artis: artis,
    album: album,
    tahunRilis: tahunRilis,
    durasiDetik: durasiDetik
  };

  songs.push(newSong);

  res.status(201).json({
    message: "Lagu berhasil ditambahkan",
    data: newSong
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});