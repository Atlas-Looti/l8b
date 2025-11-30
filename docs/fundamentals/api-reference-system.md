# System

The `system` object provides system information and flow control.

## Information

- `system.time`: Current time in milliseconds (since January 1, 1970).
- `system.fps`: Current effective frame rate.
- `system.cpu_load`: Current CPU load (0.0 to 1.0).
- `system.update_rate`: Update rate (updates per second).
- `system.language`: User's preferred language (e.g., "en", "id").
- `system.loading`: Loading progress (0 to 100).

## Input Availability

- `system.inputs.keyboard`: Returns `1` if keyboard is available.
- `system.inputs.mouse`: Returns `1` if mouse pointer is available.
- `system.inputs.touch`: Returns `1` if touch screen is available.
- `system.inputs.gamepad`: Returns `1` if at least one gamepad is connected.

## Control Functions

### `system.say(message)`

Displays a message dialog.

```lua
system.say("Game Over!")
```

### `system.prompt(message, callback)`

Displays a text input dialog.

```lua
system.prompt("What is your name?", function(result)
  if result then
    playerName = result
  end
end)
```

### `system.pause()`

Pauses program execution (only in development environment).

### `system.exit()`

Exits the program.

## Additional Properties

- `system.file.dropped`: `1` if a file was dropped (drag and drop).
- `system.javascript`: Object for JavaScript interoperability.
- `system.threads`: Array of active threads.
- `system.disable_autofullscreen`: Set to `1` to disable automatic fullscreen.
- `system.preemptive`: Set to `1` to enable preemptive threading (default: `1`).

For complete System API documentation, see [@l8b/time README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/time/README.md).
