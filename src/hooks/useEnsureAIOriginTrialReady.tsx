import { useEffect, useState } from "react";

// TODO: Find better offcial types for Chrome AI Session when available
type Session = {
  prompt: (val: string) => Promise<string>;
};

export function useEnsureAIOriginTrialReady() {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function createSession() {
      const params = {
        systemPrompt:
          "You are a helpful assistant, you are very consistent and precise. Your job is to respond in exactly this formatting in JSON {title, ingredients, instructions}. Title: read through the input text and provide a title of the recipe. Ingredients: read through the input text and provide a list of ingredients. Instructions: read through the input text and provide a list of instructions, each instruction is 1-3 sentences long",
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
        createSession();
      } else if (res.available === "after-download") {
        createSession();
      } else {
        // other case should be non-available model
        setIsLoading(false);
      }
    }
    checkModalCapabilities();
  }, []);

  return { isLoading, session };
}
