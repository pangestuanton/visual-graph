# Design Specification
# Graph ITERA Campus Navigator

## 1. Project Overview

**Project Name:** Graph ITERA Campus Navigator  
**Project Type:** Static Web Application  
**Technology:** HTML, CSS, JavaScript  
**Design Source:** MCP Design  
**MCP Design Name:** Graph ITERA Campus Navigator  
**MCP Resource Path:** `projects/8971386065496766002`

Graph ITERA Campus Navigator adalah aplikasi visualisasi rute gedung kampus ITERA berbasis **undirected weighted graph**. Aplikasi ini menampilkan simpul gedung, jalur antar gedung, bobot jarak, serta fitur pencarian jalur terpendek menggunakan algoritma **Dijkstra**.

Aplikasi harus terlihat seperti **campus navigation web app** yang modern dan rapi, bukan tampilan mentah tugas coding.

---

## 2. Main Design Principle

Desain harus mengikuti MCP design yang sudah tersedia.

### Important Rule

**Do not redesign from scratch.**

Gunakan MCP design berikut sebagai **single source of truth**:

```text
Design Name:
Graph ITERA Campus Navigator

MCP Resource Path:
projects/8971386065496766002
```

Desain akhir harus mempertahankan:

- Layout utama
- Warna
- Spacing
- Typography
- Sidebar/control panel
- Area peta kampus
- Bentuk node/marker gedung
- Gaya jalan dan jalur
- Edge list table
- Visual hierarchy

Perubahan hanya boleh dilakukan jika diperlukan untuk membuat desain menjadi fungsional di HTML, CSS, dan JavaScript.

---

## 3. Design Goal

Tujuan utama desain adalah membuat visualisasi graph yang:

1. Mudah dipahami oleh mahasiswa.
2. Cocok untuk presentasi tugas struktur data.
3. Terlihat seperti aplikasi navigasi kampus.
4. Tidak terlihat seperti diagram graph biasa yang kaku.
5. Menampilkan node, edge, bobot, dan jalur terpendek secara jelas.
6. Responsif untuk layar desktop dan layar kecil.

---

## 4. Graph Concept

Aplikasi menggunakan konsep:

```text
G = (V, E)
```

Dengan:

- `V` = vertices / simpul gedung
- `E` = edges / jalur antar gedung
- Setiap edge memiliki bobot berupa estimasi jarak dalam meter
- Graph bersifat tidak berarah / undirected
- Graph bersifat berbobot / weighted graph

---

## 5. Graph Nodes

Daftar simpul gedung:

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

## 6. Graph Edges and Weights

Daftar jalur dan bobot:

| Edge | From | To | Distance |
|---|---|---|---|
| e1 | Gedung A | Gedung B | 120 m |
| e2 | Gedung B | Gedung C | 150 m |
| e3 | Gedung C | Gedung D | 130 m |
| e4 | Gedung D | GKU 1 | 180 m |
| e5 | GKU 1 | GKU 2 | 260 m |
| e6 | GKU 2 | Gedung F | 170 m |
| e7 | Gedung F | Gedung E | 280 m |
| e8 | GKU 2 | Gedung E | 300 m |
| e9 | Gedung D | GKU 2 | 240 m |
| e10 | Gedung F | GKU 1 | 330 m |

---

## 7. Critical Node Positioning

Gunakan posisi node dari MCP design. Jika posisi pada MCP design tidak terbaca dengan jelas, gunakan fallback positioning berikut.

### Node Placement Rule

- **GKU 2** harus berada di tengah perempatan jalan utama.
- **Gedung A** harus berada di atas GKU 2, agak ke kiri.
- **Gedung B** harus berada di atas GKU 2, agak ke kanan dari Gedung A.
- **Gedung C** berada di sisi kiri GKU 2.
- **Gedung D** berada di antara Gedung C dan GKU 2.
- **Gedung E** berada di sisi kanan GKU 2.
- **Gedung F** berada di bawah kanan GKU 2.
- **GKU 1** berada di bawah kiri GKU 2.

