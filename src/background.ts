// import { extractDOMContent } from "./work";

// snap extension to the side panel
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener((event) => {
  console.log("DEBUG: runtime.oninstalled.event");
  console.log("runtime installed");
  console.log(event);

  chrome.action.setBadgeText({
    text: "HELLO",
  });
});

chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
  //
  if (message === "init-scan") {
    console.log("init scan received from react into service worker");
    const result = await chrome.scripting.executeScript({
      target: { tabId: activeInfo.tabId },
      files: ["parse-and-extract-content.js"],
    });
    sendResponse(result);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const result = await chrome.scripting.executeScript({
    target: { tabId: activeInfo.tabId },
    files: ["parse-and-extract-content.js"],
  });
  console.log(result);
});

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  console.log(tabId, info, tab);
  await chrome.sidePanel.setOptions({
    tabId,
    path: "index.html",
    enabled: true,
  });

  const result = await chrome.scripting.executeScript({
    target: { tabId },
    files: ["parse-and-extract-content.js"],
  });
  console.log(result);
});
