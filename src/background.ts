import { helper } from "./work";

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener((event) => {
  console.log("runtime installed");
  console.log(event);
  helper();

  chrome.action.setBadgeText({
    text: "HELLO",
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  console.log(info, tab);
  await chrome.sidePanel.setOptions({
    tabId,
    path: "index.html",
    enabled: true,
  });
});
