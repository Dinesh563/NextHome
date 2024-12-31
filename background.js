const tabHistory = new Map();

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId === 0) {
    const tabId = details.tabId;
    const url = new URL(details.url);

    if (isSearchPage(url)) {
      tabHistory.set(tabId, url.toString());
    }
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabHistory.delete(tabId);
});

chrome.action.onClicked.addListener((tab) => {
  const tabId = tab.id;
  if (tabId && tabHistory.has(tabId)) {
    const searchUrl = tabHistory.get(tabId);
    chrome.tabs.update(tabId, { url: searchUrl });
  } else {
    alert('No search results page found for this tab.');
  }
});

function isSearchPage(url) {
  const searchEngines = ["google.com", "bing.com", "yahoo.com", "duckduckgo.com"];
  return searchEngines.some((engine) => url.hostname.includes(engine) && url.pathname === "/search");
}
