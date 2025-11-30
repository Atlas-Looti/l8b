# Storage

The `storage` object enables persistent data storage. Data remains saved even after the browser is closed.

## Methods

### `storage.set(name, value)`

Saves a value permanently. Value can be a number, string, list, or object.

```lua
storage.set("highscore", 5000)
storage.set("settings", {sound: true, music: false})
```

### `storage.get(name)`

Retrieves a saved value. Returns `null` if data is not found.

```lua
highscore = storage.get("highscore")
if not highscore then highscore = 0 end
```
