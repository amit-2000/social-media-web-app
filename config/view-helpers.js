const { json } = require("express");
const env = require("./environment");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  // defining the global function in the app.
  app.locals.assetPath = function (filePath) {
    if ((env.name = "development")) {
      return filePath;
    }
    // JSON.parse and pass file system to it.
    return (
      "/" +
      JSON.parse(
        fs.readFileSync(path.join(__dirname, "../public/rev-manifest.json"))
      )[filePath]
    );
  };
};
