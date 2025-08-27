
# 🚀 Profile Matching Challenge – Chrome Extension

A Chrome Extension that helps you analyze and match LinkedIn profiles with your target roles, skills, and career goals. The extension scrapes key profile data (headline, skills, experience, education, and about section) and calculates a **match score (0–100)** with a detailed justification.

---

## 📌 Features

* ✅ **LinkedIn Profile Scraper** – Automatically extracts data from LinkedIn profiles
* ✅ **Profile Matching Algorithm** – Calculates similarity using **skills overlap, headline matching, experience, education, and about section**.
* ✅ **Weighted Scoring System** – Skills (50%), Headline (15%), Experience (15%), Education (10%), About (10%).
* ✅ **Justification Engine** – Explains why a profile scored high or low in each section.
* ✅ **Custom User Profile** – Configure your own target roles, skills, and education via **Options Page**.
* ✅ **User-Friendly Popup** – Click the extension icon to instantly calculate a profile’s match score.

---

## 🛠️ Project Structure

```
profile-matcher-extension/
│── manifest.json        # Chrome Extension manifest (v3)
│── popup.html           # Popup UI
│── popup.js             # Popup logic
│── popup.css            # Popup styles
│── scoring.js           # Profile matching algorithm
│── content.js           # Scraper for LinkedIn profiles
│── options.html         # Settings page (configure your profile)
│── icons/               # Extension icons (16px, 48px, 128px)
```

---

## 📂 How It Works

1. **You configure your profile** in `Options Page` (skills, roles, education, etc.).
2. **Open any LinkedIn profile** (`https://www.linkedin.com/in/...`).
3. **Click the extension icon** → It scrapes the profile data.
4. **Scoring Algorithm runs** (`scoring.js`) → Jaccard & token overlap similarity.
5. **Result shown in popup**:

   * Match Score (`0–100`)
   * Breakdown with explanations
   * Raw scraped data (optional debug view)

---

## 🖥️ Installation (Developer Mode)

1. Clone or download this repository:

   ```bash
   git clone https://github.com/sane-aalam/profile-matcher-extension-chrome.git
   ```

2. Open **Chrome** → go to:

   ```
   chrome://extensions/
   ```
3. Enable **Developer Mode** (toggle on top-right).
4. Click **Load Unpacked** → Select the project folder.
5. Pin the extension to your toolbar.
6. Open any LinkedIn profile → Click the extension icon → See match results 🚀

---

## ⚙️ Configuration

* Open the **Options Page** (right-click extension → *Options*).
* Fill in:

  * 🎯 **Target Roles** → e.g. *Frontend Developer, React Developer*
  * 🛠️ **Skills** → e.g. *JavaScript, React, Redux, Node.js, CSS, HTML*
  * 🏢 **Preferred Companies** (optional) → e.g. *Google, Microsoft*
  * 🎓 **Education** → e.g. *B.Tech Computer Science, XYZ University*

---

## 📊 Scoring Details

| Section    | Weight | Method                                                      |
| ---------- | ------ | ----------------------------------------------------------- |
| Skills     | 50%    | Jaccard similarity between your skills and scraped skills.  |
| Headline   | 15%    | Token overlap between your target roles and their headline. |
| Experience | 15%    | Token overlap for job titles & companies.                   |
| Education  | 10%    | Token overlap for your education keywords.                  |
| About      | 10%    | Token overlap with your skills & target roles.              |

---

## 🖼️ Screenshots (Example)

📌 **Popup UI:**
Shows match score, reasoning, and scraped data.

📌 **Options Page:**
Customize your personal profile settings.

*(Add screenshots after running the extension.)*

---

## 🧩 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Extension APIs:** Chrome Extension Manifest v3
* **Algorithm:** Jaccard Similarity, Token Overlap

---

## 🚀 Future Improvements

* 🔹 Add ML-based NLP scoring for better semantic matches.
* 🔹 Export match results to CSV.
* 🔹 Show multiple top matches instead of one.
* 🔹 Support scraping beyond LinkedIn.

---

## 👨‍💻 Contributing

1. Fork this repo
2. Create a feature branch (`git checkout -b feature-new`)
3. Commit your changes (`git commit -m 'Added new feature'`)
4. Push to branch (`git push origin feature-new`)
5. Create a Pull Request 🎉

---

## 📜 License

MIT License – Free to use & modify.