export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
    });
    return store;
  };
}

function saveState(state) {
  chrome.storage.local.set({state: JSON.stringify(state)});
}

// todo set bookmark state
// function setBadge(bookmarks) {
  // if (chrome.browserAction) {
    // chrome.browserAction.setBadgeText({text: '1'});
  // }
// }
