// https://www.figma.com/plugin-docs/manifest/
export default {
  name: "bender",
  id: "1464228451812548879",
  api: "1.0.0",
  main: "plugin.js",
  ui: "index.html",
  capabilities: [],
  enableProposedApi: false,
  editorType: ["figma", "figjam"],
  networkAccess: {
    allowedDomains: ["none"],
  },
  documentAccess: "dynamic-page",
};
