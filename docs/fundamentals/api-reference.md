# API Reference

Dokumentasi lengkap dan mendetail untuk API built-in l8b.

## Screen

Di l8b, layar direpresentasikan oleh objek predefined `screen`. Untuk menampilkan bentuk atau gambar di layar, Anda cukup memanggil fungsi (method) pada objek ini.

### Sistem Koordinat

Untuk memudahkan pekerjaan Anda, l8b secara otomatis menskalakan koordinat layar, terlepas dari resolusi tampilan sebenarnya.

- **Titik Asal (0,0)**: Berada tepat di **tengah layar**.
- **Skala**: Dimensi tampilan terkecil (lebar dalam mode portrait, tinggi dalam mode landscape) selalu dinormalisasi menjadi **200**.
- **Rentang**: Karena 0 ada di tengah, dimensi terkecil berkisar dari **-100 hingga +100**.

Dimensi terbesar akan menyesuaikan rasio aspek layar. Misalnya pada layar 16:9:

- Landscape: Y dari -100 s/d +100, X dari -178 s/d +178.
- Portrait: X dari -100 s/d +100, Y dari -178 s/d +178.

### Properties

| Property | Deskripsi |
|----------|-------------|
| `screen.width` | Lebar layar saat ini dalam unit koordinat l8b. |
| `screen.height` | Tinggi layar saat ini dalam unit koordinat l8b. |

### Warna & Tampilan

#### `screen.setColor(color)`

Mendefinisikan warna yang akan digunakan untuk pemanggilan fungsi menggambar berikutnya.

Warna didefinisikan sebagai string:

- **RGB**: `"rgb(255,0,0)"` (Merah terang), `"rgb(255,255,255)"` (Putih). Nilai 0-255.
- **Hex**: `"#FFF"` atau `"#FFFFFF"` (Putih), `"#F00"` (Merah).
- **Nama**: `"red"`, `"blue"`, `"white"`, dll (sesuai standar HTML5).

#### `screen.clear(color)`

Membersihkan layar (mengisinya dengan warna yang diberikan, atau hitam jika tidak ada warna yang diberikan).

```lua
screen.clear("#000") // Isi layar dengan hitam
```

#### `screen.setAlpha(opacity)`

Mendefinisikan tingkat opasitas (transparansi) keseluruhan untuk fungsi menggambar selanjutnya.

- `0`: Transparan total (tidak terlihat).
- `1`: Opasitas total (menutupi apa yang ada di bawahnya).

```lua
screen.setAlpha(0.5) // Elemen berikutnya akan semi-transparan
// ... menggambar sesuatu ...
screen.setAlpha(1)   // Reset ke default
```

#### `screen.setBlending(mode)`

Mendefinisikan bagaimana operasi menggambar selanjutnya akan dikomposisikan dengan gambar yang sudah ada.

- `"normal"`: Menimpa gambar di bawahnya (default).
- `"additive"`: Menambahkan nilai warna (efek cahaya/glowing).

### Menggambar Bentuk Dasar

#### `screen.fillRect(x, y, width, height, color)`

Menggambar persegi panjang **padat** (terisi warna).

- `x, y`: Koordinat pusat persegi panjang.
- `width, height`: Lebar dan tinggi.
- `color`: (Opsional) Warna isi. Jika dihilangkan, menggunakan warna terakhir.

#### `screen.drawRect(x, y, width, height, color)`

Menggambar **garis tepi** (outline) persegi panjang. Parameter sama dengan `fillRect`.

#### `screen.fillRound(x, y, width, height, color)`

Menggambar bentuk bulat padat (lingkaran atau elips tergantung dimensi).

- `x, y`: Koordinat pusat.
- `width, height`: Diameter horizontal dan vertikal.

#### `screen.drawRound(x, y, width, height, color)`

Menggambar garis tepi bentuk bulat.

#### `screen.drawLine(x1, y1, x2, y2, color)`

Menggambar garis lurus yang menghubungkan titik `(x1, y1)` dan `(x2, y2)`.

#### `screen.setLineWidth(width)`

Mengatur ketebalan garis untuk operasi `draw...` (outline) selanjutnya. Default adalah 1.

### Menggambar Bentuk Lanjut

#### `screen.fillPolygon(x1, y1, x2, y2, ..., color)`

Mengisi poligon yang didefinisikan oleh daftar koordinat titik.
Bisa juga menerima array sebagai argumen pertama: `screen.fillPolygon([x1, y1, x2, y2, ...], color)`.

#### `screen.drawPolyline(x1, y1, x2, y2, ..., color)`

Sama seperti polygon tapi garis tidak ditutup otomatis kembali ke titik awal.

