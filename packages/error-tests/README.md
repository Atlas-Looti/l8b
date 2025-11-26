# LootiScript Error Tests

Folder ini berisi test file untuk semua error yang bisa di-detect oleh VSCode Extension.

## Struktur File

### Syntax Errors (E1xxx)
- `syntax-e1001-unterminated-function.loot` - Function tidak ditutup dengan 'end'
- `syntax-e1002-too-many-end.loot` - Extra 'end' statement tanpa opening
- `syntax-e1004-unexpected-token.loot` - Missing parenthesis/bracket
- `syntax-e1008-unterminated-string.loot` - String tidak ditutup dengan quote

### API Validation Errors (E7100)
- `api-e7100-screen-errors.loot` - Invalid properties pada screen API
- `api-e7100-audio-errors.loot` - Invalid properties pada audio API
- `api-e7100-keyboard-errors.loot` - Invalid properties pada keyboard API
- `api-e7100-gamepad-errors.loot` - Invalid properties pada gamepad API
- `api-e7100-storage-errors.loot` - Invalid properties pada storage API
- `api-e7100-sprites-errors.loot` - Nested properties pada sprites (selalu error)
- `api-e7100-map-errors.loot` - Nested properties pada map (selalu error)

### Warnings (Wxxxx)
- `warning-w1001-api-assignment.loot` - Assignment ke API variables

## Cara Menggunakan

1. Buka file test yang ingin di-verify di VSCode
2. Buka Problems panel (`Ctrl+Shift+M`)
3. Lihat error/warning yang muncul

Setiap file di-design untuk trigger satu jenis error saja, sehingga mudah untuk testing individual.

## Catatan

**Error yang TIDAK terdeteksi di VSCode:**
- Runtime errors (E2xxx) - hanya muncul saat runtime
- Compilation errors (E3xxx) - hanya muncul saat compile
- Scene errors (E5xxx) - hanya muncul saat runtime

Error-error tersebut tidak bisa di-test melalui VSCode extension karena memerlukan runtime environment.
