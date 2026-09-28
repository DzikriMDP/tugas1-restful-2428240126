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

let nextId = 4;

// ROOT
// GET /

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


// GET SEMUA LAGU
// GET /songs

app.get("/songs", (req, res) => {
  const artis = req.query.artis;

  if (artis) {
    const hasil = songs.filter(
      (song) => song.artis.toLowerCase() === artis.toLowerCase()
    );

    return res.json(hasil);
  }

  res.json(songs);
});

// GET SATU LAGU
// GET /songs/:id

app.get("/songs/:id", (req, res) => {
  const id = Number(req.params.id);

  const song = songs.find((song) => song.id === id);

  if (!song) {
    return res.status(404).json({
      status: "error",
      message: `Lagu dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  res.json(song);
});

// POST LAGU
// POST /songs
// Body:
// {
//   "judul": "Bintang Malam",
//   "artis": "Senandung",
//   "album": "Langit Malam",
//   "tahunRilis": 2025,
//   "durasiDetik": 220
// }

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
      status: "error",
      message: "judul, artis, dan tahunRilis wajib diisi",
      data: null
    });
  }

  // Validasi tipe data judul dan artis
  if (typeof judul !== "string" || typeof artis !== "string") {
    return res.status(400).json({
      status: "error",
      message: "judul dan artis harus berupa teks",
      data: null
    });
  }

  // Validasi tahunRilis
  if (typeof tahunRilis !== "number") {
    return res.status(400).json({
      status: "error",
      message: "tahunRilis harus berupa angka",
      data: null
    });
  }

  // Validasi album jika diisi
  if (album !== undefined && typeof album !== "string") {
    return res.status(400).json({
      status: "error",
      message: "album harus berupa teks",
      data: null
    });
  }

  // Validasi durasiDetik jika diisi
  if (
    durasiDetik !== undefined &&
    typeof durasiDetik !== "number"
  ) {
    return res.status(400).json({
      status: "error",
      message: "durasiDetik harus berupa angka",
      data: null
    });
  }

  // Membuat data lagu baru
  const newSong = {
    id: nextId++,
    judul: judul,
    artis: artis,
    album: album,
    tahunRilis: tahunRilis,
    durasiDetik: durasiDetik
  };

  songs.push(newSong);

  res.status(201).json({
    status: "success",
    message: "Lagu berhasil ditambahkan",
    data: newSong
  });
});

// PUT LAGU
// PUT /songs/:id
// Body:
// {
//   "judul": "Langit Jingga Updated",
//   "artis": "Senandung",
//   "album": "Sore di Kota",
//   "tahunRilis": 2025,
//   "durasiDetik": 220
// }

app.put("/songs/:id", (req, res) => {
  const id = Number(req.params.id);

  const song = songs.find((song) => song.id === id);

  // Validasi ID
  if (!song) {
    return res.status(404).json({
      status: "error",
      message: `Lagu dengan id ${id} tidak ditemukan`,
      data: null
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
      status: "error",
      message: "judul, artis, dan tahunRilis wajib diisi",
      data: null
    });
  }

  // Validasi judul dan artis
  if (typeof judul !== "string" || typeof artis !== "string") {
    return res.status(400).json({
      status: "error",
      message: "judul dan artis harus berupa teks",
      data: null
    });
  }

  // Validasi tahunRilis
  if (typeof tahunRilis !== "number") {
    return res.status(400).json({
      status: "error",
      message: "tahunRilis harus berupa angka",
      data: null
    });
  }

  // Validasi album
  if (album !== undefined && typeof album !== "string") {
    return res.status(400).json({
      status: "error",
      message: "album harus berupa teks",
      data: null
    });
  }

  // Validasi durasiDetik
  if (
    durasiDetik !== undefined &&
    typeof durasiDetik !== "number"
  ) {
    return res.status(400).json({
      status: "error",
      message: "durasiDetik harus berupa angka",
      data: null
    });
  }

  // Mengubah data lagu
  song.judul = judul;
  song.artis = artis;
  song.album = album;
  song.tahunRilis = tahunRilis;
  song.durasiDetik = durasiDetik;

  res.status(200).json({
    status: "success",
    message: "Lagu berhasil diperbarui",
    data: song
  });
});


// DELETE LAGU
// DELETE /songs/:id

app.delete("/songs/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = songs.findIndex((song) => song.id === id);

  // Jika ID tidak ditemukan
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Lagu dengan id ${id} tidak ditemukan`,
      data: null
    });
  }

  songs.splice(index, 1);

  res.status(200).json({
    status: "success",
    message: `Lagu dengan id ${id} berhasil dihapus`,
    data: null
  });
});

// CATCH-ALL 404

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
});

// SERVER

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});