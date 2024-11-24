chrome.runtime.onInstalled.addListener(() => {
    // Automatically open the options page after installation
    chrome.tabs.create({
      url: chrome.runtime.getURL("options.html"),
      active: true,
    });
  });