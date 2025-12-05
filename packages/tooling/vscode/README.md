# LootiScript - VS Code Extension

Language support for LootiScript, the scripting language for the L8B Game Framework.

## 🎯 Features

- ✅ **IntelliSense & Autocomplete**: Context-aware code completion for all L8B APIs (screen.*, audio.*, input.*, system.*)
- ✅ **Signature Help**: Parameter hints when typing function calls
- ✅ **20 Code Snippets**: Game loops, drawing, input handling, and more
- ✅ **Quick Fixes**: Smart error corrections (missing 'end', undefined variables, extract to function)
- ✅ **Find All References**: Workspace-wide symbol search
- ✅ **Status Bar Integration**: Real-time error/warning indicators
- ✅ **Built-in Documentation**: Quick API reference via Command Palette
- ✅ **4 Commands**: Format, Run, Docs, Restart Server

## 🚀 Installation

### Method 1: Install from VSIX (Recommended)

1. **Download** or locate the file: `lootiscript-vscode-0.0.1.vsix`

2. **Install in VS Code**:
   - Open VS Code
   - Press `Ctrl+Shift+P` (Command Palette)
   - Type: "Extensions: Install from VSIX..."
   - Select the `lootiscript-vscode-0.0.1.vsix` file
   - Restart VS Code

3. **Verify Installation**:
   - Open a `.loot` file
   - Status bar (bottom right) should show "✓ L8B"
   - Type `screen.` to test autocomplete

### Method 2: Development Mode

1. Open this directory in VS Code
2. Press `F5` to launch Extension Development Host
3. Test extension in the new window

## 💡 Usage

### Autocomplete
```lootiscript
screen.  // <- autocomplete appears with all screen methods
audio.   // <- shows playSound, playMusic, beep, etc.
input.   // <- shows keyboard, mouse, touch properties
```

### Code Snippets (Type + Tab)
| Trigger | Result |
|---------|--------|
| `update` | Game update loop |
| `draw` | Game draw loop |
| `sprite` | screen.drawSprite() with params |
| `sound` | audio.playSound() |
| `input` | Keyboard input check |
| `mouse` | Mouse input check |
| `object` | Complete game object |

**And 13 more snippets!**

### Commands (Ctrl+Shift+P)
- `LootiScript: Show API Documentation` - Opens built-in API docs
- `LootiScript: Run Script` - Runs your game with L8B CLI
- `LootiScript: Format Document` - Formats code
- `LootiScript: Restart Language Server` - Restart if needed

### Status Bar
Look at bottom right corner:
- `✓ L8B` = No problems
- `⚠ L8B 3` = 3 warnings
- `✗ L8B 5` = 5 errors
- Hover for details

## ⚙️ Settings

Access via: File → Preferences → Settings → Search "lootiscript"

```json
{
  "lootiscript.format.enable": true,
  "lootiscript.completion.enable": true,
  "lootiscript.diagnostics.enable": true,
  "lootiscript.format.indentSize": 1,
  "lootiscript.signatureHelp.enable": true
}
```

## 🎮 Example Usage

```lootiscript
// Type "init" + Tab
init = function()
	player_x = 100
	player_y = 100
end

// Type "update" + Tab
update = function()
	// Type "input" + Tab to expand input check
	if input.keyboard.pressed("space") then
		// Type "sound" + Tab
		audio.playSound("jump", 1.0, false)
	end
end

// Type "draw" + Tab
draw = function()
	// Type "clear" + Tab
	screen.clearScreen("#000080")
	
	// Type "sprite" + Tab
	screen.drawSprite("player", player_x, player_y, 32, 32)
end
```

## 📊 Developer Productivity

**Estimated Time Saved**: 30-40% reduction in typing and API lookups!

### Before:
- ❌ Manual typing of all API methods
- ❌ No parameter hints
- ❌ Difficult to remember API methods
- ❌ No quick fixes

### After:
- ✅ Type `screen.` → instant autocomplete
- ✅ See parameter hints while typing
- ✅ 20 snippets for common patterns
- ✅ Quick fixes with one click
- ✅ Built-in docs accessible anytime

## 🔧 Development

To modify this extension:

```bash
# Install dependencies
pnpm install

# Compile TypeScript
pnpm run compile

# Watch mode
pnpm run watch

# Package new VSIX
pnpm dlx @vscode/vsce package --no-dependencies
```

## 📝 Release Notes

### 0.0.1

**Initial Release** - Complete language server implementation:

- Enhanced autocomplete with 50+ API methods
- 20 code snippets for game development
- Signature help for all functions
- 3 code action types (quick fixes + refactoring)
- Workspace-wide find references
- Status bar integration with error counts
- Built-in API documentation viewer
- 5 configuration options

## 🔗 Links

- [L8B Framework GitHub](https://github.com/Atlas-Looti/l8b)
- [Report Issues](https://github.com/Atlas-Looti/l8b/issues)

---

**Enjoy coding with LootiScript!** 🎮
