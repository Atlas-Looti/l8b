# LootiScript Programming

LootiScript adalah bahasa scripting ringan yang terinspirasi oleh Lua dan dirancang agar mudah dipelajari, ekspresif, serta nyaman digunakan di ekosistem L8B. LootiScript dilengkapi dengan **bytecode compiler**, **inline cache optimization**, dan **scheduler blocks** untuk performa dan produktivitas yang lebih baik. Panduan ini merangkum dasar-dasar bahasa beserta idiom yang paling sering dipakai saat membangun game atau mini-app Web3 dengan L8B.

## Prinsip Dasar

- Variabel bersifat global secara default; gunakan `local` untuk membuat variabel lokal di dalam fungsi.
- Newline diperlakukan seperti spasi; penulisan kode bisa fleksibel.
- Tidak ada nilai `null`, `nil`, atau `undefined`. Variabel yang belum pernah diisi bernilai `0`.
- Tidak ada tipe boolean khusus. `0` dianggap *false*, selain itu *true*.
- Tidak ada runtime error karena variabel tak terdefinisi; memanggil nilai non-fungsi sebagai fungsi akan mengembalikan nilai itu sendiri.
- **LootiScript dikompilasi ke bytecode** untuk eksekusi yang lebih cepat dibanding interpretasi langsung.

## Variables

Variabel adalah identifier yang menyimpan nilai. Anda tidak perlu mendeklarasikan variabel sebelumnya; begitu diberikan nilai, variabel tersebut langsung tersedia.

### Deklarasi & Penugasan

```lua
x = 1
```

Nilai `x` kini 1. Semua variabel yang belum pernah dipakai otomatis bernilai `0`, jadi Anda tidak akan menemukan error “undefined”.

### Variabel Lokal

Secara default, penugasan akan membuat variabel global. Gunakan `local` di dalam fungsi untuk membatasi scope:

```lua
init = function()
  local score = 0
end
```

### Rekap

- Tidak diperlukan kata kunci khusus untuk membuat variabel global.
- Variabel yang belum diinisialisasi bernilai `0`.
- `local` hanya berlaku pada blok fungsi tempat ia didefinisikan.

## Types of Values

LootiScript mengenal lima tipe utama: **Number**, **String**, **List**, **Object**, dan **Function**. Mengelola tipe ini adalah inti dari memprogram gameplay maupun logika aplikasi.

### Number

```lua
pi = 3.1415
count = 42
ratio = 1/2
```

### String

```lua
animal = "cat"
print("Hello " + animal)
```

### List

```lua
empty = []
primes = [2,3,5,7,11]
mixed = [1,"cat",[1,2,3]]

print(primes[0]) // akses berdasarkan indeks dari 0

for value in primes
  print(value)
end
```

### Object

```lua
player = object
  x = 0
  y = 0
  name = "hero"
end

player.x = 10
player["y"] = 20

for field in player
  print(field + " = " + player[field])
end
```

### Function

```lua
draw = function()
  print("render frame")
end
```

## Functions

```lua
nextNumber = function(start)
  return start + 1
end

useLocal = function()
  local i = 0
  i += 1
end

print(nextNumber(10))
```

Fungsi didefinisikan dengan kata kunci `function` dan diakhiri `end`. Anda dapat memecah program menjadi banyak fungsi kecil tanpa harus mendefinisikan semuanya sekaligus—pemanggilan terhadap nilai yang belum menjadi fungsi hanya akan mengembalikan `0`, sehingga tidak menimbulkan error.

### Local Variables

Variabel yang dideklarasikan dengan `local` di dalam fungsi hanya hidup selama fungsi berjalan. Gunakan ini untuk menghentikan efek samping variabel global.

### Memanggil Nilai Non-Fungsi

Memanggil nilai non-fungsi sebagai fungsi hanya mengembalikan nilainya (tanpa error):

```lua
x = 1
print(x(0)) // hasil 1
```

Ini memungkinkan Anda merancang kerangka fungsi sejak awal meski implementasi belum ada.

## Arrow Functions

LootiScript mendukung syntax arrow function modern untuk menulis fungsi secara lebih ringkas:

