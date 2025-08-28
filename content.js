function scrapeLinkedInProfile() {
  const profile = {};

  // Headline
  profile.headline =
    document.querySelector(".text-body-medium.break-words")?.innerText.trim() ||
    document.querySelector(".pv-text-details-section h2")?.innerText.trim() ||
    "";

  // About
  const aboutHeading = Array.from(document.querySelectorAll("h2")).find(
    (h) => h.innerText.trim().toLowerCase() === "about"
  );
  profile.about = aboutHeading
    ? aboutHeading.closest("section").innerText.trim()
    : "";

  // Experience
  const expHeading = Array.from(document.querySelectorAll("h2")).find((h) =>
    h.innerText.trim().toLowerCase().includes("experience")
  );
  profile.experience = expHeading
    ? Array.from(expHeading.closest("section").querySelectorAll("li")).map(
        (el) => el.innerText.trim()
      )
    : [];

  // Education
  const eduHeading = Array.from(document.querySelectorAll("h2")).find((h) =>
    h.innerText.trim().toLowerCase().includes("education")
  );
  profile.education = eduHeading
    ? Array.from(eduHeading.closest("section").querySelectorAll("li")).map(
        (el) => el.innerText.trim()
      )
    : [];

  // Skills
  const skillsHeading = Array.from(document.querySelectorAll("h2")).find((h) =>
    h.innerText.trim().toLowerCase().includes("skills")
  );
  profile.skills = skillsHeading
    ? Array.from(skillsHeading.closest("section").querySelectorAll("li")).map(
        (el) => el.innerText.trim()
      )
    : [];

  console.log("Scraped LinkedIn Profile:", profile);
  return profile;
}

// working of these lines into codebase
// This code is the bridge between your popup (UI) and the actual page DOM (LinkedIn).
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "scrapeProfile") {
    const data = scrapeLinkedInProfile();
    sendResponse({ profile: data });
  }
  return true;
});