#### `screen.drawArc(x, y, radius, startAngle, endAngle, counterClockwise, color)`

Menggambar busur lingkaran.

- `radius`: Jari-jari lingkaran.
- `startAngle, endAngle`: Sudut dalam **derajat**.

### Sprites & Maps

#### `screen.drawSprite(name, x, y, width, height)`

Menggambar sprite yang telah Anda buat di tab Sprites.

- `name`: Nama sprite (string), contoh `"player"`.
- `x, y`: Koordinat pusat sprite.
- `width`: Lebar tampilan.
- `height`: (Opsional) Tinggi tampilan. Jika dihilangkan, akan dihitung proporsional.

**Animated Sprites**:
Jika sprite memiliki animasi, l8b otomatis memutar frame yang sesuai.

- `sprites["name"].setFrame(0)`: Reset animasi ke frame awal.
- `screen.drawSprite("name.0", ...)`: Menggambar frame spesifik (frame 0).

#### `screen.drawMap(name, x, y, width, height)`

Menggambar map yang dibuat di tab Maps.

- `name`: Nama map.
- `x, y`: Koordinat pusat tampilan map.
- `width, height`: Ukuran tampilan map di layar.

### Teks

#### `screen.drawText(text, x, y, size, color)`

Menampilkan teks di layar.

- `text`: String teks yang akan ditampilkan.
- `x, y`: Koordinat pusat teks.
- `size`: Tinggi teks.

#### `screen.setFont(fontName)`

Mengatur font untuk panggilan `drawText` selanjutnya.
Contoh font bawaan: `"BitCell"`, `"DigitalDisco"`, `"PressStart2P"`, dll.

#### `screen.loadFont(fontName)`

Memulai proses loading font. Font harus diload sebelum bisa digunakan dengan sempurna. Gunakan `screen.isFontReady(fontName)` untuk mengecek statusnya.

### Transformasi Layar

Fungsi-fungsi ini mengubah sistem koordinat untuk operasi menggambar selanjutnya. **Penting:** Selalu reset kembali nilai transformasi setelah selesai menggambar bagian yang diinginkan.

#### `screen.setTranslation(tx, ty)`

Menggeser titik asal koordinat.

```lua
screen.setTranslation(50, 50)
// Menggambar di (0,0) sekarang akan muncul di (50,50)
screen.setTranslation(0, 0) // Reset
```

#### `screen.setRotation(angle)`

Memutar seluruh sistem koordinat sebesar `angle` derajat.

```lua
screen.setRotation(45)
// Gambar miring 45 derajat
screen.setRotation(0) // Reset
```

#### `screen.setScale(x, y)`

Memperbesar/memperkecil sistem koordinat.

```lua
screen.setScale(2, 2) // Zoom 2x
screen.setScale(1, 1) // Reset
```

### Transformasi Objek (Draw Parameters)

Berbeda dengan transformasi layar, fungsi ini hanya mempengaruhi **bagaimana objek digambar**, bukan sistem koordinatnya.

#### `screen.setDrawRotation(angle)`

Memutar objek (sprite/text/rect) pada porosnya sendiri.

```lua
screen.setDrawRotation(90)
screen.drawSprite("player", 0, 0, 32) // Player diputar 90 derajat
screen.setDrawRotation(0) // Reset
```

#### `screen.setDrawAnchor(anchorX, anchorY)`

Mengubah titik tumpu (anchor point) gambar. Defaultnya adalah tengah (0,0).

- `x`: -1 (kiri), 0 (tengah), 1 (kanan)
- `y`: -1 (bawah), 0 (tengah), 1 (atas)

```lua
screen.setDrawAnchor(-1, 1) // Anchor di pojok kiri atas
screen.drawText("Score", -100, 100, 20) // Teks rata kiri di pojok layar
screen.setDrawAnchor(0, 0) // Reset
```

## Inputs

Untuk membuat program interaktif, Anda perlu membaca input dari pengguna.

### Keyboard

Objek `keyboard` menyimpan status tombol saat ini.

```lua
if keyboard.UP then y += 1 end
if keyboard.SPACE then shoot() end
```

**Mendeteksi penekanan tombol (sekali saja):**
Gunakan `keyboard.press.<KEY>` di dalam fungsi `update()`. Bernilai true hanya pada frame saat tombol mulai ditekan.

```lua
if keyboard.press.SPACE then
  // Hanya dieksekusi sekali saat tombol ditekan
  jump()
end
```

### Mouse

Objek `mouse` melaporkan posisi dan status tombol mouse.

