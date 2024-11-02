function copyBearerToken(tabId, tabUrl) {
  if (canInjectScript(tabUrl)) {
    chrome.tabs.sendMessage(tabId, { action: "copyBearer" }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn(
          "Could not send message to content script:",
          chrome.runtime.lastError.message
        );
      }
    });
  } else {
    console.warn("Cannot run content script on this page:", tabUrl);
  }
}

function canInjectScript(url) {
  const forbidden = /^(chrome|chrome-extension|file|about):/;
  return !forbidden.test(url);
}

chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-bearer") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.id !== undefined) {
        copyBearerToken(tab.id, tab.url);
      }
    });
  }
});