### Fallback CSS Position

```text
Gedung A  : left 44%, top 23%
Gedung B  : left 53%, top 23%
Gedung C  : left 38%, top 42%
Gedung D  : left 48%, top 43%
GKU 2     : left 58%, top 43%
GKU 1     : left 47%, top 65%
Gedung F  : left 65%, top 65%
Gedung E  : left 78%, top 42%
```

---

## 8. Layout Structure

Aplikasi menggunakan layout dashboard dua bagian:

```text
┌──────────────────────┬───────────────────────────────┐
│ Sidebar Control       │ Main Campus Map Area           │
│ Panel                 │                               │
│                       │ Graph Visualization            │
│                       │                               │
│                       │ Edge List Table                │
└──────────────────────┴───────────────────────────────┘
```

---

## 9. Sidebar / Control Panel

Sidebar berfungsi sebagai pusat kontrol aplikasi.

### Sidebar Components

Sidebar harus berisi:

1. App logo atau ikon sederhana.
2. App title:
   ```text
   Graph ITERA Campus Navigator
   ```
3. Short description:
   ```text
   Interactive weighted graph visualization for ITERA campus routes.
   ```
4. Dropdown:
   ```text
   Start Building
   ```
5. Dropdown:
   ```text
   Destination Building
   ```
6. Primary button:
   ```text
   Find Shortest Path
   ```
7. Secondary button:
   ```text
   Reset
   ```
8. Result card.
9. Legend.

### Result Card

Result card menampilkan:

- Jalur terpendek
- Total jarak
- Pesan jika asal dan tujuan sama
- Pesan jika jalur tidak ditemukan

Contoh hasil:

```text
Shortest Path:
Gedung A → Gedung B → Gedung C → Gedung D → GKU 2 → Gedung E

Total Distance:
940 meters
```

---

## 10. Main Campus Map Area

Area utama berisi peta kampus sederhana dengan visual modern.

### Map Requirements

Area peta harus memiliki:

1. Background krem lembut sebagai area kampus.
2. Area hijau lembut sebagai taman atau ruang terbuka.
3. Jalan utama dalam bentuk garis tebal dengan rounded corners.
4. Perempatan utama di tengah dengan GKU 2 sebagai pusat.
5. Node gedung sebagai marker modern.
6. SVG edge lines sebagai jalur graph.
7. Label bobot jarak pada setiap edge.
8. Highlight jalur terpendek.

---

## 11. Visual Style

Desain harus terlihat modern, bersih, dan presentation-ready.

### Style Direction

Gunakan karakter visual berikut:

- Clean dashboard
- Campus map aesthetic
- Rounded cards
- Soft shadow
- Smooth hover
- Subtle gradient
- Clear spacing
- Readable typography
- Soft but distinct color contrast

### Avoid

Hindari:

- Tampilan graph mentah seperti diagram praktikum.
- Node bulat polos tanpa styling.
- Warna terlalu mencolok.
- Garis edge yang menumpuk tanpa label jelas.
- Layout yang terlalu padat.
- Inline CSS dan inline JavaScript.

---

## 12. Color System

Gunakan warna dari MCP design. Jika tidak tersedia, gunakan fallback color system berikut.

### Background

```css
--color-page-bg: #f1f5f9;
--color-map-bg: #f7ead6;
--color-green-area: #ccefd8;
```

### Sidebar

```css
--color-sidebar-bg: #0f172a;
--color-sidebar-card: rgba(255, 255, 255, 0.08);
--color-sidebar-text: #ffffff;
--color-sidebar-muted: #cbd5e1;
```

### Node Colors

```css
--color-regular-building: #16a34a;
--color-gku-building: #f97316;
--color-special-building: #7c3aed;
```

### Route Colors

```css
--color-normal-route: #2563eb;
--color-shortest-path: #ef4444;
```

### UI Colors

```css
--color-card-bg: #ffffff;
--color-text-main: #0f172a;
--color-text-muted: #64748b;
--color-border: #e2e8f0;
```

---

## 13. Node Visual Design

