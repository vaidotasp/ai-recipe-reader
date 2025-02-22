import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState<number>();
  async function scanPage() {
    console.log("init scan", activeTab);

    if (activeTab) {
      const result = await chrome.scripting.executeScript({
        target: { tabId: activeTab },
        files: ["parse-and-extract-content.js"],
      });
      console.log(result);
    }
    // chrome.runtime.sendMessage("init-scan", (response) => {
    //   console.log("received - react", response);
    // });

    //scan DOM that the extension is operating on
  }

  useEffect(() => {
    // get current tab id
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      (response) => {
        console.log(response);
        setActiveTab(response[0].id);
      },
    );
  }, []);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>AI Recipe Scrubber</h1>
      <div className="card">
        <button onClick={scanPage}>Scan page</button>
        <div>Confidence of recipe page - high</div>
      </div>
    </>
  );
}

export default App;
