const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// DATA AWAL

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

// ROOT

app.get("/", (req, res) => {
  res.json({
    nama: "Dzikri Cahayadi Alamsyah",
    nim: "2428240126",
    topik: 15,
    kategori: "Musik",
    resource: "Lagu",
    endpoints: [
      "GET /songs",
      "GET /songs/:id",
      "GET /songs?artis=Senandung",
      "POST /songs",
      "PUT /songs/:id",
      "DELETE /songs/:id"
    ]
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

app.get("/songs/:id", (req, res) => {
  const id = Number(req.params.id);

  const song = songs.find((song) => song.id === id);

  if (!song) {
    return res.status(404).json({
      message: "Lagu tidak ditemukan"
    });
  }

  res.json({
    data: song
  });
});

app.post("/songs", (req, res) => {
  const {
    judul,
    artis,
    album,
    tahunRilis,
    durasiDetik
  } = req.body;

  // Validasi field wajib
  if (!judul || !artis || tahunRilis === undefined) {
    return res.status(400).json({
      message: "judul, artis, dan tahunRilis wajib diisi"
    });
  }

  // Validasi tipe judul dan artis
  if (typeof judul !== "string" || typeof artis !== "string") {
    return res.status(400).json({
      message: "judul dan artis harus berupa teks"
    });
  }

  // Validasi tahunRilis
  if (typeof tahunRilis !== "number") {
    return res.status(400).json({
      message: "tahunRilis harus berupa angka"
    });
  }

  // Validasi album jika diisi
  if (album !== undefined && typeof album !== "string") {
    return res.status(400).json({
      message: "album harus berupa teks"
    });
  }

  // Validasi durasiDetik jika diisi
  if (
    durasiDetik !== undefined &&
    typeof durasiDetik !== "number"
  ) {
    return res.status(400).json({
      message: "durasiDetik harus berupa angka"
    });
  }

  // Membuat ID baru
  const newSong = {
    id: songs.length > 0
      ? songs[songs.length - 1].id + 1
      : 1,
    judul: judul,
    artis: artis,
    album: album,
    tahunRilis: tahunRilis,
    durasiDetik: durasiDetik
  };

  // Menambahkan data
  songs.push(newSong);

  // Response 201
  res.status(201).json({
    message: "Lagu berhasil ditambahkan",
    data: newSong
  });
});

app.put("/songs/:id", (req, res) => {
  const id = Number(req.params.id);

  const song = songs.find((song) => song.id === id);

  // Jika ID tidak ditemukan
  if (!song) {
    return res.status(404).json({
      message: "Lagu tidak ditemukan"
    });
  }

  const {
    judul,
    artis,
    album,
    tahunRilis,
    durasiDetik
  } = req.body;

  // Validasi field wajib
  if (!judul || !artis || tahunRilis === undefined) {
    return res.status(400).json({
      message: "judul, artis, dan tahunRilis wajib diisi"
    });
  }

  // Validasi judul dan artis
  if (typeof judul !== "string" || typeof artis !== "string") {
    return res.status(400).json({
      message: "judul dan artis harus berupa teks"
    });
  }

  // Validasi tahunRilis
  if (typeof tahunRilis !== "number") {
    return res.status(400).json({
      message: "tahunRilis harus berupa angka"
    });
  }

  // Validasi album
  if (album !== undefined && typeof album !== "string") {
    return res.status(400).json({
      message: "album harus berupa teks"
    });
  }

  // Validasi durasiDetik
  if (
    durasiDetik !== undefined &&
    typeof durasiDetik !== "number"
  ) {
    return res.status(400).json({
      message: "durasiDetik harus berupa angka"
    });
  }

  // Update data
  song.judul = judul;
  song.artis = artis;
  song.album = album;
  song.tahunRilis = tahunRilis;
  song.durasiDetik = durasiDetik;

  // Response
  res.json({
    message: "Lagu berhasil diperbarui",
    data: song
  });
});

app.delete("/songs/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = songs.findIndex((song) => song.id === id);

  // Jika ID tidak ditemukan
  if (index === -1) {
    return res.status(404).json({
      message: "Lagu tidak ditemukan",
      data: null
    });
  }

  // Menghapus data
  songs.splice(index, 1);

  // Response berhasil
  res.status(200).json({
    message: "Lagu berhasil dihapus",
    data: null
  });
});

// SERVER

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});