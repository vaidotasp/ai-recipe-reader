import { isProbablyReaderable, Readability } from "@mozilla/readability";

export function helper() {
  console.log("hello from work.ts");
}

type Result = {
  error: boolean;
  msg: string;
};

export async function extractDOMContent(): Promise<Result> {
  console.log("extracting dom content from page");

  // just ignore itermediary states where window is not defined
  if (typeof window === "undefined") {
    return {
      error: true,
      msg: "non-browser-env",
    };
  }

  const rawDoc = window.document;

  // First check, without parsing the whole doc, check if its even readable
  if (
    !isProbablyReaderable(rawDoc, {
      minContentLength: 100,
    })
  ) {
    return {
      error: true,
      msg: "Page failed readability check",
    };
  }

  console.log("DEBUG-start");
  console.log(new Readability(window.document));
  console.log("DEBUG-end");
  // cont
  //
  // clone it
  // const docClone = rawDoc.cloneNode(true);
  // const out = new Readability(docClone).parse();
  const article = new Readability(window.document).parse();
  console.log("article", article);
  // console.log(rawDoc);
  //
  //
  const documentClone = window.document.cloneNode(true);
  console.log("documentClone", documentClone);
  // const article = new Readability(documentClone).parse();
  return {
    error: false,
    msg: "ok",
  };
}
