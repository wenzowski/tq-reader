import Harvester from '../bookmark/Harvester';

const CONTEXT_MENU_ID = 'open_tq_reader_window';

chrome.contextMenus.create({
  id: CONTEXT_MENU_ID,
  title: 'Read In TopicQuests',
  contexts: ['all']
});

export default function listener(store) {
  const harvester = new Harvester(store);

  chrome.contextMenus.onClicked.addListener(async event => {
    if (event.menuItemId === CONTEXT_MENU_ID) {
      const tab = await harvester.getCurrentTab();
      await harvester.bookmark(tab);
      chrome.tabs.create({url: `reader.html?url=${encodeURIComponent(tab.url)}`});
    }
  });
}
