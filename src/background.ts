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

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const result = await chrome.scripting.executeScript({
    target: { tabId: activeInfo.tabId },
    files: ["parse-and-extract-content.js"],
  });
  console.log(result);
});

// chrome.tabs.onUpdated.addListener(() => {
//   // showSummary(tabId);
//   const result = extractDOMContent();
//   if (result.error) {
//     throw new Error(result.msg);
//   }
// });

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