Node harus mudah dibaca dan dibedakan.

### Node Categories

| Category | Nodes | Visual Style |
|---|---|---|
| Regular Building | Gedung A, B, C, D | Green marker |
| Special Building | Gedung E, F | Purple marker |
| GKU Building | GKU 1, GKU 2 | Orange marker |

### Node Requirements

Node harus:

1. Berbentuk marker atau circular card modern.
2. Memiliki label gedung yang jelas.
3. Memiliki shadow lembut.
4. Memiliki hover effect.
5. Memiliki active state saat termasuk jalur terpendek.
6. Tetap terbaca pada ukuran layar berbeda.

---

## 14. Edge and Route Design

Edge harus dirender menggunakan SVG.

### Normal Edge

- Warna biru
- Stroke sedang
- Tidak terlalu dominan
- Menghubungkan pusat node ke pusat node

### Shortest Path Edge

- Warna merah atau oranye terang
- Stroke lebih tebal
- Memiliki glow atau emphasis
- Harus langsung terlihat berbeda dari edge normal

### Edge Label

Label bobot harus:

1. Berbentuk badge kecil.
2. Background putih.
3. Memiliki border-radius.
4. Memiliki shadow halus.
5. Berada di sekitar tengah edge.
6. Tetap terbaca meskipun edge miring.

---

## 15. Edge List Table

Di bawah peta, tampilkan tabel modern.

### Table Title

```text
Edge List
```

### Columns

| Column | Description |
|---|---|
| Edge | Nomor sisi |
| From | Simpul asal |
| To | Simpul tujuan |
| Distance | Bobot jarak |

### Table Requirements

1. Data di-generate dari JavaScript graph data.
2. Tampilan mengikuti MCP design.
3. Header tabel jelas.
4. Row spacing nyaman.
5. Responsive pada layar kecil.

---

## 16. JavaScript Functionality

File `script.js` harus mengatur semua interaksi aplikasi.

### Required Functions

Aplikasi harus memiliki fungsi:

1. Store graph data.
2. Populate dropdown.
3. Build adjacency list.
4. Render SVG edges.
5. Render distance labels.
6. Run Dijkstra algorithm.
7. Reconstruct shortest path.
8. Highlight shortest path.
9. Highlight active nodes.
10. Reset visualization.
11. Show node neighbors on click.
12. Render edge list table.
13. Re-render edges on window resize.

---

## 17. Dijkstra Algorithm Requirement

Algoritma Dijkstra digunakan untuk mencari jalur terpendek berdasarkan bobot jarak.

### Test Case

```text
Start:
Gedung A

Destination:
Gedung E
```

### Expected Result

```text
Gedung A → Gedung B → Gedung C → Gedung D → GKU 2 → Gedung E
```

### Expected Total Distance

```text
940 meters
```

### Calculation

```text
Gedung A → Gedung B = 120
Gedung B → Gedung C = 150
Gedung C → Gedung D = 130
Gedung D → GKU 2 = 240
GKU 2 → Gedung E = 300

Total = 120 + 150 + 130 + 240 + 300
Total = 940 meters
```

Jika hasil tidak sesuai, periksa:

1. Graph data.
2. Edge weights.
3. Adjacency list.
4. Dijkstra implementation.
5. Path reconstruction.

---

## 18. Interaction Requirements

### Dropdown

Dropdown harus otomatis berisi seluruh node:

```text
Gedung A
Gedung B
Gedung C
Gedung D
Gedung E
Gedung F
GKU 1
GKU 2
```

### Find Shortest Path Button

Saat tombol ditekan:

1. Ambil nilai start dan destination.
2. Jalankan Dijkstra.
3. Tampilkan jalur terpendek.
4. Tampilkan total jarak.
5. Highlight edge jalur terpendek.
6. Highlight node jalur terpendek.

### Reset Button

Saat tombol ditekan:

1. Hapus highlight edge.
2. Hapus highlight node.
3. Reset result card.
4. Render ulang edge normal.

### Node Click

Saat node diklik:

