import { useEffect, useState } from "react";

export function useEnsureAIOriginTrialReady() {
  const [modelReady, setModelReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function createSession() {
      const params = {
        systemPrompt:
          "You are a helpful assistant, you are very consistent and precise. Your job is to respond in exactly this formatting. {title: read through the input text and provide a title of the recipe, ingredients: read through the input text and provide a list of ingredients, instructions: read through the input text and provide a list of instructions, summarize instructions step by step use 1-3 sentences as needed}",
        temperature: 1.0, // default
        topK: 3, // default
      };

      // @ts-ignore - API seems too new
      const s = await chrome.aiOriginTrial.languageModel.create(params);
      setSession(s);
      setIsLoading(false);
    }

    async function checkModalCapabilities() {
      // @ts-ignore - API seems too new
      const res = await chrome.aiOriginTrial.languageModel.capabilities();
      if (res.available == "readily") {
        //good to go to use it, we can go ahead and create session
        setModelReady(true);
        createSession();
      } else if (res.available === "after-download") {
        setModelReady(true);
        createSession();
      } else {
        // other case should be non-available model
        setModelReady(false);
        setIsLoading(false);
      }
    }
    checkModalCapabilities();
  }, []);

  return { isLoading, modelReady, session };
}
