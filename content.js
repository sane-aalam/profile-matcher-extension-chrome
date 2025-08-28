function scrapeLinkedInProfile() {
  const profile = {};

  // Headline (under name section)
  profile.headline =
    document
      .querySelector(".pv-text-details__left-panel .text-body-medium")
      ?.innerText.trim() ||
    document.querySelector(".pv-text-details-section h2")?.innerText.trim() ||
    "";

  // About Section
  profile.about =
    document
      .querySelector(".pv-about-section .inline-show-more-text")
      ?.innerText.trim() ||
    document
      .querySelector(
        "section[data-view-name='profile-about'] .display-flex span.visually-hidden"
      )
      ?.innerText.trim() ||
    "";

  // Experience Section
  profile.experience = Array.from(
    document.querySelectorAll(
      "section[data-view-name='profile-experience'] li span.mr1.t-bold span[aria-hidden='true']"
    )
  ).map((el) => el.innerText.trim());

  // Education Section
  profile.education = Array.from(
    document.querySelectorAll(
      "section[data-view-name='profile-education'] li .t-bold span[aria-hidden='true'], \
     section[data-view-name='profile-education'] li .visually-hidden"
    )
  ).map((el) => el.innerText.trim());

  // Skills Section
  profile.skills = Array.from(
    document.querySelectorAll(
      "section[data-view-name='profile-skills'] li span.visually-hidden, \
     section[data-view-name='profile-skills'] li .t-bold span[aria-hidden='true']"
    )
  ).map((el) => el.innerText.trim());

  console.log("Scraped LinkedIn Profile : ", profile);
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
