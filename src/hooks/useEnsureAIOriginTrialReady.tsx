import { useEffect, useState } from "react";

export function useEnsureAIOriginTrialReady() {
  const [modelReady, setModelReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    async function createSession() {
      const params = {
        systemPrompt:
          "You are a helpful assistant, you are very consistent and precise.",
        temperature: 1.0, // default
        topK: 3, // default
      };

      // @ts-ignore - API seems too new
      const s = await chrome.aiOriginTrial.languageModel.create(params);
      setSession(s);
    }

    async function checkModalCapabilities() {
      // @ts-ignore - API seems too new
      const res = await chrome.aiOriginTrial.languageModel.capabilities();
      console.log(res);
      if (res.available == "readily") {
        //good to go to use it, we can go ahead and create session
        setModelReady(true);
        setIsLoading(false);
        createSession();
      } else if (res.available === "after-download") {
        // download model first
        createSession();
      } else {
        // other case should be non-available model
        setModelReady(false);
        setIsLoading(false);
      }
    }
    checkModalCapabilities();
    // if extension scope detect and save tabid for later use
    // if (chrome?.tabs?.query) {
    //   chrome.tabs.query(
    //     {
    //       currentWindow: true,
    //       active: true,
    //     },
    //     (response) => {
    //       setActiveTab(response[0].id);
    //     },
    //   );
    // }
  }, []);

  return { isLoading, modelReady, session };
}
