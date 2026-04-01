import { ReaderView } from './reader/index';

let readerView: ReaderView | null = null;

chrome.runtime.onMessage.addListener((message: { type: string }) => {
  if (message.type !== 'TOGGLE_READER') return;

  if (readerView?.isActive()) {
    readerView.destroy();
    readerView = null;
  } else {
    readerView = new ReaderView();
    readerView.activate();
  }
});
