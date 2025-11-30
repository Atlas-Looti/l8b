# Sprites

## Creating Sprites

```lua
sprite = Sprite(32, 32)  // Create a new 32x32 sprite
```

## Sprite Properties

- `sprite.width`, `sprite.height`: Sprite dimensions
- `sprite.frames`: Array of animation frames
- `sprite.fps`: Animation frames per second
- `sprite.ready`: `1` if sprite is ready, `0` if not

## Sprite Methods

- `sprite.setFPS(fps)`: Set animation speed
- `sprite.setFrame(frame)`: Set current animation frame
- `sprite.getFrame()`: Get current animation frame
- `sprite.getCurrentFrameCanvas()`: Get canvas of current frame

For complete Sprites API documentation, see [@l8b/sprites README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/sprites/README.md).
