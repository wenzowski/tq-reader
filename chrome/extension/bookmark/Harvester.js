import {addBookmark} from '../../../app/actions/bookmarks';

const executeScript = promisify(chrome.tabs.executeScript);
const query = promisify(chrome.tabs.query);
const saveAsMHTML = promisify(chrome.pageCapture.saveAsMHTML);

export default class Harvester {
  constructor(store) {
    this.store = store;
  }

  async bookmark(tab) {
    const article = await this.parse(tab);
    this.store.dispatch(addBookmark(article));
  }

  async parse(tab) {
    if (!tab) throw new Error('missing required argument tab');
    if (tab.url.slice(0, 4) !== 'http') throw new Error('unsupported page address');
    await executeScript(tab.id, {file: 'vendor/Readability.js'});
    // maybe run this with print stylesheet enabled?
    // https://github.com/chrispederick/web-developer/blob/44ca8da86ae2ccb778b077d2a248a0100a5831cb/source/common/javascript/features/css.js#L241
    const results = await executeScript(tab.id, {file: 'vendor/parser.js'});
    const fallback = {
      title: tab.title,
      uri: {
        spec: tab.url
      }
    };
    const result = results && results[0] || {};
    return {...fallback, ...result};
  }

  async dump(tab) {
    return await saveAsMHTML({tabId: tab.id});
  }

  // Needs to be called after DOMContentLoaded.
  async getCurrentTab() {
    const tabs = await query({active: true, lastFocusedWindow: true});
    if (!tabs || !tabs[0]) throw new Error('cannot find current tab');
    return tabs[0];
  }
}

function promisify(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise(resolve => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}
