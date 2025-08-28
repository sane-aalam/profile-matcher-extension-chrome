document.getElementById("calculate").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send message to content.js
  chrome.tabs.sendMessage(tab.id, { action: "scrapeProfile" }, (response) => {
    if (!response || !response.profile) {
      document.getElementById("result").innerHTML =
        "<p style='color:red;'> Could not scrape profile. Please refresh LinkedIn and try again.</p>";
      return;
    }

    const scrapedData = response.profile;

    chrome.storage.sync.get("myProfile", (data) => {
      const myProfile = data.myProfile || {};
      const scoreDetails = getMatchScore(myProfile, scrapedData);

      document.getElementById("result").innerHTML = `
        <h3>${scoreDetails.score}%</h3>
        <p>${scoreDetails.reason}</p>
      `;
    });
  });
});

// Match Calculation Method to checkout (equal)
function getMatchScore(myProfile, scraped) {
  let score = 0,
    reason = "";

  // Normalize skills
  const mySkills = (myProfile.skills || []).map((s) => s.toLowerCase().trim());
  const scrapedSkills = (scraped.skills || []).map((s) =>
    s.toLowerCase().trim()
  );

  let matchedSkills = scrapedSkills.filter((skill) => mySkills.includes(skill));
  score += matchedSkills.length * 10;

  // Headline
  if (
    scraped.headline &&
    myProfile.headline &&
    scraped.headline.toLowerCase().includes(myProfile.headline.toLowerCase())
  ) {
    score += 20;
  }

  // Education
  const myEdu = (myProfile.education || []).map((e) => e.toLowerCase().trim());
  const scrapedEdu = (scraped.education || []).map((e) =>
    e.toLowerCase().trim()
  );

  let matchedEdu = scrapedEdu.filter((edu) =>
    myEdu.some((m) => edu.includes(m) || m.includes(edu))
  );
  score += matchedEdu.length * 5;

  // find the score
  score = Math.min(score, 100);
  console.log("debug", score);

  reason =
    score > 50
      ? " Strong match due to similar skills/education."
      : " Low match due to different background.";

  return { score, reason };
}
