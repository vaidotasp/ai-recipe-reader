import { isProbablyReaderable, Readability } from "@mozilla/readability";

function init() {
  console.log("hello from parser!");
  const rawDoc = window.document;

  console.log(rawDoc);
  console.log(isProbablyReaderable, Readability);
  if (
    !isProbablyReaderable(rawDoc, {
      minContentLength: 100,
    })
  ) {
    console.log("parser readability check failed");
    return {
      error: true,
      msg: "Page failed readability check",
    };
  }
  const docClone = window.document.cloneNode(true);
  // @ts-expect-error -- Readability is somehow expecting a Document, but we are passing a Node, this works but types are seemingly confused
  const article = new Readability(docClone).parse();

  return {
    error: false,
    msg: article?.textContent,
  };
}

init();
