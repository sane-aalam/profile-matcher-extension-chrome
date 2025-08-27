document.getElementById("save").addEventListener("click", () => {
  const myProfile = {
    headline: document.getElementById("headline").value,
    skills: document
      .getElementById("skills")
      .value.split(",")
      .map((s) => s.trim()),
    education: document
      .getElementById("education")
      .value.split(",")
      .map((e) => e.trim()),
  };

  chrome.storage.sync.set({ myProfile }, () => {
    alert("Profile saved successfully!");
  });
});
