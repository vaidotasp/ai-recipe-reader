import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useActiveTab } from "./hooks/useActiveTab";
import { Loader2 } from "lucide-react";
import { useEnsureAIOriginTrialReady } from "./hooks/useEnsureAIOriginTrialReady";
import { RecipeSummary } from "./RecipeSummary";

type ExtractResult = {
  error: boolean;
  msg: string;
};

// Max tokens is about 6144 for the model but maxing out at 6k., implement token checker
const MAX_TOKENS = 6000;

function App() {
  const { modelReady, isLoading, session } = useEnsureAIOriginTrialReady();
  const activeTab = useActiveTab();
  const [responseLoading, setResponseLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [globalError, setGlobalError] = useState(false);

  async function scanPage() {
    setGlobalError(false);
    if (activeTab) {
      //exec script to parse DOM and extract text content
      const result = await chrome.scripting.executeScript({
        target: { tabId: activeTab },
        files: ["parse-and-extract-content.js"],
      });
      // conversion of types for simplicity sake
      const { error, msg } = result[0]?.result as any as ExtractResult;
      if (!error) {
        console.log(msg);
        if (session) {
          setResponseLoading(true);
          try {
            const res = await session.prompt(msg);
            setResponse(res);
            setResponseLoading(false);
            debugger;
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
    <div className="flex flex-col items-center justify-center">
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>AI Recipe Scrubber</h1>
      <p>
        Use below button to scan the page for the recipe content, Nano AI will
        parse the content and extract the recipe information.
      </p>
      {isLoading || responseLoading ? (
        <Button disabled className="w-32">
          <Loader2 className="animate-spin" />
          Loading...
        </Button>
      ) : (
        <Button className="w-32 mt-2 mb-2" onClick={scanPage}>
          Scan page
        </Button>
      )}
      {response && <RecipeSummary str={response} />}
    </div>
  );
}

export default App;
