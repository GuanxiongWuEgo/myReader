export function getStyles(): string {
  return `
    #mrv-overlay {
      --mrv-bg: #fafaf8;
      --mrv-text: #2c2c2c;
      --mrv-toolbar-bg: rgba(250, 250, 248, 0.95);
      --mrv-border: #e8e8e4;
      --mrv-meta: #999;
      --mrv-link: #0066cc;
      --mrv-code-bg: #f5f5f0;
      --mrv-btn-hover: #f0f0ec;
      --mrv-btn-active-bg: #e0e0dc;

      position: fixed;
      inset: 0;
      background: var(--mrv-bg);
      color: var(--mrv-text);
      z-index: 2147483647;
      overflow-y: auto;
      font-family: Georgia, serif;
    }

    #mrv-container {
      max-width: 680px;
      margin: 0 auto;
      padding: 40px 24px 60px;
      transition: max-width 0.2s ease;
    }

    /* ── Floating top-right controls ── */
    #mrv-topbar {
      position: fixed;
      top: 16px;
      right: 16px;
      display: flex;
      gap: 6px;
      z-index: 2;
    }

    #mrv-topbar button {
      background: var(--mrv-toolbar-bg);
      border: 1px solid var(--mrv-border);
      border-radius: 6px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-size: 15px;
      color: var(--mrv-text);
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(8px);
      padding: 0;
      line-height: 1;
    }

    #mrv-topbar button:hover {
      background: var(--mrv-btn-hover);
    }

    /* ── Settings panel ── */
    #mrv-settings-panel {
      position: fixed;
      top: 56px;
      right: 16px;
      background: var(--mrv-toolbar-bg);
      border: 1px solid var(--mrv-border);
      border-radius: 8px;
      padding: 14px 14px 12px;
      z-index: 2;
      backdrop-filter: blur(8px);
      min-width: 230px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    #mrv-settings-panel.mrv-hidden {
      display: none;
    }

    .mrv-settings-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mrv-settings-label {
      font-size: 12px;
      color: var(--mrv-meta);
      width: 32px;
      flex-shrink: 0;
    }

    .mrv-group {
      display: flex;
      gap: 2px;
    }

    /* ── Panel controls ── */
    #mrv-settings-panel button,
    #mrv-font-family {
      background: none;
      border: 1px solid var(--mrv-border);
      border-radius: 4px;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 12px;
      color: var(--mrv-text);
      line-height: 1.4;
      white-space: nowrap;
    }

    #mrv-font-family {
      flex: 1;
      padding: 4px 6px;
    }

    #mrv-settings-panel button:hover,
    #mrv-font-family:hover {
      background: var(--mrv-btn-hover);
    }

    #mrv-settings-panel button.mrv-active {
      background: var(--mrv-btn-active-bg);
      border-color: #aaa;
    }

    /* ── Article ── */
    #mrv-title {
      font-size: 2em;
      line-height: 1.3;
      margin: 0 0 0.4em;
      font-weight: 700;
      color: var(--mrv-text);
    }

    #mrv-byline {
      color: var(--mrv-meta);
      font-size: 0.9em;
      margin-bottom: 0.2em;
    }

    #mrv-meta {
      color: var(--mrv-meta);
      font-size: 0.85em;
      margin-bottom: 2em;
      padding-bottom: 1.5em;
      border-bottom: 1px solid var(--mrv-border);
    }

    #mrv-body {
      font-size: 18px;
      line-height: 1.8;
      color: var(--mrv-text);
    }

    #mrv-body *:not(a) {
      color: inherit !important;
    }

    #mrv-body p { margin: 0 0 1.4em; }

    #mrv-body h1, #mrv-body h2, #mrv-body h3, #mrv-body h4 {
      margin: 1.6em 0 0.5em;
      line-height: 1.3;
    }

    #mrv-body img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin: 0.5em 0;
    }

    #mrv-body a { color: var(--mrv-link); }

    #mrv-body blockquote {
      border-left: 3px solid var(--mrv-border);
      margin: 1em 0;
      padding-left: 1em;
      font-style: italic;
      opacity: 0.85;
    }

    #mrv-body pre {
      background: var(--mrv-code-bg);
      border-radius: 4px;
      padding: 1em;
      overflow-x: auto;
      font-size: 0.85em;
    }

    #mrv-body code {
      font-family: 'Courier New', monospace;
      background: var(--mrv-code-bg);
      border-radius: 3px;
      padding: 0.1em 0.3em;
      font-size: 0.88em;
    }

    #mrv-body pre code {
      background: none;
      padding: 0;
    }
  `;
}
