import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useActiveTab } from "./hooks/useActiveTab";
import { useEnsureAIOriginTrialReady } from "./hooks/useEnsureAIOriginTrialReady";

type ExtractResult = {
  error: boolean;
  msg: string;
};

// Max tokens is about 6144 for the model but maxing out at 6k.
const MAX_TOKENS = 6000;

function App() {
  const { modelReady, isLoading, session } = useEnsureAIOriginTrialReady();
  const activeTab = useActiveTab();
  const [responseLoading, setResponseLoading] = useState(false);
  const [globalError, setGlobalError] = useState(false);

  async function scanPage() {
    setGlobalError(false);
    console.log("init scan", activeTab);

    if (activeTab) {
      //exec script to parse DOM and extract text content
      const result = await chrome.scripting.executeScript({
        target: { tabId: activeTab },
        files: ["parse-and-extract-content.js"],
      });
      // conversion of types for simplicity sake
      const { error, msg } = result[0]?.result as any as ExtractResult;
      console.log(result);
      if (!error) {
        console.log("confirm model status");
        console.log(modelReady, isLoading, session);
        console.log(msg);
        if (session) {
          setResponseLoading(true);
          try {
            const res = await session.prompt(msg);
            setResponseLoading(false);
            console.log(res);
          } catch (err) {
            console.error("err", err);
            setGlobalError(true);
          }
        }
      }
    }
  }

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
