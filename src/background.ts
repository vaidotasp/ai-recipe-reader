import { helper } from "./work";

chrome.runtime.onInstalled.addListener((event) => {
  console.log("runtime installed");
  console.log(event);
  helper();

  chrome.action.setBadgeText({
    text: "HELLO",
  });
});
