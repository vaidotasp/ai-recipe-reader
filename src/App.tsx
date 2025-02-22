import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type ExtractResult = {
  error: boolean;
  msg: string;
};

function App() {
  const [activeTab, setActiveTab] = useState<number>();
  const ab = "ab";
  async function scanPage() {
    console.log("init scan", activeTab);

    if (activeTab) {
      const result = await chrome.scripting.executeScript({
        target: { tabId: activeTab },
        files: ["parse-and-extract-content.js"],
      });
      // conversion of types for simplicity sake
      const { error, msg } = result[0]?.result as any as ExtractResult;
      console.log(result);
      if (!error) {
        console.log(msg);
      }
    }

    //scan DOM that the extension is operating on
  }

  useEffect(() => {
    // if extension scope
    if (chrome?.tabs?.query) {
      chrome.tabs.query(
        {
          currentWindow: true,
          active: true,
        },
        (response) => {
          setActiveTab(response[0].id);
        },
      );
    }
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
        <Button onClick={scanPage}>Scan page</Button>
        <div className="text-3xl font-bold underline">
          Confidence of recipe page - high
        </div>
        <button className="text-3xl font-bold underline">Click me</button>
      </div>
    </>
  );
}

export default App;
