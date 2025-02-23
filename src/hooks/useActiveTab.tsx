import { useEffect, useState } from "react";

export function useActiveTab() {
  const [activeTab, setActiveTab] = useState<number | undefined>();

  useEffect(() => {
    // if extension scope detect and save tabid for later use
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

  return activeTab;
}
