# Graph ITERA Campus Navigator

Graph ITERA Campus Navigator adalah aplikasi web statis untuk memvisualisasikan jalur antar gedung di Institut Teknologi Sumatera (ITERA) menggunakan konsep **undirected weighted graph**. Aplikasi ini menampilkan simpul gedung, jalur antar gedung, bobot jarak, serta pencarian jalur terpendek menggunakan algoritma **Dijkstra**.

Project ini dibuat sebagai bagian dari penerapan materi **Graph** pada mata kuliah Algoritma dan Struktur Data.

---

## Preview

Aplikasi menampilkan peta topologi kampus dengan gaya visual brutalist-modern. Setiap gedung direpresentasikan sebagai node, sedangkan jalur antar gedung direpresentasikan sebagai edge berbobot.

Fitur utama:

- Visualisasi graph gedung ITERA
- Node gedung dan jalur berbobot
- Algoritma Dijkstra untuk mencari jalur terpendek
- Highlight jalur terpendek
- Building Directory
- Map Legend
- System Settings
- Edge List
- Responsive untuk desktop dan mobile

---

## Tech Stack

Project ini dibuat menggunakan teknologi dasar web:

- HTML
- CSS
- JavaScript

Tanpa framework tambahan seperti React, Vue, Bootstrap, atau Tailwind.

---

## Struktur Folder

```text
visual-graph/
│
├── index.html
├── style.css
├── script.js
├── design.md
└── README.md
```

---

## Graph Concept

Graph yang digunakan adalah:

```text
G = (V, E)
```

Dengan keterangan:

- `V` adalah himpunan simpul atau node gedung.
- `E` adalah himpunan edge atau jalur antar gedung.
- Graph bersifat tidak berarah atau undirected.
- Graph bersifat berbobot atau weighted graph.
- Bobot edge menunjukkan estimasi jarak antar gedung dalam satuan meter.

---

## Daftar Node

Node yang digunakan dalam graph:

```text
1. Gedung A
2. Gedung B
3. Gedung C
4. Gedung D
5. Gedung E
6. Gedung F
7. GKU 1
8. GKU 2
```

---

## Daftar Edge dan Bobot

| Edge | From | To | Distance |
|---|---|---|---|
| E1 | Gedung A | Gedung B | 120 m |
| E2 | Gedung B | Gedung C | 150 m |
| E3 | Gedung C | Gedung D | 130 m |
| E4 | Gedung D | GKU 1 | 180 m |
| E5 | GKU 1 | GKU 2 | 260 m |
| E6 | GKU 2 | Gedung F | 170 m |
| E7 | Gedung F | Gedung E | 280 m |
| E8 | GKU 2 | Gedung E | 300 m |
| E9 | Gedung D | GKU 2 | 240 m |
| E10 | Gedung F | GKU 1 | 330 m |

---

## Fitur Aplikasi

### 1. Route Planner

Fitur utama untuk mencari jalur terpendek antar gedung.

Pengguna dapat:

- Memilih gedung asal
- Memilih gedung tujuan
- Menekan tombol `Find Shortest Path`
- Melihat hasil jalur terpendek
- Melihat total jarak
- Melihat jalur yang di-highlight pada peta

---

### 2. Building Directory

Menampilkan daftar gedung yang digunakan sebagai node graph.

Informasi yang ditampilkan:

- Nama gedung
- Jenis gedung
- Degree atau jumlah jalur yang terhubung
- Daftar tetangga dan jaraknya

---

### 3. Map Legend

Menjelaskan simbol-simbol yang digunakan pada peta.

Contoh simbol:

- Regular Building
- GKU Building
- Available Route
- Shortest Path
- Distance Badge
- Edge List

---

### 4. System Settings

Berisi pengaturan tampilan aplikasi.

Pengaturan yang tersedia:

- Theme mode
- Toggle distance badges
- Toggle green fields
- Toggle edge list
- Warna highlight jalur terpendek
- Ketebalan jalur
- Reset settings

---

## Algoritma Dijkstra

Aplikasi menggunakan algoritma Dijkstra untuk mencari jalur dengan total bobot terkecil dari satu gedung ke gedung lain.

Contoh pengujian:

```text
Start Building:
Gedung A

Destination Building:
Gedung E
```

Expected shortest path:

```text
Gedung A → Gedung B → Gedung C → Gedung D → GKU 2 → Gedung E
```

Total distance:

```text
940 meters
```

Perhitungan:

```text
Gedung A → Gedung B = 120
Gedung B → Gedung C = 150
Gedung C → Gedung D = 130
Gedung D → GKU 2 = 240
GKU 2 → Gedung E = 300

Total = 120 + 150 + 130 + 240 + 300
Total = 940 meters
```

---

## Cara Menjalankan Project

### 1. Clone repository

```bash
git clone https://github.com/pangestuanton/visual-graph.git
```

### 2. Masuk ke folder project

```bash
cd visual-graph
```

### 3. Jalankan menggunakan local server

Jika menggunakan `http-server`:

```bash
npx -y http-server . -p 8080 -o
```

Lalu buka:

```text
http://127.0.0.1:8080
```

Atau buka langsung file `index.html` di browser.

---

## Cara Push Update ke GitHub

Jika ada perubahan pada file project:

```bash
git add .
git commit -m "Update Graph ITERA Campus Navigator"
git push origin main
```

---

## Responsive Design

Aplikasi dirancang agar dapat digunakan pada beberapa ukuran layar:

- Desktop PC
- Laptop
- Tablet
- Mobile phone

Pada layar kecil, sidebar akan berubah menjadi menu hamburger agar tampilan tetap mudah digunakan.

---

## File Description

### `index.html`

Berisi struktur utama aplikasi, seperti:

- Header
- Sidebar navigation
- Route planner
- Building directory
- Map legend
- System settings
- Campus topology canvas
- Edge list table

### `style.css`

Berisi seluruh styling aplikasi, termasuk:

- Brutalist visual style
- Sidebar layout
- Map canvas
- Node style
- Edge table
- Responsive layout
- Theme dan settings style

### `script.js`

Berisi logika aplikasi, seperti:

- Data node
- Data edge
- Adjacency list
- Algoritma Dijkstra
- Render SVG edge
- Render node
- Render distance badge
- Building directory
- Map legend
- System settings
- Responsive behavior

### `design.md`

Berisi spesifikasi desain dan aturan implementasi berdasarkan desain Stitch MCP.

---

## Design Reference

Project ini mengikuti desain Stitch MCP:

```text
Design Name:
Graph ITERA Campus Navigator

MCP Resource Path:
projects/8971386065496766002
```

---

## Validation Checklist

Sebelum project dianggap selesai, pastikan:

```text
[ ] Semua node tampil pada peta
[ ] Semua edge tampil dengan bobot jarak
[ ] Dropdown start dan destination berfungsi
[ ] Tombol Find Shortest Path berfungsi
[ ] Dijkstra menghasilkan jalur terpendek yang benar
[ ] Gedung A ke Gedung E menghasilkan total 940 meter
[ ] Highlight jalur terpendek tampil
[ ] Building Directory tampil
[ ] Map Legend tampil
[ ] System Settings tampil
[ ] Edge List tampil
[ ] Tampilan responsive pada desktop dan mobile
```

---

## Repository

```text
https://github.com/pangestuanton/visual-graph
```

---

## Author

Created by Pangestu Anton.

---

## License

This project is created for educational purposes.
