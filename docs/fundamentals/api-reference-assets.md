# Assets

The asset manager allows you to load external files. Loading is **asynchronous**.

## Methods

### `Assets.loadImage(path, callback?)`

Loads an image file.

**Parameters:**

- `path`: Image file path relative to `assets/` directory
- `callback`: Optional callback called when image is loaded

**Returns:** Loader object with:

- `ready`: `0` (loading) or `1` (ready)
- `image`: Image object when loaded

```lua
// With callback
Assets.loadImage("player.png", function(image)
  // Image is ready to use
end)

// With loader object
loader = Assets.loadImage("enemy.png")
if loader.ready == 1 then
  mySprite = loader.image
end
```

### `Assets.loadJSON(path, callback?)`

Loads a JSON file and parses it into an L8B object.

**Parameters:**

- `path`: JSON file path (without .json extension)
- `callback`: Optional callback called when JSON is loaded

**Returns:** Loader object with:

- `ready`: `0` (loading) or `1` (ready)
- `data`: Parsed JSON data when loaded

```lua
Assets.loadJSON("config", function(data)
  items = data
end)
```

### `Assets.loadText(path, callback?, ext?)`

Loads a text file.

**Parameters:**

- `path`: Text file path (without extension)
- `callback`: Optional callback
- `ext`: File extension (default: "txt")

**Returns:** Loader object with `text` property.

### `Assets.loadCSV(path, callback?)`

Loads a CSV file (shorthand for `loadText` with `.csv` extension).

### `Assets.loadMarkdown(path, callback?)`

Loads a Markdown file (shorthand for `loadText` with `.md` extension).

### `Assets.loadFont(font)`

Loads a custom font file (.ttf).

```lua
Assets.loadFont("myfont")  // Loads assets/myfont.ttf
```

For complete Assets API documentation, see [@l8b/assets README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/assets/README.md).
