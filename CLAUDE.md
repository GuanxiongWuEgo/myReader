# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Chrome Extension (Manifest V3) that provides a Reader View — strips page clutter and renders a clean, readable article overlay. Uses [Mozilla Readability](https://github.com/mozilla/readability) (same library as Firefox Reader View) for content extraction.

## Commands

```bash
npm install          # install dependencies
npm run build        # production build → dist/
npm run dev          # development build with watch mode
```

To load in Chrome: open `chrome://extensions`, enable Developer Mode, click "Load unpacked", select the `dist/` folder.

## Architecture

```
src/
  background.ts       # Service worker: listens for icon click, sends TOGGLE_READER message
  content.ts          # Content script: receives message, toggles ReaderView instance
  reader/
    index.ts          # ReaderView class — clones DOM, runs Readability, injects overlay
    styles.ts         # All CSS for the reader overlay (returned as a string, injected at runtime)
manifest.json         # MV3 manifest — content script injected on all URLs
webpack.config.js     # Bundles background.ts and content.ts into dist/
```

**Data flow:** Icon click → `background.ts` → `chrome.tabs.sendMessage` → `content.ts` → `ReaderView.activate()` → Readability extracts article → overlay injected into page DOM.

The overlay uses CSS prefix `#mrv-` (My Reader View) to avoid conflicts with host page styles. All styles are scoped under `#mrv-overlay`.

## GitHub remote

`git@github.com:GuanxiongWuEgo/myReader.git`
