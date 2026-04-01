import { Readability } from '@mozilla/readability';
import { getStyles } from './styles';

interface Article {
  title: string;
  byline: string | null;
  content: string;
  textContent: string;
}

type ThemeName = 'light' | 'dark' | 'green';
type WidthKey = 'normal' | 'wide' | 'xwide';

const THEME_VARS: Record<ThemeName, Record<string, string>> = {
  light: {
    '--mrv-bg': '#fafaf8',
    '--mrv-text': '#2c2c2c',
    '--mrv-toolbar-bg': 'rgba(250, 250, 248, 0.95)',
    '--mrv-border': '#e8e8e4',
    '--mrv-meta': '#999',
    '--mrv-link': '#0066cc',
    '--mrv-code-bg': '#f5f5f0',
    '--mrv-btn-hover': '#f0f0ec',
    '--mrv-btn-active-bg': '#e0e0dc',
  },
  dark: {
    '--mrv-bg': '#1e1e1e',
    '--mrv-text': '#d4d4cc',
    '--mrv-toolbar-bg': 'rgba(30, 30, 30, 0.95)',
    '--mrv-border': '#3a3a3a',
    '--mrv-meta': '#666',
    '--mrv-link': '#6ab0f5',
    '--mrv-code-bg': '#2a2a2a',
    '--mrv-btn-hover': '#2a2a2a',
    '--mrv-btn-active-bg': '#383838',
  },
  green: {
    '--mrv-bg': '#f0f4ec',
    '--mrv-text': '#2a3828',
    '--mrv-toolbar-bg': 'rgba(240, 244, 236, 0.95)',
    '--mrv-border': '#c8d8c0',
    '--mrv-meta': '#6a8860',
    '--mrv-link': '#2a6040',
    '--mrv-code-bg': '#e4eede',
    '--mrv-btn-hover': '#e4eede',
    '--mrv-btn-active-bg': '#d4e8cc',
  },
};

const WIDTHS: Record<WidthKey, number> = {
  normal: 680,
  wide: 860,
  xwide: 1040,
};

const DEFAULT_FONT_SIZE = 18;

export class ReaderView {
  private overlay: HTMLElement | null = null;
  private active = false;
  private currentFontSize = DEFAULT_FONT_SIZE;

  private readonly handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.destroy();
  };

  isActive(): boolean {
    return this.active;
  }

  private loadGoogleFonts(): void {
    const id = 'mrv-google-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Source+Sans+3:wght@400;700&family=Lato:wght@400;700&family=Nunito:wght@400;700&family=Open+Sans:wght@400;700&family=Roboto:wght@400;700&family=Merriweather:wght@400;700&family=Libre+Baskerville:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap';
    document.head.appendChild(link);
  }

  activate(): void {
    const documentClone = document.cloneNode(true) as Document;
    const article = new Readability(documentClone).parse() as Article | null;
    if (!article) return;

    this.loadGoogleFonts();

    this.overlay = document.createElement('div');
    this.overlay.id = 'mrv-overlay';

    const style = document.createElement('style');
    style.textContent = getStyles();
    this.overlay.innerHTML = this.buildHTML(article);
    this.overlay.prepend(style);

    document.body.appendChild(this.overlay);
    document.body.style.overflow = 'hidden';

    this.bindEvents();
    document.addEventListener('keydown', this.handleKeydown);

    this.active = true;
  }

  private buildHTML(article: Article): string {
    const wordCount = article.textContent.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return `
      <div id="mrv-container">
        <div id="mrv-toolbar">
          <div id="mrv-left-controls">
            <select id="mrv-font-family">
              <optgroup label="无衬线">
                <option value="Inter, sans-serif">Inter</option>
                <option value="'Source Sans 3', sans-serif">Source Sans 3</option>
                <option value="Lato, sans-serif">Lato</option>
                <option value="Nunito, sans-serif">Nunito</option>
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="Roboto, sans-serif">Roboto</option>
              </optgroup>
              <optgroup label="衬线">
                <option value="Georgia, serif" selected>Georgia</option>
                <option value="Merriweather, serif">Merriweather</option>
                <option value="'Libre Baskerville', serif">Libre Baskerville</option>
                <option value="'Roboto Slab', serif">Roboto Slab</option>
              </optgroup>
            </select>
            <div class="mrv-group">
              <button id="mrv-font-dec">A−</button>
              <button id="mrv-font-reset" title="重置字号">↺</button>
              <button id="mrv-font-inc">A+</button>
            </div>
          </div>
          <div id="mrv-center-controls">
            <button class="mrv-width-btn mrv-active" data-width="normal">正常</button>
            <button class="mrv-width-btn" data-width="wide">宽</button>
            <button class="mrv-width-btn" data-width="xwide">很宽</button>
          </div>
          <div id="mrv-right-controls">
            <button class="mrv-theme-btn mrv-active" data-theme="light">白色</button>
            <button class="mrv-theme-btn" data-theme="dark">深色</button>
            <button class="mrv-theme-btn" data-theme="green">绿色</button>
            <button id="mrv-close">✕</button>
          </div>
        </div>
        <div id="mrv-content">
          <h1 id="mrv-title">${article.title}</h1>
          ${article.byline ? `<div id="mrv-byline">${article.byline}</div>` : ''}
          <div id="mrv-meta">${readingTime} min read</div>
          <div id="mrv-body">${article.content}</div>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    const o = this.overlay!;

    o.querySelector('#mrv-close')?.addEventListener('click', () => this.destroy());
    o.querySelector('#mrv-font-dec')?.addEventListener('click', () => this.adjustFontSize(-2));
    o.querySelector('#mrv-font-inc')?.addEventListener('click', () => this.adjustFontSize(2));
    o.querySelector('#mrv-font-reset')?.addEventListener('click', () => this.resetFontSize());

    o.querySelector('#mrv-font-family')?.addEventListener('change', (e) => {
      const font = (e.target as HTMLSelectElement).value;
      o.style.fontFamily = font;
    });

    o.querySelectorAll<HTMLButtonElement>('.mrv-width-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.width as WidthKey;
        const container = o.querySelector<HTMLElement>('#mrv-container');
        if (container) container.style.maxWidth = `${WIDTHS[key]}px`;
        o.querySelectorAll('.mrv-width-btn').forEach((b) => b.classList.remove('mrv-active'));
        btn.classList.add('mrv-active');
      });
    });

    o.querySelectorAll<HTMLButtonElement>('.mrv-theme-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme as ThemeName;
        for (const [key, value] of Object.entries(THEME_VARS[theme])) {
          o.style.setProperty(key, value);
        }
        o.querySelectorAll('.mrv-theme-btn').forEach((b) => b.classList.remove('mrv-active'));
        btn.classList.add('mrv-active');
      });
    });
  }

  private adjustFontSize(delta: number): void {
    this.currentFontSize = Math.min(28, Math.max(12, this.currentFontSize + delta));
    const body = this.overlay?.querySelector<HTMLElement>('#mrv-body');
    if (body) body.style.fontSize = `${this.currentFontSize}px`;
  }

  private resetFontSize(): void {
    this.currentFontSize = DEFAULT_FONT_SIZE;
    const body = this.overlay?.querySelector<HTMLElement>('#mrv-body');
    if (body) body.style.fontSize = `${DEFAULT_FONT_SIZE}px`;
  }

  destroy(): void {
    this.overlay?.remove();
    this.overlay = null;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleKeydown);
    this.active = false;
  }
}