```lua
// Single parameter (tanpa tanda kurung)
double = x => x * 2

// Multiple parameters
add = (a, b) => a + b

// Empty parameters
greet = () => print("Hello!")

// Multi-line body
calculate = (x, y) => {
  local result = x * y
  return result + 10
}
```

Arrow function sangat berguna untuk callback dan operasi list:

```lua
numbers = [1, 2, 3, 4, 5]

// Gunakan dengan map/filter (jika tersedia di API)
doubled = numbers.map(x => x * 2)

// Sebagai callback untuk event handler
button.onClick = () => print("Clicked!")
```

### Perbedaan dengan Function Biasa

- Syntax lebih ringkas untuk fungsi sederhana
- Cocok untuk callback dan functional programming
- Tetap mendukung `local`, `return`, dan semua fitur fungsi normal

## Conditions

```lua
if age < 18 then
  print("child")
else
  print("adult")
end
```

Gunakan `elsif` untuk cabang tambahan:

```lua
if age < 10 then
  print("child")
elsif age < 18 then
  print("teen")
elsif age < 30 then
  print("young adult")
else
  print("wise")
end
```

Operator perbandingan (==, !=, <, >, <=, >=) dan operator boolean (`and`, `or`, `not`) mengikuti aturan standar dan dijelaskan lebih rinci di bagian **Operators**.

## Loops

```lua
for i = 1 to 10
  print(i)
end

for i = 0 to 10 by 2
  print(i)
end

list = [2,3,5]
for value in list
  print(value)
end
```

### While Loop

```lua
x = 1
while x * x < 100
  print(x * x)
  x += 1
end
```

Gunakan `break` untuk keluar lebih awal, `continue` untuk lompat ke iterasi berikut:

```lua
while true
  x += 1
  if x >= 100 then break end
end
```

## Time & Scheduler Blocks

LootiScript punya konstruksi khusus untuk menjadwalkan kode tanpa repot mengelola timer manual. Fitur ini memudahkan pembuatan animasi, spawn system, dan delayed actions.

### `after`

Jalankan blok satu kali setelah delay. Mendukung berbagai satuan waktu untuk kemudahan.

```lua
// Delay dalam milidetik (default)
after 1000 do
  spawnEnemy()
end

// Gunakan satuan waktu yang lebih readable
after 2 seconds do
  showMessage("2 detik telah berlalu")
end

after 5 minutes do
  saveGame()
end
```

### `every`

Jalankan blok berulang setiap interval. Cocok untuk spawn system, periodic checks, atau animations.

```lua
// Spawn enemy setiap 3 detik
every 3 seconds do
  spawnEnemy()
end

// Update UI setiap 500ms
every 500 do
  updateHealthBar()
end

// Periodic save setiap 10 menit
every 10 minutes do
  autoSave()
end
```

### `sleep`

Menjeda eksekusi di dalam fungsi aktif—berguna untuk coroutine sederhana atau animasi bertahap.

```lua
animateSequence = function()
  character.x = 0
  sleep 500
  character.x = 50
  sleep 500
  character.x = 100
end

// Cutscene dengan timing
playCutscene = function()
  showDialogue("Hello!")
  sleep 2 seconds
  showDialogue("Welcome to the game")
  sleep 2 seconds
  startGame()
end
```

### Time Multipliers

Semua scheduler mendukung satuan waktu berikut:

| Satuan | Nilai (ms) | Contoh |
|--------|-----------|---------|
| `millisecond(s)` | 1 | `after 500 milliseconds` |
| `second(s)` | 1000 | `every 2 seconds` |
| `minute(s)` | 60000 | `after 5 minutes` |
| `hour(s)` | 3600000 | `every 1 hour` |
| `day(s)` | 86400000 | `after 1 day` |

Jika tidak ada satuan, nilai dianggap dalam milidetik.

### Catatan Penting

- Semua scheduler terintegrasi dengan runtime loop, aman digunakan bersamaan dengan `update`/`draw`
- `sleep` hanya bekerja di dalam fungsi yang dipanggil dari runtime
- Scheduler berjalan di background thread terpisah untuk menghindari blocking

