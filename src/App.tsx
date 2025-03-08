import "./App.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useActiveTab } from "./hooks/useActiveTab";
import { Loader2 } from "lucide-react";
import { useEnsureAIOriginTrialReady } from "./hooks/useEnsureAIOriginTrialReady";
import { RecipeSummary } from "./RecipeSummary";

type ExtractResult = {
  error: boolean;
  msg: string;
};

// Gemini NANO limitation on output
const MAX_TOKENS_LENGTH = 4096;
// 1 token ~= 3-4 characters (average), make conservative estimate of 3 chars
const MAX_CHARS_LENGTH = MAX_TOKENS_LENGTH * 3;

function App() {
  const { isLoading, session } = useEnsureAIOriginTrialReady();
  const activeTab = useActiveTab();
  const [responseLoading, setResponseLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
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
        if (session) {
          // check for msg to not exceed max length
          if (msg.length > MAX_CHARS_LENGTH) {
            setGlobalError(true);
            return;
          }
          setResponseLoading(true);
          try {
            const res = await session.prompt(msg);
            setResponse(res);
            setResponseLoading(false);
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
        <img src={"/recipe.png"} className="logo" alt="logo" />
      </div>
      <h1>AI Recipe Scrubber</h1>
      <p>Scan page with Gemini Nano AI to extract recipe information.</p>
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
      {/* debug */}
      {/* <RecipeSummary str={"response"} /> */}
      {globalError && <p className="text-sm  text-red-600">Error occurred</p>}
    </div>
  );
}

export default App;
