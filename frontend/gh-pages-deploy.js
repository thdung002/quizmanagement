/* eslint-disable no-console */
const execa = require("execa");
const fs = require("fs");
(async () => {
  try {
    await execa("git", ["checkout", "--orphan", "deploy-page-test"]);
    // eslint-disable-next-line no-console
    console.log("Building started...");
    await execa("npm", ["run", "build:prod"]);
    // Understand if it's dist or build folder
    const folderName = fs.existsSync("dist") ? "dist" : "build:prod";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "deploy-page-test"]);
    console.log("Pushing to deploy-page-test...");
    await execa("git", ["push", "origin", "HEAD:deploy-page-test", "--force"]);
    console.log("Delete folder name "+folderName);
    await execa("del", ["-r", folderName]);
    console.log("Checkout master...");
    await execa("git", ["checkout", "-f", "master"]);
    console.log("Branch...");
    await execa("git", ["branch", "-D", "deploy-page-test"]);
    console.log("Successfully deployed, check your settings");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();
