document.getElementById("calculate").addEventListener("click", async () => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML =
    "<p style='color:blue;'>Fetching LinkedIn profile and comparing...</p>";

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url.includes("linkedin.com/in")) {
    resultDiv.innerHTML =
      "<p style='color:red;'>Please open a LinkedIn profile page first.</p>";
    return;
  }

  // Try sending message to content.js
  chrome.tabs.sendMessage(
    tab.id,
    { action: "scrapeProfile" },
    async (response) => {
      if (chrome.runtime.lastError) {
        // Fallback: inject content.js if not loaded
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
        });

        // Retry
        chrome.tabs.sendMessage(
          tab.id,
          { action: "scrapeProfile" },
          (resp2) => {
            if (!resp2 || !resp2.profile) {
              resultDiv.innerHTML =
                "<p style='color:red;'>Could not scrape profile after retry. Refresh LinkedIn and try again.</p>";
              return;
            }
            processProfile(resp2.profile, resultDiv);
          }
        );
        return;
      }

      if (!response || !response.profile) {
        resultDiv.innerHTML =
          "<p style='color:red;'>No profile data found. Refresh LinkedIn and try again.</p>";
        return;
      }

      processProfile(response.profile, resultDiv);
    }
  );
});

function processProfile(scrapedProfile, resultDiv) {
  chrome.storage.sync.get("myProfile", (data) => {
    const myProfile = data.myProfile || {};

    if (!myProfile || Object.keys(myProfile).length === 0) {
      resultDiv.innerHTML =
        "<p style='color:red;'>Please set your profile in Options first.</p>";
      return;
    }

    const scoreDetails = getMatchScore(myProfile, scrapedProfile);

    resultDiv.innerHTML = `
      <div class="card">
        <h3>Match Score: ${scoreDetails.score}%</h3>
        <p>${scoreDetails.reason}</p>
        <details>
          <summary>Show Raw Scraped Data</summary>
          <pre>${JSON.stringify(scrapedProfile, null, 2)}</pre>
        </details>
      </div>
    `;
  });
}

function getMatchScore(myProfile, scraped) {
  let score = 0,
    reason = "";

  const mySkills = (myProfile.skills || []).map((s) => s.toLowerCase().trim());
  const scrapedSkills = (scraped.skills || []).map((s) =>
    s.toLowerCase().trim()
  );
  let matchedSkills = scrapedSkills.filter((skill) => mySkills.includes(skill));
  score += matchedSkills.length * 10;

  if (
    scraped.headline &&
    myProfile.headline &&
    scraped.headline.toLowerCase().includes(myProfile.headline.toLowerCase())
  ) {
    score += 20;
  }

  const myEdu = (myProfile.education || []).map((e) => e.toLowerCase().trim());
  const scrapedEdu = (scraped.education || []).map((e) =>
    e.toLowerCase().trim()
  );
  let matchedEdu = scrapedEdu.filter((edu) =>
    myEdu.some((m) => edu.includes(m) || m.includes(edu))
  );
  score += matchedEdu.length * 5;

  score = Math.min(score, 100);

  reason =
    score > 50
      ? "Strong match due to similar skills/education."
      : "Low match due to different background.";

  console.log("debug-last");
  return { score, reason };
}
