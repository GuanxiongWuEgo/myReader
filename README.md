# My Reader View

A Chrome extension that strips page clutter and renders a clean, distraction-free reading overlay — powered by the same [Mozilla Readability](https://github.com/mozilla/readability) library used by Firefox Reader View.

## Features

- **One-click activation** — click the toolbar icon to toggle reader mode on any page
- **Persistent settings** — font, size, width, and theme are remembered across sessions
- **Font family** — choose from 10 fonts: Inter, Source Sans 3, Lato, Nunito, Open Sans, Roboto (sans-serif) or Georgia, Merriweather, Libre Baskerville, Roboto Slab (serif)
- **Font size** — adjustable from 12px to 28px with A− / A+ buttons; reset with ↺
- **Reading width** — Normal (680px) / Wide (860px) / Extra Wide (1040px)
- **Themes** — Light, Dark, Green
- **Keyboard shortcut** — press `Esc` to exit reader mode

## Installation

### From source

```bash
npm install
npm run build
```

Then in Chrome:

1. Open `chrome://extensions`
2. Enable **Developer Mode** (top-right toggle)
3. Click **Load unpacked** and select the `dist/` folder

## Development

```bash
npm run dev   # watch mode — recompiles to dist/ on every file change
npm run build # production build
```

## Architecture

```
src/
  background.ts        # Service worker: listens for toolbar icon click
  content.ts           # Content script: toggles ReaderView instance
  reader/
    index.ts           # ReaderView class — extracts article, builds overlay, persists settings
    styles.ts          # All overlay CSS (injected at runtime)
manifest.json          # MV3 manifest
webpack.config.js      # Bundles background.ts + content.ts → dist/
```

**Data flow:** Icon click → `background.ts` → `chrome.tabs.sendMessage` → `content.ts` → `ReaderView.activate()` → Readability extracts article → overlay injected → settings restored from `chrome.storage.local`.

## Changelog

### v1.3.0
- Settings persistence: font family, font size, reading width, and theme are now saved via `chrome.storage.local` and restored each time reader mode is activated

### v1.2.0
- Initial release: Reader View overlay with font, size, width, and theme controls