1. Tampilkan nama node.
2. Tampilkan daftar tetangga.
3. Tampilkan jarak ke masing-masing tetangga.

Contoh:

```text
Neighbors of GKU 2:
GKU 1 (260 m), Gedung F (170 m), Gedung E (300 m), Gedung D (240 m)
```

---

## 19. Responsive Design

Desain harus responsif.

### Desktop

- Sidebar di kiri.
- Map area di kanan.
- Edge list di bawah map.

### Tablet / Mobile

- Layout boleh berubah menjadi satu kolom.
- Sidebar dapat berada di bawah atau atas.
- Map tetap terbaca.
- Node tidak saling menumpuk secara parah.
- Tabel dapat scroll horizontal jika diperlukan.

---

## 20. File Structure

Project harus menggunakan struktur berikut:

```text
graph-itera-campus-navigator/
│
├── index.html
├── style.css
├── script.js
└── design.md
```

---

## 21. Code Rules

### HTML

- Gunakan struktur semantic.
- Jangan gunakan inline style.
- Jangan gunakan inline script.
- Hubungkan file CSS dan JS secara eksternal.

### CSS

- Gunakan class yang jelas.
- Susun berdasarkan section:
  1. Reset
  2. Variables
  3. Layout
  4. Sidebar
  5. Map
  6. Nodes
  7. Edges
  8. Table
  9. Responsive

### JavaScript

- Gunakan variable name yang mudah dipahami.
- Jangan over-engineer.
- Jangan memakai external library.
- Beri komentar hanya pada bagian penting.
- Semua data graph harus berada di `script.js`.

---

## 22. Accessibility and Readability

Desain harus memperhatikan:

1. Kontras warna cukup.
2. Text mudah dibaca.
3. Button mudah dikenali.
4. Label dropdown jelas.
5. Node label tidak terlalu kecil.
6. Result card mudah dipahami.
7. Edge label tidak bertabrakan secara berlebihan.

---

## 23. Validation Checklist

Sebelum final, pastikan:

```text
[ ] MCP design Graph ITERA Campus Navigator digunakan sebagai acuan utama.
[ ] Tidak redesign dari nol.
[ ] index.html dibuat.
[ ] style.css dibuat.
[ ] script.js dibuat.
[ ] Sidebar tampil.
[ ] Map area tampil.
[ ] Semua node tampil.
[ ] Posisi Gedung A dan Gedung B berada di atas GKU 2.
[ ] GKU 2 berada di tengah perempatan.
[ ] SVG edge menghubungkan pusat node.
[ ] Semua bobot edge tampil.
[ ] Edge list table tampil.
[ ] Dropdown otomatis terisi.
[ ] Tombol Find Shortest Path berfungsi.
[ ] Tombol Reset berfungsi.
[ ] Klik node menampilkan tetangga.
[ ] Dijkstra berjalan.
[ ] Test Gedung A ke Gedung E menghasilkan 940 meter.
[ ] Jalur terpendek di-highlight.
[ ] Responsive layout berjalan.
[ ] Tidak memakai framework atau library eksternal.
```

---

## 24. Final Expected Output

Final project harus menghasilkan aplikasi dengan:

1. Tampilan modern sesuai MCP design.
2. Visualisasi graph ITERA yang jelas.
3. Pencarian jalur terpendek dengan Dijkstra.
4. Edge list table.
5. Node interaction.
6. Responsive layout.
7. Code sederhana dan mudah dijelaskan saat presentasi.

---

## 25. Implementation Note for Agent

When implementing this project, always prioritize the MCP design:

```text
Graph ITERA Campus Navigator
projects/8971386065496766002
```

If there is a conflict between fallback instructions and the MCP design, follow the MCP design first, except for these non-negotiable requirements:

1. GKU 2 must be at the center of the main road intersection.
2. Gedung A and Gedung B must be above GKU 2.
3. Dijkstra test from Gedung A to Gedung E must return 940 meters.
4. Project must use only HTML, CSS, and JavaScript.
5. No external framework or library.
