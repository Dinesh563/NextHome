chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getSearchQuery") {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get("q");
      sendResponse({ query });
    }
  });
  