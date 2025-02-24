# AI Recipe Reader

This is a **proof of concept** Chrome extension that scans recipe page on demand and generate a scrubbed, summarized and readable recipe you can use.

The problem with most recipe websites is that they are often unreadable, full of irrelevant information and ads, this tool helps you read them and save them for later.


### Technical details

- **Stripping content**: I am using [Mozilla's Readability](https://github.com/mozilla/readability) library. Purely client side utility library that is based on Firefox reader mode.
- **Summarization**: Extension uses experiment [Gemini 1.0 Nano](https://deepmind.google/technologies/gemini/nano/) model that is made for on-demand devices. This allows extension to operate independently without backend. However, in order to play with this, you will need to sign up for [Prompt API](https://developer.chrome.com/docs/extensions/ai/prompt-api) origin trial. APIs likely will change in time so calls would have to be adjusted based on current iteration.
- **Limitations**: Model is fairly slow, regular recipe page takes up to 10-15seconds to summarize, it also has limits on tokens and limits may change in the future as this is very early access, trial mode. At this time (Feb, 2025) it is unpaid and free to use with some limitations on prompt input size.
- **Prompt API**: If you want to use extension as is, after you sign up for the Prompt API trial, make sure to input your `key` and `trial-tokens` in `manifest.json` file. Also make sure that you [extension ID is stable](https://developer.chrome.com/docs/extensions/reference/manifest/key#keep-consistent-id).