| Field | Deskripsi |
|-------|-----------|
| `mouse.x`, `mouse.y` | Posisi pointer mouse dalam koordinat layar. |
| `mouse.left` | 1 jika tombol kiri ditekan, 0 jika tidak. |
| `mouse.right` | 1 jika tombol kanan ditekan, 0 jika tidak. |
| `mouse.press` | true jika tombol mouse baru saja ditekan. |
| `mouse.release` | true jika tombol mouse baru saja dilepas. |

### Touch

Objek `touch` untuk layar sentuh (juga melaporkan status mouse sebagai sentuhan tunggal).

| Field | Deskripsi |
|-------|-----------|
| `touch.touching` | true jika pengguna menyentuh layar. |
| `touch.x`, `touch.y` | Posisi sentuhan. |
| `touch.touches` | List (array) dari semua titik sentuh aktif (untuk multi-touch). |

### Gamepad

Objek `gamepad` untuk controller fisik.

```lua
if gamepad.UP then y += 1 end
if gamepad.press.A then jump() end
```

## Audio

l8b memungkinkan Anda memutar efek suara dan musik.

### `audio.playSound(name, volume, pitch, pan, loop)`

Memutar suara (SFX).

- `name`: Nama file suara di tab Sounds.
- `volume`: 0 sampai 1 (default 1).
- `pitch`: Kecepatan playback (default 1).
- `pan`: Stereo pan, -1 (kiri) sampai 1 (kanan).
- `loop`: 1 (true) untuk mengulang terus menerus.

Mengembalikan objek suara yang bisa dikontrol:

```lua
sfx = audio.playSound("explosion")
sfx.setVolume(0.5)
sfx.stop()
```

### `audio.playMusic(name, volume, loop)`

Memutar musik latar (BGM).

- `name`: Nama file musik di tab Music.
- `volume`: 0 sampai 1.
- `loop`: 1 (true) untuk looping.

Mengembalikan objek musik:

```lua
bgm = audio.playMusic("theme", 0.8, 1)
bgm.stop()
bgm.play() // Resume
```

### `audio.beep(pattern)`

Memutar suara sintetis sederhana (legacy beeper).

```lua
audio.beep("C E G") // Memutar chord C Major
```

## Assets

Asset manager memungkinkan Anda memuat file eksternal. Loading bersifat **asynchronous**.

### `asset_manager.loadJSON(path, callback)`

Memuat file JSON dan mengubahnya menjadi objek l8b.

```lua
// Cara 1: Callback
asset_manager.loadJSON("data/items", function(data)
  items = data
end)

// Cara 2: Loader Object
loader = asset_manager.loadJSON("data/items")
// Di update loop:
if loader.ready then
  items = loader.data
end
```

### `asset_manager.loadImage(path, callback)`

Memuat gambar eksternal untuk digunakan sebagai sprite.

```lua
asset_manager.loadImage("images/background.png", function(img)
  // Gambar siap digunakan
end)
```

### Fungsi Load Lainnya

- `loadFont(path)`: Memuat font TTF.
- `loadText(path)`: Memuat file teks biasa sebagai string.
- `loadCSV(path)`: Memuat file CSV sebagai string.
- `loadMarkdown(path)`: Memuat file Markdown sebagai string.

*(Catatan: 3D Models dan WASM saat ini tidak didukung di l8b)*

## System

Objek `system` menyediakan informasi sistem dan kontrol alur.

### Informasi

- `system.language`: Bahasa preferensi pengguna (misal "en", "id").
- `system.fps`: Frame rate efektif saat ini.
- `system.time`: Waktu saat ini dalam milidetik (sejak 1 Jan 1970).
- `system.inputs`: Objek yang memberitahu ketersediaan input hardware (`keyboard`, `mouse`, `touch`, `gamepad`).

### Interaksi & Kontrol

#### `system.say(message)`

Menampilkan jendela pesan (alert).

#### `system.prompt(message, callback)`

Menampilkan jendela input teks.

```lua
system.prompt("Siapa nama Anda?", function(result)
  if result then
    playerName = result
  end
end)
```

#### `system.pause()`

Menjeda eksekusi program (hanya di development environment).

#### `system.exit()`

Keluar dari program.

## Storage

Objek `storage` memungkinkan penyimpanan data permanen (Persistent Storage). Data tetap tersimpan meskipun browser ditutup.

#### `storage.set(name, value)`

Menyimpan nilai secara permanen. Nilai bisa berupa number, string, list, atau object.

```lua
storage.set("highscore", 5000)
storage.set("settings", { sound: true, music: false })
```

#### `storage.get(name)`

Mengambil nilai yang tersimpan. Mengembalikan `null` jika data tidak ditemukan (atau `0` tergantung implementasi, cek nilai balik).

```lua
highscore = storage.get("highscore")
if !highscore then highscore = 0 end
```
