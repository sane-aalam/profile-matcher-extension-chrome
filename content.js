function scrapeLinkedInProfile() {
  const profile = {};

  // Headline
  profile.headline =
    document.querySelector(".text-body-medium.break-words")?.innerText.trim() ||
    document.querySelector(".pv-text-details-section h2")?.innerText.trim() ||
    "";

  // About
  profile.about =
    document
      .querySelector(".pv-shared-text-with-see-more span.visually-hidden")
      ?.innerText.trim() || "";

  // Experience
  profile.experience = Array.from(
    document.querySelectorAll(
      ".pvs-list__paged-list-item .t-bold span[aria-hidden='true']"
    )
  ).map((el) => el.innerText.trim());

  // Education
  profile.education = Array.from(
    document.querySelectorAll(
      ".pvs-list__paged-list-item .t-bold span[aria-hidden='true']"
    )
  ).map((el) => el.innerText.trim());

  // Skills
  profile.skills = Array.from(
    document.querySelectorAll(".pvs-list__paged-list-item span.visually-hidden")
  ).map((el) => el.innerText.trim());

  console.log("Scraped LinkedIn Profile:", profile);
  return profile;
}

// Listen for popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeProfile") {
    const data = scrapeLinkedInProfile();
    sendResponse({ profile: data });
  }
  return true;
});
