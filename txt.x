// {
//   "manifest_version": 3,
//   "name": "Profile Matcher",
//   "version": "1.0",
//   "description": "Match LinkedIn profiles with your own and get a similarity score.",
//   "permissions": ["storage", "activeTab", "scripting"],
//   "host_permissions": ["https://www.linkedin.com/*"],
//   "action": {
//     "default_popup": "popup.html",
//     "default_icon": {
//       "16": "logo1.png",
//       "48": "logo1.png",
//       "128": "logo1.png"
//     }
//   },
//   "options_page": "options.html",
//   "background": {
//     "service_worker": "background.js"
//   },
//   "content_scripts": [
//     {
//       "matches": ["https://www.linkedin.com/in/*"],
//       "js": ["content.js"]
//     }
//   ]
// }