## Operators

### Comparison Operators

| Operator | Makna                                  |
| -------- | -------------------------------------- |
| `==`     | Sama dengan                            |
| `!=`     | Tidak sama                             |
| `<`      | Kurang dari                            |
| `>`      | Lebih dari                             |
| `<=`     | Kurang dari atau sama dengan           |
| `>=`     | Lebih dari atau sama dengan            |

### Boolean Operators

- `and`: true hanya jika kedua operand true
- `or`: true jika salah satu operand true
- `not`: membalik nilai kebenaran

LootiScript tidak memiliki tipe boolean khusus; `0` bernilai false dan nilai lain bernilai true. Tersedia konstanta `true` (1) dan `false` (0).

### Arithmetic Operators

| Operator | Makna                                         |
| -------- | --------------------------------------------- |
| `+`      | Penjumlahan                                   |
| `-`      | Pengurangan                                   |
| `*`      | Perkalian                                     |
| `/`      | Pembagian                                     |
| `%`      | Modulo (sisa bagi)                            |
| `^`      | Pangkat (`x ^ y` setara dengan `pow(x, y)`)   |

## Built-ins

### Math & Constants

- `max`, `min`, `round`, `floor`, `ceil`, `abs`, `sqrt`, `pow`, `log`, `exp`, `PI`
- Trigonometri radian: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`
- Trigonometri derajat: `sind`, `cosd`, `tand`, `asind`, `acosd`, `atand`, `atan2d`

### Random

```lua
random.seed(42)
random.next()     // 0..1
random.nextInt(6) // 0..5
```

### String Operations

- `a + b` gabungkan string
- `str.length`
- `str.substring(i1, i2)`
- `str.startsWith(s)`, `str.endsWith(s)`
- `str.indexOf(s)`, `str.lastIndexOf(s)`
- `str.replace(s1, s2)`
- `str.toUpperCase()`, `str.toLowerCase()`
- `str.split(sep)`

### List Operations

- `list.length`
- `list.push(value)`
- `list.insert(value)` (di awal)
- `list.insertAt(value, index)`
- `list.indexOf(value)`
- `list.contains(value)`
- `list.removeAt(index)`
- `list.removeElement(value)`
- `list1.concat(list2)`

#### Sorting

```lua
compare = function(a, b)
  return a.x - b.x
end

points.sortList(compare)
```

Jika tanpa fungsi pembanding, list disortir alfabetis.

## Komentar

Gunakan `//` hingga akhir baris:

```lua
update = function()
  // hitung delta waktu
end
```

## Classes

Class adalah cetak biru (blueprint) untuk membuat objek di LootiScript. Sebuah class dapat menyimpan properti default serta fungsi yang akan dibawa oleh setiap instance. Gunakan class saat Anda ingin banyak objek berbagi perilaku dasar (musuh, proyektil, NPC, dsb.).

### Define a Class

Contoh `Enemy` yang menyimpan posisi, HP, dan kecepatan lalu menyediakan fungsi `move` dan `hit`:

```lua
Enemy = class
  constructor = function(position)
    this.position = position
  end

  hp = 10
  velocity = 1

  move = function()
    position += velocity
  end

  hit = function(damage)
    hp -= damage
  end
end
```

- `constructor` dipanggil otomatis saat instance baru dibuat.
- Gunakan `this` untuk mengakses properti milik objek yang sedang berjalan.

### Create Instances

```lua
enemy1 = new Enemy(50)
enemy2 = new Enemy(100)

enemy2.velocity = 2

enemy1.move()
enemy2.move()
```

Operator `new` membuat instance baru berdasarkan class yang dituju. Setiap instance membawa properti/fungsi default dari class, tapi Anda tetap bisa mengubah nilainya secara individual (`enemy2.velocity = 2`).

### Inheritance

Gunakan `extends` untuk membuat variasi class sambil mewarisi perilaku default.

```lua
Boss = class extends Enemy
  constructor = function(position)
    super(position)
    hp = 50
  end

  move = function()
    super()
    hp += 1
  end
end

finalBoss = new Boss(120)
```

- `super()` memanggil fungsi dengan nama sama pada class induk. Di constructor, ini memastikan properti dasar tetap terinisialisasi.
- Override perilaku dengan menulis ulang fungsi (mis. `move`). Panggil `super()` bila Anda ingin mempertahankan perilaku lama lalu menambahkan logika baru.

### Catatan Cepat

- Fungsi yang dipanggil lewat instance (`enemy1.move()`) otomatis menggunakan properti instance tersebut—tidak perlu menulis `this` jika mengakses variabel yang sudah diberi nama sama.
- Anda bebas menambah properti baru setelah instance dibuat (mis. `enemy1.state = "idle"`), sama seperti objek biasa.

## Performance & Optimizations

LootiScript dirancang dengan performa sebagai prioritas utama. Berikut adalah optimisasi yang berjalan di balik layar:

### Bytecode Compilation

**LootiScript dikompilasi ke bytecode** sebelum dieksekusi:

1. **Parser** mengubah kode menjadi Abstract Syntax Tree (AST)
2. **Compiler** mengubah AST menjadi bytecode dengan optimisasi
3. **VM Processor** mengeksekusi bytecode dengan performa tinggi

Proses ini memberikan performa yang sangat baik untuk game dan aplikasi interaktif.

### Inline Cache

Property access dioptimisasi menggunakan **inline cache** yang meng-cache object shapes:

```lua
// Akses pertama: cache object shape
player.x = 10  // O(n) hash lookup

// Akses berikutnya: gunakan cached shape
player.x = 20  // O(1) direct access
player.y = 30  // O(1) direct access
```

Cache memiliki 3 state:

- **Monomorphic**: Single object shape (tercepat, O(1))
- **Polymorphic**: 2-4 object shapes berbeda (cepat)
- **Megamorphic**: Banyak shapes (fallback ke hash lookup)

### Compiler Optimizations

Compiler melakukan beberapa optimisasi otomatis:

**1. Peephole Optimization (Opcode Fusion)**

```lua
// Kode Anda:
x = getValue()
x()

// Compiler menggabungkan opcode:
// LOAD_VARIABLE + FUNCTION_CALL → LOAD_VAR_CALL (lebih cepat)
```

**2. Constant Folding**

```lua
// Kode Anda:
x = 2 + 3 * 4

// Compiler menghitung di compile-time:
x = 14  // Tidak ada operasi runtime
```

**3. Dead Code Elimination**

```lua
// Kode Anda:
if false then
  expensiveOperation()  // Tidak akan pernah dieksekusi
end

// Compiler menghapus kode yang tidak akan pernah dijalankan
```

### Object Pooling

Runtime menggunakan **object pooling** untuk mengurangi garbage collection:

- Array dan object sederhana di-recycle
- Mengurangi allocation overhead
- Performa lebih stabil, terutama di game loop

### Best Practices untuk Performa

1. **Gunakan local variables** untuk variabel yang sering diakses:

```lua
update = function()
  local px = player.x  // Cache ke local
  local py = player.y
  
  // Gunakan local variables
  if px > 100 and py > 100 then
    // ...
  end
end
```

2. **Hindari property access berulang** dalam loop:

```lua
// ❌ Buruk
for i = 0 to 100
  doSomething(player.position.x, player.position.y)
end

// ✅ Baik
local pos = player.position
for i = 0 to 100
  doSomething(pos.x, pos.y)
end
```

3. **Gunakan arrow functions** untuk callback sederhana:

```lua
// Lebih efisien untuk fungsi kecil
enemies.forEach(e => e.update())
```

## Ringkasan

LootiScript mempertahankan kesederhanaan bahasa scripting minimalis sambil membawa identitas yang selaras dengan ekosistem L8B. Bahasa ini memudahkan Anda menulis gameplay loop, integrasi Web3, dan logika interaktif tanpa perlu berurusan dengan error runtime yang kompleks. Mulailah dari ide sederhana, pecah menjadi fungsi-fungsi kecil, dan kembangkan game atau mini-app Anda secara iteratif. Selamat berkarya!
